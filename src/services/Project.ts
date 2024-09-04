import { CreateProjectParams } from 'types/types';
import api from 'services/api'

const get = () => {
  return api.get(
    'project',
  )
}

const post = (params: CreateProjectParams) => {
  return api.post(
    'project',
    params,
  )
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { get, post }
