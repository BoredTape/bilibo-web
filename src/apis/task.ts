import { $http } from '.'

export const getTaskList = () => {
  return $http({
    url: '/task/list',
    method: 'GET'
  })
}