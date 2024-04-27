import { $http } from '.'

export const getAccountList = (params: { page: number; page_size: number }) => {
  return $http({
    url: '/account/list/',
    method: 'GET',
    params
  })
}

export const delAccount = (params: { mid: number }) => {
  return $http({
    url: '/account/delete/',
    method: 'POST',
    data: params,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export const saveAccount = () => {
  return $http({
    url: '/account/save/',
    method: 'GET'
  })
}

export const qrCodeStatus = (qrCodeId: string) => {
  return $http({
    url: '/account/qrcode/status/' + qrCodeId,
    method: 'GET'
  })
}
