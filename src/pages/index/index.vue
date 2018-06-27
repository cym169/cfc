<template>
    <div>
        <div class="header">
            <div class="card-bg">普卡会员
                <div class="qcode" @click="qcode"></div>
                <div class="card-num">No {{initUserInfo.userNum}}</div>
            </div>
        </div>
        <div class="item-list">
            <a href="memberPoint.html" alt="" class="item">
                会员积分<span>{{score}}</span>
            </a>
            <a href="accountBalance.html" alt="" class="item">
                账户余额<span>查看</span>
            </a>
            <div class="item">
                特权折扣<span>9.5折</span>
            </div>
        </div>
        <group>
            <cell title="个人资料" link="./personalData.html" is-link></cell>
            <cell title="升级金卡" link="./glodCard.html" is-link></cell>
            <cell title="会员卡说明" link="./memberCardDetail.html" is-link></cell>
        </group>

        <div v-if="initUserInfo.type === 2" style="padding:50px 30px 50px 30px;">
            <x-button type="primary" @click.native="wxQRCode">管理员扫码扣款</x-button>
            <x-button :gradients="['#ffab18', '#ffab18']" @click.native="linkToCashRecord">查询收银记录</x-button>
            <x-button @click.native="linkToDayStatistics">日结统计</x-button>
        </div>

        <x-dialog v-model="show" class="dialog-demo">
            <div class="img-box">
                <img :src="qrCodeImg" style="max-width:100%">
            </div>
            <div @click="show=false">
                <p class="vux-close"></p>
            </div>
        </x-dialog>
    </div>
</template>

<script>
    import Vue from 'vue'
    import {
        WechatPlugin, AjaxPlugin, Alert, XDialog, Group, Cell, XInput, XButton,
        cookie, Checklist, Box, CheckIcon
    } from 'vux'

    import {cookies} from '../../global/index'

    Vue.use(AjaxPlugin)
    Vue.use(WechatPlugin)


    export default {
        components: {
            AjaxPlugin, Alert,
            Group, XDialog,
            Cell, XInput, CheckIcon,
            XButton, Checklist, Box
        },

        data() {
            return {
                show: false,
                baseUrl: 'http://wx.wident.cn/server/wx9962603dfa0540e2',
                init: {},   // 初始权限验证参数
                initUserInfo: '',
                cookies: null,
                qrCodeImg: '',
                score: '',
            }
        },

        created() {
            // 获取cookie, 判断是否调起用户授权
            this.cookies = cookies()

            AjaxPlugin.$http.get('http://wx.wident.cn/server/mp/signature/wx9962603dfa0540e2?url=http://wx.wident.cn/cfc/index.html')
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
                            'onMenuShareWeibo'
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

            this.getUserInfo()
            this.getScore()

        },
        methods: {
            // 获得用户授权信息
            getUserInfo() {
                AjaxPlugin.$http.get(this.baseUrl + '/user/get/' + this.cookies).then(res => {
                    this.initUserInfo = res.data.data
                    if (!this.initUserInfo) {
                        location.href = 'http://wx.wident.cn/server/mp/oauth/wx9962603dfa0540e2'
                    } else if (this.initUserInfo.status === 1) {
                        location.href = './register.html'
                    } else if (this.initUserInfo.status === 2) {
                        location.href = './selectCard.html'
                    }
                })
            },

            // 获取积分
            getScore() {
                AjaxPlugin.$http.get(this.baseUrl + '/user/userWallet/' + this.cookies).then(res => {
                    this.score = res.data.data.score
                })
            },

            // 获取二维码
            qcode() {
                this.show = true
                AjaxPlugin.$http.get(this.baseUrl + '/user/getQRCode/' + this.cookies).then(res => {
                    this.qrCodeImg = res.data.data
                })
            },

            linkToCashRecord() {
                location.href = './cashRecord.html'
            },

            linkToDayStatistics() {
                location.href = './dayStatistics.html'
            },

            // 微信扫一扫调起
            wxQRCode() {
                this.$wechat.scanQRCode({
                    needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                    scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
                    success: function (res) {
                        // this.$vux.alert.show({
                        //   title:'',
                        //   content:'扫一扫回调'
                        // })
                        // var result = res; // 当needResult 为 1 时，扫码返回的结果
                        // location.href=`./paymentCenter/?payId=${res.payId}&userId=${res.userId}&nonceStr=${res.nonceStr}`
                    }
                });
            },


            a() {
                console.log('wechat', this.$wechat)
                console.log('http', this.$http)
                AjaxPlugin.$http.get('http://api.zb.com/data/v1/ticker?market=btc_usdt')
                    .then((response) => {
                        console.log('AjaxPlugin', response)
                    })
                //    this.$store.dispatch('getverifyCodeImage').then((data) => {
                //      console.log('assasaaaaaa',data)
                //             // this.getInfo(data)
                //         })
            }
        }
    }
</script>

<style lang="scss" src="./index.scss"></style>

