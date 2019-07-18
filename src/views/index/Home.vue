<template>
  <div class="home">
    第一个页面
    <br>
    <div>
      <span class="red">来自json的数据加载-->></span>：{{this.datas.page1.name}}
    </div>
    <br>
    <van-button type="primary" @click="getStorage">
      查看 localstorage
    </van-button>
    <br>
    <br>
    <van-button type="danger" @click="remove">
      清除 localstorage
    </van-button>
    <van-popup v-model="show" position="bottom" :style="{ height: '10%' }" >{{this.value}}</van-popup>
    <br>
    <br>
  </div>
</template>

<script>
import { Button, Popup } from 'vant'
export default {
  name: 'home',
  components: {
    [Button.name]: Button,
    [Popup.name]: Popup
  },
  data () {
    return {
      todo: '',
      list: [],
      show: false,
      value: null,
      datas: {}
    }
  },
  beforeCreate (e) {
  },
  created () {
    this.datas = {
      'page1': {
        'identifier': 'com.test',
        'name': '测试数据1111',
        'version': '0.0.1',
        'build': 1,
        'releaseNote': '测试数据1111',
        'hidden': false,
        'dependencies': {
          'piece': '0.0.1',
          'com.test.base': '0.0.1',
          'butterfly': '0.0.1',
          'ratchet': '0.0.1'
        },
        'code': 200
      },
      'page2': {
        'identifier': 'com.test',
        'name': '测试数据22222',
        'version': '0.0.1',
        'build': 1,
        'releaseNote': '测试数据22222',
        'hidden': false,
        'dependencies': {
          'piece': '0.0.1',
          'com.test.base': '0.0.1',
          'butterfly': '0.0.1',
          'ratchet': '0.0.1'
        },
        'code': 200
      }
    }
  },
  beforeMount (e) {
  },
  mounted () {
    console.log(this.$router)
    console.dir(this.$storage.get('second'))
    console.dir('此页面获取 localstorage')
  },
  methods: {
    getStorage: function () {
      this.show = true
      this.value = this.$storage.get('second') ? this.$storage.get('second') : null
      console.dir(this.value)
    },
    remove: function () {
      this.show = true
      this.$storage.remove('second')
      this.value = '清除 localstorage'
    }
  }
}
</script>
<style scoped>
.red{
  color: red;
}
</style>
