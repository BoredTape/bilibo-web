import { $http } from '.'

export const setSyncWatchLater = (params: { mid: number }) => {
  return $http({
    url: '/watch_later/set_sync/',
    method: 'POST',
    data: params,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export const setNotSyncWatchLater = (params: { mid: number }) => {
    return $http({
      url: '/watch_later/set_not_sync/',
      method: 'POST',
      data: params,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }