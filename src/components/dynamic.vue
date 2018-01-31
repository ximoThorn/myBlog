<template>
  <div>
    <ul class="listWrap">
      <li v-for="(item, index) in articleList" :key="index">
        <p>created: <span>{{_conversionTime(item.created_at)}}</span></p>
        <h2>
          <router-link :to="{name: 'articleDetail', params: {id: item.number}}">{{item.title}}</router-link>
        </h2>
        <p class="updateTime">
          updated: <span>{{_conversionTime(item.updated_at)}}</span>
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
import { conversionTime } from 'common/js/common'

export default {
  name: 'dynamic',
  props: {
    articleList: {
      type: Array
    }
  },
  data () {
    return {
      articleData: []
    }
  },
  computed: {
  },
  mounted () {
  },
  created () {
    this._getCurrentType()
  },
  methods: {
    _conversionTime (str) {
      return conversionTime(str)
    },
    _getCurrentType () {
      const _type = this.$route.params.ty
      this.currentType = _type
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~common/sass/var.scss';

.listWrap {
  li {
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
    h2 {
      font-weight: bold;
      font-size: 22px;
      position: relative;
      margin-bottom: 10px;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
      a {
        display: inline-block;
        width: 100%;
        color: #000;
      }
    }
    .updateTime {
      margin-bottom: 0;
      text-align: right;
    }
  }
}
</style>
