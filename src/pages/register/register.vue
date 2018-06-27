<template>
  <div>
    <div class="header">
      <img class="header-img" width="100%" :src="initUserInfo.iconUrl" alt="">
      <p class="header-title">{{initUserInfo.nickName}}</p>
    </div>

    <div class="title">会员信息填写</div>
  
      <group>
        <x-input title="会员姓名" name="username" v-model="membername" placeholder="请输入真实姓名" required></x-input>
        <x-input title="手机号码" placeholder="请输入手机号" required  :max="13" v-model="tel" required is-type="china-mobile"></x-input>
        <x-input title="图片验证码" class="weui-cell_vcode" v-model="imgValidate">
          <img slot="right" class="weui-vcode-img" id="imgVerification" @click="refreshImgs"
            src="http://wx.wident.cn/server/wx9962603dfa0540e2/defaultKaptcha">
        </x-input>
        <x-input title="短信验证码" class="weui-vcode" v-model="telValidates" placeholder="请输入验证码">
            <x-button @click.native="sendMessage" slot="right" type="primary" mini >{{word}}</x-button>
        </x-input>
      </group>

    <div class="tip">注意：为保障您的个人权益，资料修改后不可更改，请填写真实信息。</div>

    <div class="checkbox" style="font-size:12px; color:#000; padding:0 10px 15px 10px">
      <check-icon :value.sync="agree">我已阅读并同意<a href="" alt="" style="color:#1984fd; margin:0 5px;">会员守则</a>和<a href="" alt="" style="color:#1984fd; margin:0 5px;">会员卡使用声明</a></check-icon>
    </div>
  
    <div class="submit">
      <x-button :gradients="['#c7a062', '#c7a062']" @click.native="submitForm">提交资料</x-button>
      <!-- <x-button :gradients="['#c7a062', '#c7a062']" @click.native="wxQRCode">微信扫一扫</x-button> -->
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import {WechatPlugin, AjaxPlugin, AlertPlugin, cookie,
        Group, Cell, XInput, XButton, CheckIcon} from 'vux'

import { cookies } from '../../global/index'

Vue.use(WechatPlugin)
Vue.use(AlertPlugin)

export default {
  components: {
    AjaxPlugin,
    Group, cookie,
    Cell,XInput,CheckIcon,
    XButton,

  },

  data(){
      return{
          baseUrl:'http://wx.wident.cn/server/wx9962603dfa0540e2',
          membername:'',
          tel:'',
          imgValidate:'',
          telValidates:'',
          word: '发送验证码',
          agree:true,

          isOvertime:false,
          init:{},   // 初始权限验证参数
          initUserInfo:'',
          cookies:null,
          
      }
  },
  created(){
    // 获取cookie, 判断是否调起用户授权
    this.cookies = cookies()
    AjaxPlugin.$http.get('http://wx.wident.cn/server/mp/signature/wx9962603dfa0540e2?url=http://wx.wident.cn/cfc/register.html')
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
    

    // 获得用户授权信息
    this.getUserInfo()
    
    // AjaxPlugin.$http.get('http://wx.wident.cn/server/mp/signature/wx9962603dfa0540e2?url=http://wx.wident.cn/cfc/register.html')
    // .then((res) => {
    //   this.init = res.data
    //   this.$wechat.config({
    //     debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    //     appId: this.init.appId, // 必填，公众号的唯一标识
    //     timestamp: this.init.timestamp, // 必填，生成签名的时间戳
    //     nonceStr: this.init.nonce, // 必填，生成签名的随机串
    //     signature: this.init.signature,// 必填，签名，见附录1
    //     jsApiList: ['scanQRCode']
    //   })
    // })

  },
  methods: {
    // 获得用户授权信息
    getUserInfo(){
      AjaxPlugin.$http.get(this.baseUrl + '/user/get/' + this.cookies).then(res => {
        this.initUserInfo = res.data.data
      })
    },

    // 发送短信验证码
      sendMessage(){
        if(this.isOvertime){
            return false;
        }
        let that = this,
            time = 60;
          AjaxPlugin.$http.get(this.baseUrl + '/sendMessage/' + this.tel + '/' + this.imgValidate)
          .then((res) => {
            if(!res.data.success){
              this.$vux.alert.show({
                title:'',
                content: res.data.message
              })
              return
            }
            var sendTimer = setInterval(function(){
                that.isOvertime = true;
                time--;
                that.word = "重新发送"+time+"秒";
                if(time < 0){
                    that.isOvertime = false;
                    clearInterval(sendTimer);
                    that.word = "获取验证码";
                }
            },1000)
          })
    },

    refreshImgs(){
      document.getElementById('imgVerification').src='http://wx.wident.cn/server/wx9962603dfa0540e2/defaultKaptcha?d='+new Date()*1
    },

    submitForm(){
      if(this.membername === ''){
        this.$vux.alert.show({
          content:'用户名不能为空！'
        })
        return
      }
      if(this.tel.length != 11) {
        this.$vux.alert.show({
          content:'手机号不正确！'
        })
        return
      }
      if(this.telValidate = null) {
        this.$vux.alert.show({
          content:'短信验证码不正确！'
        })
        return
      }
      if(!this.agree){
          this.$vux.alert.show({
          title: '',
          content: '请先阅读并同意条款',
        })
        return
      }

       AjaxPlugin.$http.post(this.baseUrl + '/register',{'id': this.cookies,'phone': this.tel, 'name': this.membername,'vrifyCode': this.telValidates})
        .then((res) => {
          if(res.data.success){
            location.href = './selectCard.html'
          }else{
            this.$vux.alert.show({
              title:'',
              content: res.data.message
            })
          }
        })
    },
    a() {
      console.log('wechat',this.$wechat)
      console.log('http',this.$http)
      AjaxPlugin.$http.get('http://api.zb.com/data/v1/ticker?market=btc_usdt')
      .then((response) => {
        console.log('AjaxPlugin',response)
      })
    //    this.$store.dispatch('getverifyCodeImage').then((data) => {
    //      console.log('assasaaaaaa',data)
    //             // this.getInfo(data)
    //         })
    },

    // 微信扫一扫调起
    wxQRCode(){
      this.$wechat.scanQRCode({
      needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
      scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
      success: function (res) {
      var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
      }
      });
    },

    onBridgeReady(){
      WeixinJSBridge.invoke(
          'getBrandWCPayRequest', {
              "appId": this.init.appId,     //公众号名称，由商户传入     
              "timeStamp": this.init.timestamp,         //时间戳，自1970年以来的秒数     
              "nonceStr": this.init.nonce, //随机串     
              "package":"prepay_id=u802345jgfjsdfgsdg888",     
              "signType":"MD5",         //微信签名方式：     
              "paySign": this.init.signature //微信签名 
          },
          function(res){     
              if(res.err_msg == "get_brand_wcpay_request:ok" ) {}     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。 
          }
      ); 
    }
    // if (typeof WeixinJSBridge == "undefined"){
    //   if( document.addEventListener ){
    //       document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
    //   }else if (document.attachEvent){
    //       document.attachEvent('WeixinJSBridgeReady', onBridgeReady); 
    //       document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
    //   }
    // }else{
    //   onBridgeReady();
    // }
  }
}
</script>

<style lang="scss" src="./register.scss"></style>


