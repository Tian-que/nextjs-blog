import React from 'react';
import { useTable, useFilters, useGlobalFilter, useAsyncDebounce, usePagination } from 'react-table'
import { Table, Thead, Tbody, Tr, Th, Td, chakra } from '@chakra-ui/react'
import { getAllWeapon } from '../../lib/weapon.js'
import { Box, Image, Badge, Center } from '@chakra-ui/react'
import {ArrowLeftIcon, ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon} from '@chakra-ui/icons'
import { Button, ButtonGroup, Stack, Select ,Input ,Flex, Spacer, SimpleGrid, Tag, TagLabel,VisuallyHidden } from '@chakra-ui/react'
import Layout from '../../components/layout.js';
import WeaponDrawer from '../../components/weapon/weaponDrawer.js';
import WeaponBox from '../../components/weapon/weaponBox.js';
import {weaponTypeRichTextByCategoryHash} from '../../components/svgs/itemCategory.js'
import { damageTypeNameByEnum, damageTypeUrlByEnum } from '../../components/svgs/damageTypes.js';
import Link from "next/link";
import style from '../../styles/utils.module.css'

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
      width='auto'
      minW='100%'
      variant='outline'
      onChange={e => {
        setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
      }}
      size='md'
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

function damageTypeSelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = React.useMemo(() => {
    const options = new Set()
    preFilteredRows.forEach(row => {
      options.add(row.values[id])
    })
    return [...options.values()].sort()
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
          {damageTypeNameByEnum[option]}
        </option>
      ))}
    </Select>
  )
}

