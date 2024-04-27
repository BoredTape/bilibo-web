import { $http } from '.'

export const getVideoList = (params: { status: number; page: number; page_size: number }) => {
  return $http({
    url: '/video/list/',
    method: 'GET',
    params
  })
}

export const getToBeDownloadVideoList = (params: { page: number; page_size: number }) => {
  const newParams = { page: params.page, page_size: params.page_size, status: 0 }
  return getVideoList(newParams)
}

export const getDownloadingVideoList = (params: { page: number; page_size: number }) => {
  const newParams = { page: params.page, page_size: params.page_size, status: 1 }
  return getVideoList(newParams)
}

export const getDownloadDoneVideoList = (params: { page: number; page_size: number }) => {
  const newParams = { page: params.page, page_size: params.page_size, status: 2 }
  return getVideoList(newParams)
}

export const getDownloadFailVideoList = (params: { page: number; page_size: number }) => {
  const newParams = { page: params.page, page_size: params.page_size, status: 3 }
  return getVideoList(newParams)
}
