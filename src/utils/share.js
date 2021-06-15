import qs from 'querystring'
import { getUserId } from './session'

export default function share(url, shareProductId = '', title, otherParams = {}, imageUrl) {
  // eslint-disable-next-line
  let pages = getCurrentPages()
  let { options, route } = pages[pages.length - 1]
  let shareUserId = getUserId()
  let shareUserType = 'CUSTOMER'
  // shareUserId, shareProductId
  let path = `${url || route}?${qs.stringify({
    ...options,
    ...otherParams,
    shareUserId,
    shareProductId,
    shareUserType
  })}`
  return {
    title,
    path,
    imageUrl
  }
}
