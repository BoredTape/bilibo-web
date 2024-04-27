import { $http } from '.'

export const setSyncFav = (params: { mid: number; mlid: number }) => {
  return $http({
    url: '/fav/set_sync/',
    method: 'POST',
    data: params,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export const setNotSyncFav = (params: { mid: number; mlid: number }) => {
  return $http({
    url: '/fav/set_not_sync/',
    method: 'POST',
    data: params,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
