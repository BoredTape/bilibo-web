import axios from 'axios'
import type { AxiosRequestConfig } from 'axios'
import { ElLoading, ElMessage } from 'element-plus'
export const httpInstance = axios.create()

export type ResponseStruct = {
  result: number
  message: string
  data: any
}

httpInstance.defaults.baseURL = '/api'

export const $http = async (config: AxiosRequestConfig) => {
  const loadingInstance = ElLoading.service()
  try {
    const axiosResponse = await httpInstance<ResponseStruct>(config)
    const responseData = axiosResponse.data
    if (responseData.result != 0) {
      ElMessage.error(responseData.message)
      throw new Error(responseData.message)
    }
    return responseData
  } catch (err) {
    ElMessage.error('网络异常')
    throw err
  } finally {
    loadingInstance.close()
  }
}
