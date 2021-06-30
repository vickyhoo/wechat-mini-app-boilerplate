import omitBy from 'lodash.omitby'
import { getToken, getAccessToken, getUserId } from './session'
let baseURL = process.env.VUE_APP_BASE_URL

let version = process.env.VUE_APP_API_VERSION

const codeMessage = {
  200: '服务器成功返回请求的数据',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器',
  502: '网关错误',
  503: '服务不可用，服务器暂时过载或维护',
  504: '网关超时'
}

function formatUrl(path, isApi, apiPrefix) {
  const isAbsolutePath = /^http+/.test(path)
  if (isAbsolutePath) {
    return path
  }
  const adjustedPath = path[0] !== '/' && path.length ? '/' + path : path
  // Prepend `/backend` to relative URL, to proxy to API server.
  return baseURL + (isApi ? apiPrefix : '') + adjustedPath
}

export default class Service {
  constructor(apiPrefix = '', cfg) {
    this.apiPrefix = `/api${apiPrefix}`
    this.cfg = cfg || {}
  }

  request(url, method, { data, header = {}, isApi = true, ...others } = {}) {
    const token = getToken()
    const accessToken = getAccessToken()
    const userId = getUserId()
    const conf = {
      ...this.cfg,
      ...others,
      url: formatUrl(url, isApi, this.apiPrefix),
      method,
      header: {
        ...header,
        token,
        Authorization: accessToken,
        userId,
        version
      },
      data
    }
    conf.header = omitBy(conf.header, (v) => typeof v === 'undefined')

    return new Promise((resolve, reject) => {
      wx.request({
        ...conf,
        success(res) {
          console.groupCollapsed(`发送请求: [${conf.method}] ${conf.url}`)
          console.log(conf)
          console.log('请求成功', res)
          console.groupEnd()
          if (res.statusCode == 200 || res.statusCode == 201) {
            if (res.data.code != undefined && (!res.data.code || res.data.codeName === 'FAIL')) {
              return reject(res.data.message)
            }
            resolve(res.data)
          } else {
            reject(
              res.data.error_message ||
                res.data.message ||
                res.errMsg ||
                codeMessage[res.statusCode]
            )
          }
        },
        fail(err) {
          console.groupCollapsed(`发送请求: [${conf.method}] ${conf.url}`)
          console.log(conf)
          console.log('请求失败', err)
          console.groupEnd()
          reject(err)
        }
      })
    })
  }

  get(url, data, config = {}) {
    return this.request(url, 'GET', { ...config, data })
  }

  post(url, data, config = {}) {
    return this.request(url, 'POST', { ...config, data })
  }

  put(url, data, config = {}) {
    return this.request(url, 'PUT', { ...config, data })
  }

  delete(url, config = {}) {
    return this.request(url, 'DELETE', config)
  }

  upload(url, filePath, formData, name = 'file') {
    return new Promise((resolve, reject) => {
      wx.uploadFile({
        url: formatUrl(url, true, this.apiPrefix),
        filePath,
        formData,
        name,
        success(res) {
          let resData = res.data
          try {
            resData = JSON.parse(res.data)
          } catch (error) {
            // nothing
          }
          if (res.statusCode == 200 || res.statusCode == 201) {
            if (resData.code != undefined && (!resData.code || resData.codeName === 'FAIL')) {
              return reject(resData.message)
            }
            resolve(resData)
          } else {
            reject(
              resData.error_message || resData.message || res.errMsg || codeMessage[res.statusCode]
            )
          }
        },
        fail(err) {
          reject(err)
        }
      })
    })
  }
}
