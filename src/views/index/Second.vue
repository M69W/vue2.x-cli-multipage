<template>
  <div class="second">
    <router-link to="/home">第一个页面:</router-link>
    <div>
      <span class="red">来自json的数据加载-->></span>：{{this.datas.page2.name}}
    </div>
    <br>
    <br>
    <van-button type="primary" @click="add">
      保存 localstorage
    </van-button>
    <br>
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
    <br>
    <br>
    <div>
    </div>
    <div class="img_sise">
      <img src="https://ss2.baidu.com/-vo3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=e6821d0a831001e9513c120f880f7b06/a71ea8d3fd1f4134d244519d2b1f95cad0c85ee5.jpg" alt="">
    </div>
    </div>
</template>

<script>
import { Button, Popup, Row, Col, Icon, Cell, CellGroup } from 'vant'

export default {
  data () {
    return {
      datas: {},
      todo: '',
      list: '',
      show: false,
      value: null,
      data: 'aaaaa',
      info: 'nono',
      msg: {}
    }
  },
  components: {
    [Button.name]: Button,
    [Popup.name]: Popup,
    [Row.name]: Row,
    [Col.name]: Col,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup
  },
  methods: {
    add: function () {
      this.show = true
      this.$storage.set('second', 'second')
      if (this.$storage.get('second') !== null) {
        this.value = this.$storage.get('second')
      }
    },
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
  },
  beforeCreate: function () {
    console.log('创建前')
  },
  created: function () {
    console.log('已创建')
    // eslint-disable-next-line no-undef
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
    console.log(this.info)
  },
  beforeMount: function () {
    console.log('mount之前')
    console.log(this.info)
  },
  mounted: function () {
    console.log('mounted')
    console.log(this.info)
    // console.log(this.$el)
  },
  beforeUpdate: function () {
    console.log('更新前')
  },
  updated: function () {
    console.log('更新完成')
  },
  beforeDestroy: function () {
    console.log('销毁前')
    console.log(this.info)
    console.log(this.$el)
  },
  destroyed: function () {
    console.log('已销毁')
    console.log(this.info)
    console.log(this.$el)
  }
}
</script>
<style scoped>
.red{
  color: red;
}
.img_sise{
  width: 100%;
  height: 100%;
}
.img_sise img{
  width: 100%;
  height: 100%;
}
</style>