// This is a custom filter UI for selecting
// a unique option from a list
function SortSelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = React.useMemo(() => {
    const options = new Set()
    preFilteredRows.forEach(row => {
      options.add(row.values[id])
    })
    return [...options.values()].sort((a,b)=>a.slice(1)-b.slice(1)).reverse()
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

function NumberRangeColumnFilter({
  column: { filterValue = [], preFilteredRows, setFilter, id },
}) {
  const [min, max] = React.useMemo(() => {
    let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
    let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
    preFilteredRows.forEach(row => {
      min = Math.min(row.values[id], min)
      max = Math.max(row.values[id], max)
    })
    return [min, max]
  }, [id, preFilteredRows])

  return (
    <div
      style={{
        display: 'flex',
      }}
    >
      <input
        value={filterValue[0] || ''}
        type="number"
        onChange={e => {
          const val = e.target.value
          setFilter((old = []) => [val ? parseInt(val, 10) : undefined, old[1]])
        }}
        placeholder={`Min (${min})`}
        style={{
          width: '70px',
          marginRight: '0.5rem',
        }}
      />
      to
      <input
        value={filterValue[1] || ''}
        type="number"
        onChange={e => {
          const val = e.target.value
          setFilter((old = []) => [old[0], val ? parseInt(val, 10) : undefined])
        }}
        placeholder={`Max (${max})`}
        style={{
          width: '70px',
          marginLeft: '0.5rem',
        }}
      />
    </div>
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
        hash: data[0],
        name: data[1],
        icon: data[2],
        type: data[3],
        tierType: data[4],
        createVersion: data[5].slice(7,15),
        updateVersion: data[6].slice(7,15),
        ich: data[7][data[7].length-1],
        flavorText: data[8],
        defaultDamageType: data[9],
        season: 'S' + String(data[10])
      }
    }),
    []
  )


  const columns = React.useMemo(
    () => [
      {
        Header: '名称',
        accessor: 'name', // accessor is the "key" in the data
        isName: true,
        isMobileDisplay: true,
      },
      {
        Header: 'hash',
        accessor: 'hash',
        isHidden: true
      },
      {
        Header: '图标',
        accessor: 'icon', 
        isHidden: true
      },
      {
        Header: '个性文本',
        accessor: 'flavorText', 
        isHidden: true
      },
      {
        Header: '类型',
        accessor: 'type',
        Filter: SelectColumnFilter,
        filter: 'includes',
      },
      {
        Header: 'ich',
        accessor: 'ich',
        isHidden: true
      },
      {
        Header: '稀有度',
        accessor: 'tierType',
        Filter: SelectColumnFilter,
        filter: 'includes',
      },
      {
        Header: '元素',
        accessor: 'defaultDamageType',
        Filter: damageTypeSelectColumnFilter,
        filter: 'equals',
      },
      {
        Header: '赛季',
        accessor: 'season',
        Filter: SortSelectColumnFilter,
        filter: 'equals'
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
  <SimpleGrid height='6rem'>
    <Center>
    <Flex width='97%'>
      <Button 
        width = {{base: "3rem", md: "4rem"}}
        fontSize={{base: "0.8rem", md: "1rem"}}
        height='2.3rem'
        onClick={() => gotoPage(0)} 
        disabled={!canPreviousPage} 
        colorScheme='teal' 
        variant='solid'
      >
        首页
      </Button>
      <Spacer />
      <Button 
        width = {{base: "3rem", md: "4rem"}}
        fontSize={{base: "0.8rem", md: "1rem"}}
        height='2.3rem'
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
        fontSize='1rem'
        height='2.3rem'
        display={{base:"none", md: "inline"}}
        >
        Page{' '}
        <strong>
          {pageIndex + 1} of {pageOptions.length}
        </strong>{' '}
        | Go to page:{' '}
        <Input 
          htmlSize={4} 
          width='4.5rem' 
          height='2.3rem'
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
        width = '10rem'
        minw='7rem'
        fontSize='1rem'
        height='2.3rem'
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
        width={{base: "3rem", md: "4rem"}}
        height='2.3rem'
        fontSize={{base: "0.8rem", md: "1rem"}}
        onClick={() => nextPage(0)} 
        disabled={!canNextPage} 
        colorScheme='teal' 
        variant='outline'
      >
        下一页
      </Button>
      <Spacer />
      <Button 
        width={{base: "3rem", md: "4rem"}}
        height='2.3rem'
        fontSize={{base: "0.8rem", md: "1rem"}}
        onClick={() => gotoPage(pageCount - 1)} 
        disabled={!canNextPage} 
        colorScheme='teal' 
        variant='solid'
      >
        末页
      </Button>
    </Flex>
    </Center>
    <Center display={{base:"inline", md: "none"}}>
    <chakra.span pl='2' 
        alignSelf='center' 
        fontSize='1rem'
        height='2.3rem'
        >
        Page{' '}
        <strong>
          {pageIndex + 1} of {pageOptions.length}
        </strong>{' '}
        | Go to page:{' '}
        <Input 
          htmlSize={4} 
          width='4.5rem' 
          height='2.3rem'
          type='number'
          defaultValue={pageIndex + 1}
          onChange={e => {
            const page = e.target.value ? Number(e.target.value) - 1 : 0
            gotoPage(page)
          }}
        />
      </chakra.span>
    </Center>
  </SimpleGrid>
  return (
    <>
      {pageControl}
      <Table {...getTableProps()} variant='striped' width='60vw'>
        <Thead>
          {headerGroups.map(headerGroup => (
            <Tr {...headerGroup.getHeaderGroupProps()}
              display={{base: "none", md: "table-row"}}
            >
              {headerGroup.headers.map(column => {
                if (!column.isHidden)
                return (
                <Th
                  {...column.getHeaderProps()}
                >
                  <SimpleGrid rows={2}>
                    <Center height='7' fontSize='lg' >{column.render('Header')}</Center>
                    <Center height='1.5vh'/>
                    <Center >{column.canFilter ? column.render('Filter') : null}</Center>
                  </SimpleGrid>
                </Th>
              )})}
            </Tr>
          ))}
          {headerGroups.map(headerGroup => (
            <Tr {...headerGroup.getHeaderGroupProps()}
            display={{base: "table-row", md: "none"}}>
              <Th
              colSpan={visibleColumns.length}
              style={{
                textAlign: 'left',
              }}
              >
                <SimpleGrid>
                  {headerGroup.headers.map(column => {
                  if (!column.isHidden)
                  return (
                    <Flex pt='1'>
                      <Center height='7' maxW='2rem' minW='20vw' fontSize='1rem' >{column.render('Header')}</Center>
                      <Center pl='2' minW='65vw' maxH='2.3rem'>{column.canFilter ? column.render('Filter') : null}</Center>
                    </Flex>
                )})}
                </SimpleGrid>
              </Th>
              
            </Tr>
          ))}
          <Tr display={{base: "none", md: "table-row"}}>
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
              <Tr {...row.getRowProps()} overflow='auto' height='10vh'>
                {row.cells.map(cell => {
                  if (cell.column.isHidden) return
                  let cellDisplay
                  if (cell.column.isVersion) cell.value === lastVersion ? 
                  cellDisplay=<Badge fontSize='1rem' colorScheme='green' variant='outline'>{cell.render('Cell')}</Badge> :
                  cellDisplay=<Badge fontSize='1rem' colorScheme='gray' variant='outline'>{cell.render('Cell')}</Badge>
                  else if (cell.column.isName) {
                    cellDisplay = <>
                    <WeaponDrawer name={cell.value} hash={cell.row.values.hash}>
                      <WeaponBox data={cell.row.values} isNew={cell.row.values.createVersion === lastVersion}/>
                    </WeaponDrawer>
                    <Link href={'/weapon/'+String(cell.row.values.hash)} passHref>
                    <Button size='auto' width="100%" variant='ghost' display={{base: "inline", md: "none"}}>
                      <WeaponBox data={cell.row.values} isNew={cell.row.values.createVersion === lastVersion}/>
                    </Button>
                    </Link>
                    </>
                  } else if (cell.column.Header === "稀有度") {
                    cell.value === '异域' ?
                    cellDisplay=<Tag size='lg' key='lg' variant='outline' colorScheme='yellow' whiteSpace="nowrap">{cell.render('Cell')}</Tag>:
                    cellDisplay=<Tag size='lg' key='lg' variant='outline' colorScheme='purple' whiteSpace="nowrap">{cell.render('Cell')}</Tag>
                  } else if (cell.column.Header === "赛季") cellDisplay=<Tag borderRadius='full' variant='subtle' size='lg' colorScheme='green'><TagLabel>{cell.value}</TagLabel></Tag>
                  else if (cell.column.Header === "类型") cellDisplay = 
                  <Tag borderRadius='full' variant='subtle'  minW='5rem' maxW='10rem' fontSize='1rem' colorScheme='cyan'>
                    <chakra.span  minW='2rem' maxW='10rem' style={{fontFamily: "Destiny2", whiteSpace: "nowrap"}}>
                      {cell.value+' '+weaponTypeRichTextByCategoryHash[cell.row.values.ich]}
                    </chakra.span>
                  </Tag>
                  else if (cell.column.Header === "元素") cellDisplay = 
                  <Tag 
                    borderRadius='sm' 
                    variant='subtle' 
                    width='4.5rem' 
                    colorScheme='gray'
                  > 
                    <VisuallyHidden>{cell.value}</VisuallyHidden>
                    <chakra.span fontSize='1.1rem' whiteSpace="nowrap">{damageTypeNameByEnum[cell.value]}</chakra.span>
                    {cell.value===1 ? 
                    <Image pl='1' width='1.3rem' style={{filter: "drop-shadow(0px 0px 0px yellow)"}} src={damageTypeUrlByEnum[cell.value]} />: 
                    <Image pl='1' width='1.3rem' src={damageTypeUrlByEnum[cell.value]} />}
                  </Tag>
                  
                  else cellDisplay = cell.value
                  return (
                    <Td fontSize='1.4rem'
                      {...cell.getCellProps()}
                      display={{base: cell.column.isMobileDisplay ? "table-cell":"none", md: "table-cell"}}
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