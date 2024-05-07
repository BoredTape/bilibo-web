import { $http } from '.'

export const setSyncCollected = (params: { mid: number; coll_id: number }) => {
  return $http({
    url: '/collected/set_sync/',
    method: 'POST',
    data: params,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export const setNotSyncCollected = (params: { mid: number; coll_id: number }) => {
  return $http({
    url: '/collected/set_not_sync/',
    method: 'POST',
    data: params,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
