// import axios from 'axios'
// import { HOST_API } from 'src/config';

// const Axios = axios.create({
//     baseURL: HOST_API,
//     // timeout: 1000,
//     // headers: {'X-Custom-Header': 'foobar'}
// });
import api from './api'
export const post = async (url, data, loading = true, auth = true) => {
    // const { headers } = await header(loading, auth)
    return new Promise((resolve, reject) => {
        api.post(url, data).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        }).finally(() => {
        //   store.dispatch(setLoading(false))
        })
    })
}

export const deleteReq = async (url, data, loading = true, auth = true) => {
    return new Promise((resolve, reject) => {
        api.delete(url, {headers: data}).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        }).finally(()=> {
        //   store.dispatch(setLoading(false))
        })
    })
}

export const get = async (url, loading = true, auth = true) => {
    return new Promise((resolve, reject) => {
        api.get(url).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        }).finally(() => {
        //   store.dispatch(setLoading(false))
        })
    })
}