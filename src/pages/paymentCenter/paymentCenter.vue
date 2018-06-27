<template>
  <div>
    <div class="header">
      COINFANS CLUB
      <p class="header-title">扣费管理中心</p> 
    </div>
    <div class="bg"></div>
    <div class="content">
      <p class="name">微信昵称：{{initUserInfo.nickName}}</p>
      <p class="name">消费金额：</p>
      <input type="text" class="input-item" v-model="payAmount">
      <p class="name">支付方式：</p>
      <check-icon class="check-item" :value.sync="score" @click.native="scoreClick">积分<input v-model="convertAmount" type="text" @click.stop.prevent="scoreInput" class="input-item" style="margin-left:25px;"></check-icon>
      <check-icon class="check-item" :value.sync="balance" @click.native="balanceClick">余额</check-icon>
      <p class="name"><span>备注：</span><input type="text" v-model="remark" class="remark-input"></p>
      <x-button type="primary" @click.native="pay">扣款</x-button>
    </div>
    
  </div>
</template>

<script>
import Vue from 'vue'
import {AjaxPlugin, Alert, AlertPlugin, XDialog, cookie,
        Group, Cell, XInput, XButton, Checklist,Box, 
        CheckIcon, } from 'vux'
import { cookies } from '../../global/index'
Vue.use(AlertPlugin)

export default {
  components: {
    AjaxPlugin,Alert,
    Group, XDialog,
    Cell,XInput,CheckIcon,
    XButton, Checklist,Box
  },

  data(){
      return{
        show: false,
        score: false,
        balance: false,
        baseUrl:'http://wx.wident.cn/server/wx9962603dfa0540e2',
        initUserInfo:'',
        cookies:null,
        searchUrl :'a=1&b=2&c=3',
        // parmObj:['100043','10002685','e847a67a-5376-41a7-94e3-5d5d8ed67d5f'],
        obj:{},
        payAmount:'',
        convertAmount:'',
        opId:'',
        remark:'',
        temp:'',
        parmCookie: []
      }
  },

    created(){
      // 获取cookie, 判断是否调起用户授权
      this.cookies = cookies()
    AjaxPlugin.$http.get('http://wx.wident.cn/server/mp/signature/wx9962603dfa0540e2?url=http://wx.wident.cn/cfc/paymentCenter.html')
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
    },

  methods: {
    // 获得用户授权信息
    getUserInfo(){
      // 获取location参数
      // this.searchUrl = location.search
      // for(let i of this.searchUrl.split("&")){
      //   this.parmObj.push(i.split('=')[1])
      // }
   

      this.temp = cookie.get('CFC_PAY_URL_CODE')
      this.parmCookie = this.temp.split('#')
    
      // this.$vux.alert.show({
      //   title:'',
      //   content:parmCookie
      // })
      AjaxPlugin.$http.get(this.baseUrl + '/user/get/' + this.parmCookie[0]).then(res => {
        this.initUserInfo = res.data.data
      })

    },

    scoreClick(){
      if(this.score){
        this.balance = false
      }
      return
    },

    balanceClick(){
      if(this.balance){
        this.score = false
      }
      return
    },

    scoreInput(){
      if(!this.score){
        this.score = true
        this.balance = false
      }
      else{
        this.score = true
        this.balance = false
      }
    },

    pay(){
      // 积分支付
      if(this.score){
        this.obj = {
          // 'id': this.parmObj[0],
          // 'userId': this.parmObj[1],
          // 'nonceStr': this.parmObj[2],
          'payAmount': this.payAmount,
          'payType':2,  // 1是余额支付; 2是积分
          "convertAmount": this.convertAmount,  // 积分支付：支付的积分数				
          "opId": this.initUserInfo.userId,			//操作员Id
					"remark": this.remark		
        }
        AjaxPlugin.$http.post(this.baseUrl + '/admin/pay', this.obj).then(res => {
          // 此处location跳转paySuccess,带参数payAmount,payType,id
          if(res.data.success){
            // this.obj.payType = this.obj.payType.encodeURIComponent('积分') 

            location.href = `./paySuccess.html?payAmount=${this.obj.payAmount}&payType=${this.obj.payType}&id=${this.parmCookie[1]}`
          }else{
            location.href = './payFail.html?msg=' + res.data.message
          }
        })
      }
      else if(this.balance){
        this.obj = {
          // 'id': this.parmObj[0],
          // 'userId': this.parmObj[1],
          // 'nonceStr': this.parmObj[2],
          'payAmount': this.payAmount,
          'payType':1,  // 1是余额支付; 2是积分		
          "opId": this.initUserInfo.userId,			//操作员Id
					"remark": this.remark		
        }
        AjaxPlugin.$http.post(this.baseUrl + '/admin/pay', this.obj).then(res => {
 
          // 此处location跳转paySuccess,带参数payAmount,payType,id
          // this.$vux.alert.show({
          //   title:'',
          //   content: res.data
          // })
          if(res.data.success === true){
     
            // this.obj.payType = this.obj.payType.encodeURIComponent('余额') 
            // location.href ='./paySuccess.html?payType='+this.obj.payType+'&id='+this.parmCookie[1]
            // alert('paySuccess')
            location.href = './paySuccess.html?payAmount='+this.obj.payAmount+'&payType='+this.obj.payType+'&id='+this.parmCookie[1]
          }else{
            location.href = './payFail.html?msg=' + res.data.message
          }
        })
      }else{
        this.$vux.alert.show({
          title:'',
          content: '请选择支付方式'
        })
      }
    },
  }
}
</script>

<style lang="scss" src="./paymentCenter.scss"></style>

