import React from 'react';
import { useTable, useFilters, useGlobalFilter, useAsyncDebounce, usePagination } from 'react-table'
import { Table, Thead, Tbody, Tr, Th, Td, chakra } from '@chakra-ui/react'
import { getAllWeapon } from '../../lib/weapon.js'
import { Box, Image, Badge, Center } from '@chakra-ui/react'
import {ArrowLeftIcon, ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon} from '@chakra-ui/icons'
import { Button, ButtonGroup, Stack, Select ,Input ,Flex, Spacer, SimpleGrid, Tag } from '@chakra-ui/react'
import Layout from '../../components/layout.js';
import WeaponDrawer from '../../components/weapon/weaponDrawer.js';

function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length
  const [value, setValue] = React.useState(globalFilter)
  const onChange = useAsyncDebounce(value => {
    setGlobalFilter(value || undefined)
  }, 200)

  return (
    <chakra.span fontSize='1vw'>
      Search:{' '}
      <Input
        size='md'
        maxW='90%'
        value={value || ""}
        onChange={e => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`${count} items...`}
      />
    </chakra.span>
  )
}

// Define a default UI for filtering
function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  const count = preFilteredRows.length

  return (
    <Input
      value={filterValue || ''}
      size='md'
      minW='100%'
      onChange={e => {
        setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
      }}
      placeholder={`Search ${count} items...`}
    />
  )
}

