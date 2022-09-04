import useSWRImmutable from 'swr/immutable'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export function getTodayData () {
  const { data, error } = useSWRImmutable("https://test.tianque.top/destiny2/today/tjson", fetcher)

  return {
    data: data,
    isLoading: !error && !data,
    isError: error
  }
}
