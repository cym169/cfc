<template>
  <div>
    <div class="item">
      <p>COINFANS CLUB 金卡会员</p>
      <p>尊贵特权只为少数派</p>
      <div class="content">
        <div><img src="../../assets/glod_card.png" width="100%" alt=""></div>
        <p class="text">自选尊贵卡号，首冲5000即可获得</p>
        <x-button :gradients="['#c7a062', '#c7a062']" style="border-radius:99px" @click.native="linkToGlodCard">立即领取</x-button>
      </div>
    </div>
    <div class="item">
      <p>COINFANS CLUB 普卡会员</p>
      <div class="content">
        <div><img src="../../assets/puka_card.png" width="100%" alt=""></div>
        <p class="text">无需充值可永久获得</p>
        <x-button :gradients="['#c7a062', '#c7a062']" style="border-radius:99px" @click.native="linkToPukaCard">立即领取</x-button>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import {WechatPlugin, AjaxPlugin, Alert, AlertPlugin, Group, Cell, XInput, XButton, Checklist,Box} from 'vux'
import { cookies } from '../../global/index'
Vue.use(AlertPlugin)
Vue.use(WechatPlugin)


export default {
  components: {
    AjaxPlugin,Alert,
    Group,
    Cell,XInput,
    XButton, Checklist,Box
  },

  data(){
      return{
        init:{},
        baseUrl:'http://wx.wident.cn/server/wx9962603dfa0540e2',
        cookies:null,
      }
  },
  created(){
    // 获取cookie, 判断是否调起用户授权
    this.cookies = cookies()

    AjaxPlugin.$http.get('http://wx.wident.cn/server/mp/signature/wx9962603dfa0540e2?url=http://wx.wident.cn/cfc/selectCard.html')
    .then((res) => {
      this.init = res.data
      this.$wechat.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: this.init.appId, // 必填，公众号的唯一标识
        timestamp: this.init.timestamp, // 必填，生成签名的时间戳
        nonceStr: this.init.nonce, // 必填，生成签名的随机串
        signature: this.init.signature,// 必填，签名，见附录1
        jsApiList: [
          'scanQRCode',
          'onMenuShareAppMessage',
          'onMenuShareTimeline',
          'onMenuShareQQ',
          'onMenuShareWeibo',
        ]
      })
      let wx = this.$wechat
      this.$wechat.ready(function(){
          // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
          wx.onMenuShareAppMessage({
            title: 'CFC咖啡厅', // 分享标题
            desc: '休闲、商务的好去处', // 分享描述
            link: 'http://wx.wident.cn/cfc/index.html', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: 'http://wx.wident.cn/cfc/static/img/logo.9a4594a.jpg', // 分享图标
            type: 'link', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function () {
            // 用户确认分享后执行的回调函数
            },
            cancel: function () {
            // 用户取消分享后执行的回调函数
            }
          });

          wx.onMenuShareTimeline({
              title: 'CFC咖啡厅', // 分享标题
              link: 'http://wx.wident.cn/cfc/index.html', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: 'http://wx.wident.cn/cfc/static/img/logo.9a4594a.jpg', // 分享图标
              success: function () {
              // 用户确认分享后执行的回调函数
              },
              cancel: function () {
              // 用户取消分享后执行的回调函数
              }
          });

          wx.onMenuShareQQ({
            title: 'CFC咖啡厅', // 分享标题
            desc: '休闲、商务的好去处', // 分享描述
            link: 'http://wx.wident.cn/cfc/index.html', // 分享链接
            imgUrl: 'http://wx.wident.cn/cfc/static/img/logo.9a4594a.jpg', // 分享图标
            success: function () {
            // 用户确认分享后执行的回调函数
            },
            cancel: function () {
            // 用户取消分享后执行的回调函数
            }
          });

          wx.onMenuShareWeibo({
            title: 'CFC咖啡厅', // 分享标题
            desc: '休闲、商务的好去处', // 分享描述
            link: 'http://wx.wident.cn/cfc/index.html', // 分享链接
            imgUrl: 'http://wx.wident.cn/cfc/static/img/logo.9a4594a.jpg', // 分享图标
            success: function () {
            // 用户确认分享后执行的回调函数
            },
            cancel: function () {
            // 用户取消分享后执行的回调函数
            }
          });
    
      })

    })

  },
  methods: {
    linkToGlodCard(){
      location.href = './glodCard.html'
    },

    linkToPukaCard(){
      AjaxPlugin.$http.post( this.baseUrl + '/choiceNumber', {'type':0, 'userId': this.cookies}).then(res => {

      })
      location.href = './index.html'
    },

  }
}
</script>

<style lang="scss" src="./selectCard.scss"></style>


