import config from './config/user'
import axios from '@/utils/request'

export const reg = (options) => axios.post(config.reg,options)
export const login = (options) => axios.post(config.login,options)
export const validate = () => axions.get(config.validate)