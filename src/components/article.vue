<template>
  <div class="articleList">
    <ul class="acticleType" ref="scrollLi"  @mouseout="_outScrollBar">
      <li v-for="(item, index) in labelsList" :key="index" @click="_scrollBarClick(index)" @mouseenter.self="_entryScrollBar(index)">
        <router-link :to="{name: 'article', params: {ty: item.name}}" active-class="typeActive">
          {{item.name}}
        </router-link>
      </li>
      <li class="barWrap" ref="barWrap"></li>
    </ul>
    <div class="currentType">
      当前文章类型: {{currentType}}
    </div>
    <dynamic v-if="articleList.length" :articleList="articleList"></dynamic>
    <div class="noLi" v-if="flag" v-show="!articleList.length">
      <p></p>
      主人比较懒，这个类型的文章暂时还没有...
    </div>
  </div>
</template>

<script>
import { getArtilceLabel, getSpecificArticle } from '@/api/http'
import { prefixStyle } from 'common/js/common'
import dynamic from '@/components/dynamic'
import axios from 'axios'

const transition = prefixStyle('transition')

export default {
  data () {
    return {
      labelsList: '',
      currentType: 'all',
      articleList: [],
      flag: false
    }
  },
  components: {
    dynamic
  },
  created () {
    this.parameter = {}

    this._showHtml()

    this.scrollBarObj = {
      initLeft: 0
    }

    this.docScrollObj = {
      // 获取页面可见区域高度
      docInnerHeight: window.innerHeight,
      flag: false
    }

    this.windowScroll()
    this.windowreSize()
  },
  methods: {
    init (ty) {
      this.currentType = ty
      this.articleList = []
      this.flag = false
      this.parameter.labels = ''
      this.parameter.per_page = 2
      this.parameter.page = 1
    },
    _getArtilceData () {
      const _this = this
      _this.$Progress.start()
      getSpecificArticle(_this.parameter).then((re) => {
        _this.$Progress.finish()

        if (_this.parameter.page > 1 && re.data.length <= 0) {
          _this.parameter.page--
          return
        }

        if (re.data.length === _this.parameter.per_page) {
          _this.docScrollObj.flag = false
        }
        _this.flag = true
        _this.articleList = _this.articleList.concat(re.data)
        // 获取页面的高度，加setTimeout是因为必须是data渲染成dom后才能获取正确的值
        _this.$nextTick(() => {
          _this.docScrollObj.docBodyHeight = document.body.clientHeight
        })
        // setTimeout(() => {
        //   _this.docScrollObj.docBodyHeight = document.body.clientHeight
        // }, 0)
      }).catch(() => {
        this.$Progress.fail()
      })
    },
    _showHtml () {
      // 第一次进入或者刷新的时候
      // 初始化一下
      this.init(this.$route.params.ty)

      const _this = this
      let ty = this.$route.params.ty
      this.parameter.labels = ty === 'all' ? '' : ty
      console.log(this.parameter)
      this.currentType = ty
      _this.$Progress.start()
      axios.all([getArtilceLabel(), getSpecificArticle(this.parameter)]).then(axios.spread((labels, article) => {
        _this.$Progress.finish()
        // 增加一个all的labels分类
        const allLabel = {
          color: '',
          default: true,
          id: '',
          name: 'all',
          url: ''
        }

        labels.data.unshift(allLabel)
        _this.flag = true
        _this.labelsList = labels.data
        _this.articleList = article.data

        // 获取其中一个labels的宽度
        _this.scrollBarObj.width = _this.$refs.scrollLi.children[0].clientWidth

        _this._backBarLeft(ty)
        // 获取页面的高度，加setTimeout是因为必须是data渲染成dom后才能获取正确的值
        _this.$nextTick(() => {
          _this.docScrollObj.docBodyHeight = document.body.clientHeight
        })
        // setTimeout(() => {
        //   _this.docScrollObj.docBodyHeight = document.body.clientHeight
        // }, 0)
      })).catch(() => {
        _this.$Progress.fail()
      })
    },
    _entryScrollBar (index) {
      this.scrollBarObj.enterIndex = index
      const intervalWidth = this.scrollBarObj.enterIndex * this.scrollBarObj.width
      this._barWrap(intervalWidth)
    },
    _outScrollBar () {
      this._barWrap(this.scrollBarObj.initLeft)
    },
    _scrollBarClick (index) {
      const intervalWidth = index * this.scrollBarObj.width
      this.scrollBarObj.initLeft = intervalWidth
      this._barWrap(intervalWidth)
    },
    _barWrap (width) {
      this.$refs.barWrap.style.left = `${width}px`
      this.$refs.barWrap.style[transition] = 'all 0.5s'
    },
    // 返回时scrollBar的位置调整
    _backBarLeft (ty) {
      let lis = this.labelsList
      const scrollBarIndex = lis.findIndex(function (val) {
        return val.name === ty
      })
      const intervalWidth = scrollBarIndex * this.scrollBarObj.width
      this.scrollBarObj.initLeft = intervalWidth
      this._barWrap(intervalWidth)
    },
    // 滚动加载
    windowScroll () {
      const _this = this
      window.addEventListener('scroll', () => {
        console.log(_this.docScrollObj.docBodyHeight)
        if (_this.docScrollObj.docBodyHeight <= _this.docScrollObj.docInnerHeight || _this.docScrollObj.flag) {
          return
        }
        let scrollTop = document.documentElement.scrollTop
        let intervalHeight = _this.docScrollObj.docBodyHeight - _this.docScrollObj.docInnerHeight - scrollTop

        if (intervalHeight <= 20) {
          _this.docScrollObj.flag = true
          _this.parameter.page++
          _this._getArtilceData(_this.parameter)
        }
      })
    },
    // 监听窗口大小改变时
    windowreSize () {
      window.onresize = () => {
        this.docScrollObj.docInnerHeight = window.innerHeight
      }
    }
  },
  watch: {
    '$route' (to, from) {
      if (!to.params.ty) {
        return
      }
      this._backBarLeft(to.params.ty)
      this.init(to.params.ty)
      this.parameter.labels = to.params.ty === 'all' ? '' : to.params.ty
      this._getArtilceData()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~common/sass/var.scss';

.articleList {
  margin-top: 20px;
  .acticleType {
    box-shadow: $boxShadeh;
    background-color: #fff;
    height: 50px;
    position: relative;
    li {
      width: 100px;
      float: left;
      height: 100%;
      line-height: 50px;
      text-align: center;
      &:hover {
        a {
          color: $hoverColor;
        }
      }
      a {
        display: inline-block;
        width: 100%;
        height: 100%;
        color: $navColor;
        border-right: 1px solid hsla(240, 2%, 90%, .5);
        .icon {
          width: 16px;
          vertical-align: middle;
        }
      }
    }
    .barWrap {
      height: 2px;
      position: absolute;
      top: 48px;
      left: 0;
      z-index: 10;
      box-shadow:  $boxShadel;
    }
  }
  .currentType {
    font-size: 12px;
    padding: 10px 28px 10px;
    box-shadow: $boxShadow;
    background-color: #fff;
    margin: 10px 0;
  }
  .noLi {
    text-align: center;
    background-color: #fff;
    padding:10px 5px 18px 28px;
    box-shadow: $boxShadow;
    margin: 10px 0;
    animation: identifier 1.0s;
    transition: all 0.8s;
    &:hover {
      transform: scale(1.03);
    }
    p {
      font-size: 12px;
      color: #b2bac2;
      margin-bottom: 14px;
    }
    p {
      width: 80px;
      height: 80px;
      margin: 20px auto 10px;
      background-image: url('./../assets/none.png');
      background-size: 100% 100%;
    }
  }
}
.typeActive {
  box-shadow:  $boxShadel;
  color: $fontColor !important;
}
</style>
