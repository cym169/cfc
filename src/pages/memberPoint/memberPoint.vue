<template>
    <div>
        <div class="header">

            <p class="header-title">{{memberPoint.score}}</p>
            积分
        </div>

        <div class="title">最近30条积分记录</div>
        <div class="content">
            <div class="content-item" v-for="item of pointInfo" :key="item.id">
                {{item.remark}}<span class="content-comein"
                                     :class="{'content-comeout': item.flag}">{{item.amount}}</span>
            </div>
            <!-- <div class="content-item clearfix">
              消费积分<span class="content-comeout">-10</span>
            </div>
            <div class="content-item clearfix">
              消费积分<span class="content-comein">+10</span>
            </div>
            <div class="content-item clearfix">
              消费积分<span class="content-comein">+10</span>
            </div> -->
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import {AjaxPlugin, Alert, AlertPlugin, Group, Cell, XInput, XButton, Checklist, Box, CheckIcon} from 'vux'
    import {cookies} from '../../global/index'

    Vue.use(AlertPlugin)

    export default {
        components: {
            AjaxPlugin, Alert,
            Group,
            Cell, XInput, CheckIcon,
            XButton, Checklist, Box
        },

        data() {
            return {
                baseUrl: 'http://wx.wident.cn/server/wx9962603dfa0540e2',
                init: {},   // 初始权限验证参数
                memberPoint: '',
                pointInfo: [],
                cookies: null,

            }
        },
        created() {
            this.cookies = cookies()
            AjaxPlugin.$http.get('http://wx.wident.cn/server/mp/signature/wx9962603dfa0540e2?url=http://wx.wident.cn/cfc/memberPoint.html')
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
                    this.$wechat.ready(function () {
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


            this.getPointInfo()
            this.getBalanceInfo()
        },
        methods: {
            // 获得会员积分\余额
            getPointInfo() {
                AjaxPlugin.$http.get(this.baseUrl + '/user/userWallet/' + this.cookies).then(res => {
                    this.memberPoint = res.data.data
                })
            },

            // 获得会员积分\余额明细   1:余额   2：积分
            getBalanceInfo() {
                AjaxPlugin.$http.get(this.baseUrl + '/user/balanceList/' + this.cookies + '/2').then(res2 => {
                    this.pointInfo = res2.data.data
                })
            },
        }
    }
</script>

<style lang="scss" src="./memberPoint.scss"></style>

