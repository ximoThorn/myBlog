<template>
  <div class="detailWrap">
    <div class="title">{{title}}</div>
    <div class="markdown-body" v-html="articleDetailData">
    </div>
  </div>
</template>

<script>
import { getArticleDetail, getMarkDown } from '@/api/http'
import Vue from 'vue'

export default {
  data () {
    return {
      articleDetailData: '',
      title: ''
    }
  },
  created () {
  },
  beforeRouteEnter (to, from, next) {
    const _this = new Vue()
    if (to.params.id) {
      _this.$Progress.start()
      getArticleDetail(to.params.id).then((data) => {
        getMarkDown(data.data.body).then((re) => {
          _this.$Progress.finish()
          next(vm => {
            vm.articleDetailData = re.data
            vm.title = data.data.title
          })
        }).catch(() => {
          _this.$Progress.fail()
        })
      }).catch(() => {
        _this.$Progress.fail()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.detailWrap {
  max-width: 960px;
  padding: 10px;
  margin: 20px auto 50px;
  background-color: #eee;
  .title {
    font-size: 34px;
  }
}
.markdown-body {
  box-sizing: border-box;
  min-width: 200px;
  max-width: 960px;
  margin: 0 auto;
  padding: 45px;
  ul {
    list-style: disc;
  }
  li {
    list-style: disc;
    list-style-type: circle;
  }
}

@media (max-width: 767px) {
  .markdown-body {
    padding: 15px;
  }
}
</style>
