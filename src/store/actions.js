import * as types from './mutations-type'

export const currentArticleList = ({ commit, state }, data) => {
  commit(types.SET_CURRENTARTICLELIST, data)
}

export const currentArticleType = ({ commit, state }, data) => {
  commit(types.SET_CURRENTARTICLETYPE, data)
}
