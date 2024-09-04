import { LoginParams, SignUpParams } from 'types/types';
import api from 'services/api'

const login = (params: LoginParams) => {
  return api.post(
    'auth/signin',
    params,
  )
}

const signUp = (params: SignUpParams) => {
  return api.post(
    'auth/signup',
    params,
  )
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { login, signUp }
