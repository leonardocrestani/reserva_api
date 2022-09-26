import { axios, AxiosRequestHeaders } from '../../infra/axios'

export async function makeRequest (method: string, url: string, data: object = {}, headers: AxiosRequestHeaders = {}) {
  try {
    const response = await axios.request({
      method,
      url,
      data,
      headers
    })
    return response.data
  } catch (error: any) {
    return error
  }
}