// This is a custom filter UI for selecting
// a unique option from a list
function SelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = React.useMemo(() => {
    const options = new Set()
    preFilteredRows.forEach(row => {
      options.add(row.values[id])
    })
    return [...options.values()]
  }, [id, preFilteredRows])

  // Render a multi-select box
  return (
    <Select
      value={filterValue}
      onChange={e => {
        setFilter(e.target.value || undefined)
      }}
      size='md'
    >
      <option value="">All</option>
      {options.map((option, i) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </Select>
  )
}

function MyTbale(params) {
  params.data.data.sort((a,b) => {
    if (a[5] === b[5]) return (b[4] === '异域' ? 1 : 0) - (a[4] === '异域' ? 1 : 0)
    else return (b[5] === params.data.lastVersion ? 1 : 0) - (a[5] === params.data.lastVersion ? 1 : 0)
  })
  const data = React.useMemo(
    () => params.data.data.map((data) => {
      return {
        name: data[1],
        icon: data[2],
        type: data[3],
        tierType: data[4],
        createVersion: data[5].slice(7,15),
        updateVersion: data[6].slice(7,15),
      }
    }),
    []
  )

  const columns = React.useMemo(
    () => [
      {
        Header: '名称',
        accessor: 'name', // accessor is the "key" in the data
        isName: true
      },
      {
        Header: '类型',
        accessor: 'type',
        Filter: SelectColumnFilter,
        filter: 'includes',
      },
      {
        Header: '稀有度',
        accessor: 'tierType',
        Filter: SelectColumnFilter,
        filter: 'includes',
      },
      {
        Header: '创建版本',
        accessor: 'createVersion',
        Filter: SelectColumnFilter,
        filter: 'includes',
        isVersion: true
      },
      {
        Header: '更新版本',
        accessor: 'updateVersion',
        Filter: SelectColumnFilter,
        filter: 'includes',
        isVersion: true
      },
    ],
    []
  )

  const filterTypes = React.useMemo(
    () => ({
      text: (rows, id, filterValue) => {
        return rows.filter(row => {
          const rowValue = row.values[id]
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true
        })
      },
    }),
    []
  )

  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    []
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    state,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    visibleColumns,
    preGlobalFilteredRows,
    setGlobalFilter,
    state: { pageIndex, pageSize },
  } = useTable(
    { 
      columns, 
      data, 
      initialState: { pageIndex: 0, pageSize: 30},
      defaultColumn, 
      filterTypes
    }, 
  useFilters, // useFilters!
  useGlobalFilter, // useGlobalFilter!
  usePagination,
  )

  const lastVersion = params.data.lastVersion.slice(7,15)
  const pageControl = 
  <Center height='8vh'>
    <Flex width='97%'>
      <Button 
        width = '4vw'
        fontSize='1vw'
        height='4vh'
        onClick={() => gotoPage(0)} 
        disabled={!canPreviousPage} 
        colorScheme='teal' 
        variant='solid'
      >
        首页
      </Button>
      <Spacer />
      <Button 
        width = '4vw'
        fontSize='1vw'
        height='4vh'
        onClick={() => previousPage(0)} 
        disabled={!canPreviousPage} 
        colorScheme='teal' 
        variant='outline'
      >
        上一页
      </Button>
      <Spacer />
      <chakra.span pl='2' 
        alignSelf='center' 
        fontSize='1vw'
        height='4vh'
        >
        Page{' '}
        <strong>
          {pageIndex + 1} of {pageOptions.length}
        </strong>{' '}
        | Go to page:{' '}
        <Input 
          htmlSize={4} 
          width='4.5rem' 
          height='4vh'
          type='number'
          defaultValue={pageIndex + 1}
          onChange={e => {
            const page = e.target.value ? Number(e.target.value) - 1 : 0
            gotoPage(page)
          }}
        />
      </chakra.span>
      <Spacer />
      <Select 
        width = '10vw'
        minw='7vw'
        fontSize='1vw'
        height='4vh'
        value={pageSize}
        onChange={e => {
          setPageSize(Number(e.target.value))
        }}
      >
        {[30, 50, 100, 200, 300, 500].map(pageSize => (
          <option key={pageSize} value={pageSize}>
            Show {pageSize}
          </option>
        ))}
      </Select>
      <Spacer />
      <Button 
        width='4vw'
        height='4vh'
        fontSize='1vw'
        onClick={() => nextPage(0)} 
        disabled={!canNextPage} 
        colorScheme='teal' 
        variant='outline'
      >
        下一页
      </Button>
      <Spacer />
      <Button 
        width='4vw'
        height='4vh'
        fontSize='1vw'
        onClick={() => gotoPage(pageCount - 1)} 
        disabled={!canNextPage} 
        colorScheme='teal' 
        variant='solid'
      >
        末页
      </Button>
    </Flex>
  </Center>
  console.log(lastVersion)
  return (
    <>
      {pageControl}
      <Table {...getTableProps()} variant='striped' width='60vw'>
        <Thead>
          {headerGroups.map(headerGroup => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <Th
                  {...column.getHeaderProps()}
                >
                  <SimpleGrid rows={2}>
                    <Center height='7' fontSize='xl'>{column.render('Header')}</Center>
                    <Center height='1.5vh'/>
                    <Center>{column.canFilter ? column.render('Filter') : null}</Center>
                  </SimpleGrid>
                </Th>
              ))}
            </Tr>
          ))}
          <Tr>
            <Th
              colSpan={visibleColumns.length}
              style={{
                textAlign: 'left',
              }}
            >
              <GlobalFilter
                preGlobalFilteredRows={preGlobalFilteredRows}
                globalFilter={state.globalFilter}
                setGlobalFilter={setGlobalFilter}
              />
            </Th>
          </Tr>
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row)
            return (
              <Tr {...row.getRowProps()} overflow='auto'>
                {row.cells.map(cell => {
                  let cellDisplay
                  if (cell.column.isVersion) cell.value === lastVersion ? 
                  cellDisplay=<Badge fontSize='1rem' colorScheme='green' variant='outline'>{cell.render('Cell')}</Badge> :
                  cellDisplay=<Badge fontSize='1rem' colorScheme='gray' variant='outline'>{cell.render('Cell')}</Badge>
                  else if (cell.column.isName) {
                    if (cell.row.values.createVersion === lastVersion)
                      cellDisplay = (
                        <>
                          <WeaponDrawer name={cell.value} />
                          <Badge colorScheme='green' variant='solid' ml='1' fontSize='0.6rem'>new</Badge>
                        </>
                      )
                    else cellDisplay = <WeaponDrawer name={cell.value} />
                  } else if (cell.column.Header === "稀有度") {
                    cell.value === '异域' ?
                    cellDisplay=<Tag size='lg' key='lg' variant='outline' colorScheme='yellow' >{cell.render('Cell')}</Tag>:
                    cellDisplay=<Tag size='lg' key='lg' variant='outline' colorScheme='purple' >{cell.render('Cell')}</Tag>
                  }
                  else cellDisplay = cell.value
                  return (
                    <Td fontSize='1.4rem'
                      {...cell.getCellProps()}
                    > {cellDisplay}
                    </Td>
                  )
                })}
              </Tr>
            )
          })}
        </Tbody>
      </Table>
      {pageControl}
    </>
  )
}

function GetTable() {
  const { data, isLoading, isError } = getAllWeapon()
  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Failed to load</div>
  return <MyTbale data={data} />
}

export default function WeaponTable() {
  return (
    <Layout>
      <Center maxW='100%' mt='10'>
          <Box maxW='100%' height='85vh' borderWidth='1px' borderRadius='lg' textAlign='center' overflowY='auto'>
            {/* <Scrollbars style={{width: '100vh'}}> */}
              <GetTable />
            {/* </Scrollbars> */}
          </Box>
      </Center>
    </Layout>
  )
}