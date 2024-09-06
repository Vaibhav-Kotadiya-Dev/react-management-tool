import { CreateProjectParams, UpdateProjectParams } from 'types/types';
import api from 'services/api'

const getAllProjects = () => {
  return api.get(
    'project',
  )
}

const createProject = (params: CreateProjectParams) => {
  return api.post(
    'project',
    params,
  )
}

const updateProject = (params: UpdateProjectParams) => {
  return api.put(
    'project',
    params,
  )
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAllProjects, createProject, updateProject }
