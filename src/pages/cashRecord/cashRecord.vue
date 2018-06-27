<template>
  <div>
    <group>
      <datetime title="开始时间" v-model="startTime"></datetime>
      <datetime title="结束时间" v-model="endTime"></datetime>
      <x-button type="primary" @click.native="search">开始查询</x-button>
    </group>

    <divider class="dividers">快捷查询时间</divider>
    <flexbox class="flexbox">
        <flexbox-item class="flexbox-item">
          <x-button type="primary" mini @click.native="searchDay(2,1)">今天</x-button>
        </flexbox-item>
        <flexbox-item class="flexbox-item">
          <x-button type="primary" mini @click.native="searchDay(2,2)">昨天</x-button>
        </flexbox-item>
        <flexbox-item class="flexbox-item">
          <x-button type="primary" mini @click.native="searchDay(2,3)">本周</x-button>
        </flexbox-item>
        <flexbox-item class="flexbox-item">
          <x-button type="primary" mini @click.native="searchDay(2,4)">本月</x-button>
        </flexbox-item>
      </flexbox>
    
    <div class="bg"></div>
    <div class="content">
      <div class="content-item">
        <div class="content-item-left" style="font-size:15px; color:#aaa">
          收支明细
        </div>
        <div class="content-item-right" style="font-size:15px; color:#191919;">
          共计{{total}}元
        </div>
      </div>
      <div class="content-item" v-for='item of cashList' :key='item.id' @click="linkToAccountDetail(item.id)">
        <div class="content-item-left">
          {{item.createTime | dateFormat}}
          <p class="content-item-left-time">{{item.createTime | dateFormat2}}</p>
        </div>
        <div class="content-item-right">
          {{ item.payType === 1 ? '余额支付' : '积分支付'}}
          <p class="content-item-right-num">+{{ item.payType === 1 ? item.payAmount : item.convertAmount }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import {AjaxPlugin, Alert, AlertPlugin, XDialog, 
        Group, Cell, XInput, XButton, Checklist,Box, 
        CheckIcon, Datetime, Flexbox, FlexboxItem, Divider } from 'vux'
Vue.use(AlertPlugin)
Vue.use(AjaxPlugin)

export default {
  components: {
    AjaxPlugin,Alert,
    Group, XDialog,
    Cell,XInput,CheckIcon,
    XButton, Checklist,Box, Datetime,
    Flexbox, FlexboxItem, Divider
  },

  data(){
      return{
        baseUrl:'http://wx.wident.cn/server/wx9962603dfa0540e2',
        startTime:'',
        endTime:'',
        total:'',
        cashList:[],
      }
  },
  created(){
    AjaxPlugin.$http.get('http://wx.wident.cn/server/mp/signature/wx9962603dfa0540e2?url=http://wx.wident.cn/cfc/cashRecord.html')
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



      this.searchDay(2,1)

  },

  methods: {
    /**
     * 获取时间段收银记录
     * type:时间段 1，  天数  2
     * period: 默认天数 1,  其它  1：今天 2：昨天、3：本周、4：本月
     */
    search(){
      if(this.startTime === '' || this.endTime === ''){
        this.$vux.alert.show({
          title:'',
          content:'时间段不能为空'
        })
        return
      }
      AjaxPlugin.$http.post( this.baseUrl + '/admin/balanceList', {'type': 1, 'startTime': this.startTime,'endTime': this.endTime}).then(res => {
        if(res.data.data === null){
          this.$vux.alert.show({
            title:'',
            content:'暂无查询数据'
          })
          this.total = 0
          this.cashList = null
          return
        }
        this.total = res.data.data.amountTotal
        this.cashList = res.data.data.list
        // console.log(res)
      })
    },

    // 获取快捷收银记录
    searchDay(type, period){
      AjaxPlugin.$http.post( this.baseUrl + '/admin/balanceList', {'type': type, 'period': period}).then(res => {
        if(res.data.data === null){
          this.$vux.alert.show({
            title:'',
            content:'暂无查询数据'
          })
        this.total = 0
        this.cashList = null
        return
        }
        this.total = res.data.data.amountTotal
        this.cashList = res.data.data.list
      })
    },

    // 点击记录跳转
    linkToAccountDetail(id){
      location.href = `./accountDetail.html?id=${id}`
    }
  }
}
</script>

<style lang="scss" src="./cashRecord.scss"></style>

