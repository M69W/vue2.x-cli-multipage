<template>
  <div id="nav">
    <router-link to="/home">Home</router-link>
    <router-link to="/second">第二个页面</router-link>
    <br />
    <div>
      <a href="ui.html">跳转新的页面</a>
      <a href="details.html">跳转新的页面2</a>
    </div>
    <router-view />
  </div>
</template>

<script>
import router from './router'
export default {
  data () {
    return {
    }
  },
  beforeCreate (e) {
    let isPage = ''
    isPage = localStorage.getItem('second')
    if (isPage !== null) {
      /* eslint-disable */
      router.push(isPage.replace("\"","").replace("\"",""))
    }
  },
  created () {
  },
  beforeMount (e) {
  },
  mounted () {
    console.log('1', this)
    console.log('1', this.$router)
  }
}

</script>
<style lang="scss">
  @import './src/assets/style/reset.scss';
  @import './src/assets/style/common.scss';
  #nav {
    background: cadetblue;
    text-align: center
  }

  #nav>a {
    display: inline;
    padding: 5px 10px;
  }

</style>
