import useSWRImmutable from 'swr/immutable'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export function getWeapon (wid) {
  const { data, error } = useSWRImmutable(`https://test.tianque.top/destiny2/weapon/${wid}`, fetcher)
  // const { data, error } = useSWRImmutable(`http://127.0.0.1:8000/destiny2/weapon/${wid}`, fetcher)

  return {
    data: data,
    isLoading: !error && !data,
    isError: error
  }
}

export function getAllWeapon () {
  const { data, error } = useSWRImmutable(`https://test.tianque.top/destiny2/weapon/list?mod=2`, fetcher)
  // const { data, error } = useSWRImmutable(`http://127.0.0.1:8000/destiny2/weapon/list?mod=2`, fetcher)

  return {
    data: data,
    isLoading: !error && !data,
    isError: error
  }
}
