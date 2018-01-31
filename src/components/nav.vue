<template>
  <div class="nav">
    <div class="nav_container">
      <div class="con_left">
        <a href="">
          <img class="logo" src="./../assets/codepipeline.png" alt="ximoThorn">
          <span>ximoThorn</span>
        </a>
      </div>
      <nav>
        <ul class="crossUl">
          <li>
            <router-link :to="{name: 'article', params: {ty: ty}}" active-class="typeActive">文章</router-link>
          </li>
          <li>
            <router-link to="/focus" active-class="typeActive">关注</router-link>
          </li>
        </ul>
        <div class="viceNavCon">
          <p class="viceHome">
            {{tabText}}
            <svg class="icon bot_arrow" aria-hidden="true">
              <use xlink:href="#icon-xiajiantou"></use>
            </svg>
          </p>
          <ul class="cliUl" ref="cliUl">
            <li>
              <router-link @click.native.prevent.stop="_navTabClick" :to="{name: 'article', params: {ty: ty}}">文章</router-link>
            </li>
            <li>
              <router-link @click.native.prevent.stop="_navTabClick" to="/focus">关注</router-link>
            </li>
          </ul>
        </div>
      </nav>
      <div class="con_right">
        <a href="https://github.com/ximoThorn/ximoThorn.github.io/issues">
          <svg class="icon icon_artcle" aria-hidden="true">
            <use xlink:href="#icon-xiewenzhang"></use>
          </svg>
        </a>
        <a href="https://github.com/ximoThorn">
          <img class="headerImg" src="./../assets/header.png" alt="">
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tabText: '文章',
      ty: 'all'
    }
  },
  created () {
    this.ty = this.$route.params.ty
  },
  methods: {
    _navTabClick (e) {
      this.tabText = e.target.innerHTML
    },
    _ty (ty) {
      this.ty = ty
    }
  },
  watch: {
    '$route' (to, from) {
      if (!to.params.ty) {
        return
      }
      this._ty(to.params.ty)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~common/sass/var.scss';

  .nav {
    margin-bottom: 20px;
    width: 100%;
    height: $navHeight;
    background-color: $navBgColor;
    .nav_container {
      max-width: 960px;
      height: 100%;
      margin: 0 auto;
      padding: 0 20px;
      position: relative;
      .con_left {
        float: left;
      }
      .con_left,.con_right {
        display: inline-block;
        a {
          display: table-cell;
          height: $navHeight;
          vertical-align: middle;
          .logo {
            width: 40px;
            display: inline-block;
          }
          span {
            font-size: 18px;
            vertical-align: bottom;
            color: #275da1;
          }
        }
      }
      nav {
        height: 100%;
        line-height: $navHeight;
        display: inline-block;
        .crossUl {
          height: 100%;
          padding-left: 20px;
          li {
            float: left;
            margin: 0 20px;
            color: $navColor;
            cursor: pointer;
            a {
              color: $navColor;
            }
            &:hover {
              a {
                color: $hoverColor;
              }
            }
          }
        }
        .viceNavCon {
          width: 90px;
          text-align: center;
          margin-left: 20px;
          position: relative;
          &:hover {
            .viceHome {
              .bot_arrow {
                transform: rotate(180deg);
              }
            }
            .cliUl {
              display: block;
              li {
                height: 40px;
              }
            }
          }
          .viceHome {
            cursor: pointer;
            color: $hoverColor;
            .bot_arrow {
              width: 20px;
              vertical-align: middle;
              transform: rotate(0deg);
              transition: all 0.2s;
            }
          }
          .cliUl {
            position: absolute;
            top: 61px;
            z-index: 999;
            width: 90px;
            background-color: #fff;
            box-shadow: 0 1px 2px 0 rgba(0,0,0,.1);
            border-radius: 6px;
            overflow: hidden;
            li {
              height: 0px;
              line-height: 40px;
              transition: all 0.3s;
              &:hover {
                a {
                  color: $hoverColor;
                }
              }
              a {
                color: $navColor;
                display: block;
                width: 100%;
                height: 100%;
              }
            }
          }
        }
      }
      .con_right {
        position: absolute;
        right: 40px;
        a {
          .icon_artcle {
            width: 34px;
            margin-right: 40px;
          }
          .headerImg {
            width: 40px;
            height: 40px;
            border-radius: 50%;
          }
        }
      }
    }
  }
  .typeActive {
    color: $fontColor !important;
  }

  @media screen and (max-width: 960px) {
    .crossUl {
      display: none;
    }
    .viceNavCon {
      display: block;
    }
  }
  @media screen and (min-width: 960px) {
    .crossUl {
      display: block;
    }
    .viceNavCon {
      display: none;
    }
  }
</style>
