<template>
  <div class="info">
    <div class="userInfo">
      <div class="headerImg">
        <img src="./../assets/header.png" alt="">
      </div>
      <div class="infoAddress">
        <h1>ximoThorn</h1>
        <p><a href="https://ximothorn.github.io/">ximoThorn.github.io</a></p>
      </div>
    </div>
    <div class="infoLine">
      <p class="lineLogo">
        <a href="https://github.com/ximoThorn">
          <svg class="icon githubLogo" aria-hidden="true">
            <use xlink:href="#icon-github"></use>
          </svg>
        </a>
      </p>
      <p class="edit">
        Fork me
      </p>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
@import '~common/sass/var.scss';

@font-face {
  font-family: "hakuyoxingshu7000";
  src: url("~common/font/hakuyoxingshu7000/hakuyoxingshu7000.woff2") format("woff2"),
       url("~common/font/hakuyoxingshu7000/hakuyoxingshu7000.woff") format("woff"),
       url("~common/font/hakuyoxingshu7000/hakuyoxingshu7000.ttf") format("truetype"),
       url("~common/font/hakuyoxingshu7000/hakuyoxingshu7000.eot") format("embedded-opentype"),
       url("~common/font/hakuyoxingshu7000/hakuyoxingshu7000.svg") format("svg");
  font-weight: normal;
  font-style: normal;
}

.info {
  width: 100%;
  animation: identifier 1.0s;
  padding: 35px;
  background: #2e7bcf url(./../assets/header-bg.jpg) 0 0 repeat-x;
  display: flex;
  .userInfo {
    flex: 1;
    display: flex;
    color: #fff;
    .headerImg {
      flex: 0 0 90px;
      margin-right: 10px;
      img {
        width: 90px;
        height: 90px;
        border-radius: 50%;
      }
    }
    .infoAddress {
      flex: 1;
      h1 {
        font-size: 28px;
        margin-bottom: 16px;
      }
      p {
        display: inline-block;
        font-family: 'hakuyoxingshu7000';
        font-size: 26px;
        transform: rotate(-6deg);
        a {
          color: #fff;
        }
      }
    }
  }
  .infoLine {
    flex: 0 0 120px;
    position: relative;
    .lineLogo {
      text-align: center;
      .githubLogo {
        color: #fff;
      }
    }
    .edit {
      cursor: pointer;
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 34px;
      text-align: center;
      line-height: 34px;
      border-radius: 6px;
      border:1px solid #fff;
      color: #fff;
    }
  }
}
</style>
