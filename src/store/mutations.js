import * as types from './mutations-type'

const mutations = {
  [types.SET_CURRENTARTICLELIST] (state, data) {
    state.currentArticleList = data
  },
  [types.SET_CURRENTARTICLETYPE] (state, data) {
    state.currentArtiType = data
  }
}

export default mutations
