<template>
    <div>
        <div class="header">
            <p class="header-title">COINFANS CLUB</p>
            会员卡说明
        </div>

        <div class="title">会员卡详情</div>
        <div class="content">
            <div class="content-item">
                <p class="content-title">特权说明</p>
                <p class="content-cont">1、持本卡消费可享受会员优惠政策。<br/>2、消费积分兑换饮品。</p>
            </div>
            <div class="content-item">
                <p class="content-title">有效日期</p>
                <p class="content-cont">永久有效</p>
            </div>
            <div class="content-item">
                <p class="content-title">使用须知</p>
                <p class="content-cont">1、请在结账前出示会员卡二维码。<br/>2、此卡可享受不同等级会员卡优惠待遇。<br/>3、此卡不得与其它套餐优惠同时使用。<br/>4、本店保留此卡法律范围内的最终解释权。
                </p>
            </div>
        </div>


    </div>
</template>

<script>
    import Vue from 'vue'
    import {AjaxPlugin, Alert, AlertPlugin, Group, Cell, XInput, XButton, Checklist, Box, CheckIcon} from 'vux'

    Vue.use(AlertPlugin)

    export default {
        components: {
            AjaxPlugin, Alert,
            Group,
            Cell, XInput, CheckIcon,
            XButton, Checklist, Box
        },

        data() {
            return {}
        },
        created() {
            AjaxPlugin.$http.get('http://wx.wident.cn/server/mp/signature/wx9962603dfa0540e2?url=http://wx.wident.cn/cfc/memberCardDetail.html')
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


        },
        methods: {
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

<style lang="scss" src="./memberCardDetail.scss"></style>

