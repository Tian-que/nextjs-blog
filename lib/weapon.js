import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export function getWeapon (wid) {
  const { data, error } = useSWR(`https://test.tianque.top/destiny2/weapon2/${wid}`, fetcher)

  return {
    weapon: data,
    isLoading: !error && !data,
    isError: error
  }
}