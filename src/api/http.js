import ajax from 'common/js/ajax.js'

/**
 * 获取某一类型的文章
 */
export function getSpecificArticle (obj) {
  let initObj = {
    labels: '',
    per_page: 20,
    page: 1
  }

  let _obj = Object.assign(initObj, obj)

  let params = {
    url: '/repos/ximoThorn/ximoThorn.github.io/issues',
    method: 'get',
    params: _obj
  }
  return ajax(params)
}
/**
 * 请求文章内容
 */
export function getArticleDetail (num) {
  let params = {
    url: `/repos/ximoThorn/ximoThorn.github.io/issues/${num}`,
    method: 'get'
  }
  return ajax(params)
}
/**
 * 请求文章Markdown
 */
export function getMarkDown (con) {
  let _data = {
    text: con,
    mode: 'gfm'
  }
  let params = {
    url: '/markdown',
    method: 'post',
    data: JSON.stringify(_data)
  }
  return ajax(params)
}
/**
 * 请求文章labels
 */
export function getArtilceLabel () {
  let params = {
    url: '/repos/ximoThorn/ximoThorn.github.io/labels',
    method: 'get'
  }
  return ajax(params)
}
