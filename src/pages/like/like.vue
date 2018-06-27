<template>
  <div>
    <div class="banner"><img src="../../assets/like_banner.png" width="100%" alt=""></div>
    <div class="item">
      <div class="left-text">
        <p class="title">拿铁咖啡</p>
        <p>拿铁咖啡是意大利浓缩咖啡与牛奶的经典混合。</p>
      </div>
      <div class="right-img">
        <img src="../../assets/natie.jpg" width="100%" alt="">
      </div>
    </div>
    <div class="item">
      <div class="left-img">
        <img src="../../assets/moka.jpg" width="100%" alt="">
      </div>
      <div class="right-text">
        <p class="title">摩卡咖啡</p>
        <p>摩卡咖啡是由意大利浓缩咖啡、巧克力酱、牛奶混合而成，摩卡得名于有名的摩卡港。</p>
      </div>
    </div>
    <div class="item">
      <div class="left-text">
        <p class="title">抹茶拿铁</p>
        <p>抹茶拿铁由本店特选进口原味绿茶研磨粉萃取无加任何香精色素和牛奶混合而成的软料，有丰富的营养成分和微量元素。</p>
      </div>
      <div class="right-img">
        <img src="../../assets/mocha.jpg" width="100%" alt="">
      </div>
    </div>
    <div class="item">
      <div class="left-img">
        <img src="../../assets/coffer.jpg" width="100%" alt="">
      </div>
      <div class="right-text">
        <p class="title">浓缩咖啡</p>
        <p>浓缩咖啡或意式浓缩咖啡，是一种口感强烈的咖啡类型，本店特选纯阿拉比卡拼配</p>
      </div>
    </div>
    <div class="item">
      <div class="left-text">
        <p class="title">蛋糕</p>
        <p>选用优质的原材料,手工制作,外观不是我们的选择.味道品质才是我们的选择,也是您的选择….匠人心。</p>
      </div>
      <div class="right-img">
        <img src="../../assets/cake.jpg" width="100%" alt="">
      </div>
    </div>
    <div class="item">
      <div class="left-img">
        <img src="../../assets/food.jpg" width="100%" alt="">
      </div>
      <div class="right-text">
        <p class="title">菜品</p>
        <p>优选最新鲜的食材,以生菜作为基地,配上优质而不油腻的烟熏培根/鸡肉,再配上不同的面包,多重口感的碰撞融合。</p>
      </div>
    </div>
    <div class="item">
      <div class="left-text">
        <p class="title">礼品</p>
        <p>最走心的包装。</p>
      </div>
      <div class="right-img">
        <img src="../../assets/cake.jpg" width="100%" alt="">
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import {WechatPlugin, AjaxPlugin, Alert, AlertPlugin, Group, Cell, XInput, XButton, Checklist,Box} from 'vux'
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
        init:{}
      }
  },
  created(){
    AjaxPlugin.$http.get('http://wx.wident.cn/server/mp/signature/wx9962603dfa0540e2?url=http://wx.wident.cn/cfc/like.html')
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
            link: 'http://wx.wident.cn/cfc/like.html', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
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
              link: 'http://wx.wident.cn/cfc/like.html', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
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
            link: 'http://wx.wident.cn/cfc/like.html', // 分享链接
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
            link: 'http://wx.wident.cn/cfc/like.html', // 分享链接
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
 
  }
}
</script>

<style lang="scss" src="./like.scss"></style>


