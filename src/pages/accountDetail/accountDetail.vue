<template>
    <div>
        <div class="header">
            <p class="header-top">{{ detailList.payType === 1 ? 'CFC扫码余额收款' : 'CFC扫码积分收款'}}</p>
            <p class="header-center" v-if="detailList.payType === 2">+{{detailList.convertAmount * -1}}<span>积分</span>
            </p>
            <p class="header-center" v-else>+{{detailList.payAmount * -1}}<span>元</span></p>
            <p class="header-bottom" v-if="detailList.status === 1">收款成功</p>
            <p class="header-bottom fail" v-if="detailList.status === 2">收款失败</p>
        </div>

        <div class="content">
            <div class="content-item">
                付款方式
                <div class="content-item-right">{{detailList.payType === 1 ? '余额支付' : '积分支付'}}</div>
            </div>
            <div class="content-item">
                商品备注
                <div class="content-item-right">{{detailList.remark}}</div>
            </div>
            <div class="content-item">
                付款卡号
                <div class="content-item-right">{{detailList.userNum}}</div>
            </div>
            <div class="content-item" v-if="detailList.payType === 1">
                积分奖励
                <div class="content-item-right">+{{detailList.reward}}积分</div>
            </div>
            <div class="divider"></div>
            <div class="content-item">
                创建时间
                <div class="content-item-right">{{detailList.createTime | dateFormat}}</div>
            </div>
            <div class="content-item">
                订单号
                <div class="content-item-right">{{detailList.id}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import {AjaxPlugin, Alert, AlertPlugin, XButton} from 'vux'

    Vue.use(AlertPlugin)
    Vue.use(AjaxPlugin)

    export default {
        components: {
            AjaxPlugin, Alert, XButton
        },

        data() {
            return {
                baseUrl: 'http://wx.wident.cn/server/wx9962603dfa0540e2',
                searchUrl: '',
                detailList: [],
            }
        },
        created() {
            this.searchUrl = location.search.split('=')[1]
8
            AjaxPlugin.$http.get(this.baseUrl + `/admin/balance/${this.searchUrl}`).then(res => {
                this.detailList = res.data.data
            })

            AjaxPlugin.$http.get('http://wx.wident.cn/server/mp/signature/wx9962603dfa0540e2?url=http://wx.wident.cn/cfc/accountDetail.html')
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
        methods: {}
    }
</script>

<style lang="scss" src="./accountDetail.scss"></style>

