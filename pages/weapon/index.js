import React from 'react';
import { useTable, useFilters, useGlobalFilter, useAsyncDebounce, usePagination } from 'react-table'
import { Table, Thead, Tbody, Tr, Th, Td, chakra } from '@chakra-ui/react'
import { getAllWeapon } from '../../lib/weapon.js'
import { Box, Image, Badge, Center } from '@chakra-ui/react'
import {ArrowLeftIcon, ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon} from '@chakra-ui/icons'
import { Button, ButtonGroup, Stack, Select ,Input ,Flex, Spacer, SimpleGrid } from '@chakra-ui/react'
import { Footer } from '../../components/footer/footer.js';
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
    <span>
      Search:{' '}
      <Input
        size='sm'
        maxW='80%'
        value={value || ""}
        onChange={e => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`${count} records...`}
      />
    </span>
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
      size='xs'
      minW='120px'
      onChange={e => {
        setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
      }}
      placeholder={`Search ${count} records...`}
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
      size='xs'
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
  const data = React.useMemo(
    () => params.weapon.data.map((data) => {
      return {
        hash: data[0],
        name: data[1],
        createVersion: data[2],
        updateVersion: data[3],
      }
    }),
    []
  )

  const columns = React.useMemo(
    () => [
      {
        Header: '物品名',
        accessor: 'name', // accessor is the "key" in the data
        isName: true
      },
      {
        Header: '物品 Hash',
        accessor: 'hash',
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
  return (
    <>
      <Table {...getTableProps()} variant='striped'>
        <Thead>
          {headerGroups.map(headerGroup => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <Th
                  {...column.getHeaderProps()}
                >
                  <SimpleGrid rows={2}>
                    <Center height='7'>{column.render('Header')}</Center>
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
              <Tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  let cellDisplay
                  if (cell.column.isVersion) cellDisplay=<Badge variant='outline'>{cell.render('Cell')}</Badge>
                  else if (cell.column.isName) {
                    if (cell.row.values.createVersion === cell.row.values.updateVersion)
                      cellDisplay = (
                        <>
                          <WeaponDrawer name={cell.value} />
                          <Badge colorScheme='green' variant='solid' ml='1' fontSize='0.6em'>new</Badge>
                        </>
                      )
                    else cellDisplay = <WeaponDrawer name={cell.value} />
                  } else cellDisplay = cell.value
                  return (
                    <Td
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
      <Center height = '80px'>
        <Flex width='97%'>
          <Button 
            width = '85px'
            leftIcon={<ArrowLeftIcon />} 
            onClick={() => gotoPage(0)} 
            disabled={!canPreviousPage} 
            colorScheme='teal' 
            variant='solid'
          >
            首页
          </Button>
          <Spacer />
          <Button 
            width = '95px'
            leftIcon={<ChevronLeftIcon />} 
            onClick={() => previousPage(0)} 
            disabled={!canPreviousPage} 
            colorScheme='teal' 
            variant='outline'
          >
            上一页
          </Button>
          <Spacer />
          <chakra.span pl='2' alignSelf='center'>
            Page{' '}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{' '}
            | Go to page:{' '}
            <Input 
              htmlSize={4} 
              width='50px' 
              height='auto'
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
            width = '130px'
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
            rightIcon={<ChevronRightIcon />} 
            onClick={() => nextPage(0)} 
            disabled={!canNextPage} 
            colorScheme='teal' 
            variant='outline'
          >
            下一页
          </Button>
          <Spacer />
          <Button 
            rightIcon={<ArrowRightIcon />} 
            onClick={() => gotoPage(pageCount - 1)} 
            disabled={!canNextPage} 
            colorScheme='teal' 
            variant='solid'
          >
            末页
          </Button>
        </Flex>
      </Center>
    </>
  )
}

export default function WeaponTable() {
  const { weapon, isLoading, isError } = getAllWeapon()
  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Failed to load</div>
  return (
    <>
      <Center>
        <Box maxW='85%' borderWidth='1px' borderRadius='lg' overflow='hidden' textAlign='center' >
          <MyTbale weapon={weapon} />
        </Box>
      </Center>
      <Footer />
    </>
    
  )
}