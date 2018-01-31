import axios from 'axios'

/**
 * 掘金数据抓取
 */
export function getMyLick (data) {
  const _data = data || {
    page: 0,
    pageSize: 20
  }

  const url = '/api/focus'

  return axios.get(url, {
    params: _data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
