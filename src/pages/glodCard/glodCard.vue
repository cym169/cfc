<template>
    <div>
        <div class="item">
            <p>COINFANS CLUB 金卡会员</p>
            <p>尊贵特权只为少数派</p>
            <div class="img">
                <img src="../../assets/glod_card.png" width="100%" alt="">
            </div>
            <!--折扣、积分-->
            <div class="discount">
                <div class="discount-flex">
                    <img class="discount-icon" src="../../assets/discount.png" alt="">
                    <div class="discount-cont">
                        专享折扣<p>任意消费8折</p>
                    </div>
                </div>
                <div class="discount-flex">
                    <img class="discount-icon" src="../../assets/integral.png" alt="">
                    <div class="discount-cont">
                        积分加倍<p>消费积分翻倍</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="divider"></div>
        <div class="item">
            <p class="cardTitle">选择您的专属卡号</p>
            <group>
                <selector placeholder="请选择靓号" v-model="cardValue" :options="cardList"></selector>
            </group>
        </div>
        <div class="tip">* 专属金卡需在选卡后支付5000元，选择号码后，请点击支付领取，付款成功后将获得尊贵金卡，否则讲返回选卡页面。</div>
        <div class="btn">
            <x-button :gradients="['#c7a062', '#c7a062']" style="border-radius:99px" @click.native="rechange">支付领取
            </x-button>
        </div>

    </div>
</template>

<script>
    import Vue from 'vue'
    import {AjaxPlugin, AlertPlugin, Alert, XButton, Selector, Group, Cell} from 'vux'
    import {cookies} from '../../global/index'

    Vue.use(AjaxPlugin)
    Vue.use(AlertPlugin)

    export default {
        components: {
            AjaxPlugin, Alert,
            XButton, Selector, Group, Cell,
        },

        data() {
            return {
                init: {},
                cardValue: '',
                baseUrl: 'http://wx.wident.cn/server/wx9962603dfa0540e2',
                cookies: null,
                cardList: [],
            }
        },
        created() {
            // 获取cookie, 判断是否调起用户授权
            this.cookies = cookies()
            AjaxPlugin.$http.get('http://wx.wident.cn/server/mp/signature/wx9962603dfa0540e2?url=http://wx.wident.cn/cfc/glodCard.html')
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


            this.getCardList()
        },
        methods: {

            // 获取卡号列表
            getCardList() {
                AjaxPlugin.$http.get(this.baseUrl + '/user/specialNum').then(res => {
                    this.cardList = res.data.data
                })
            },

            // 支付领取
            rechange() {
                // 提交选中的卡号
                // AjaxPlugin.$http.post(this.baseUrl + '/choiceNumber', {'userId': this.cookies,'type':1, 'no': this.cardValue}).then(res => {
                //   console.log(res)
                // })
                this.$vux.alert.show({
                    title: '',
                    content: '急速开发中'
                })
            },
            onBridgeReady() {
                WeixinJSBridge.invoke(
                    'getBrandWCPayRequest', {
                        "appId": this.init.appId,     //公众号名称，由商户传入
                        "timeStamp": this.init.timestamp,         //时间戳，自1970年以来的秒数
                        "nonceStr": this.init.nonce, //随机串
                        "package": "prepay_id=u802345jgfjsdfgsdg888",
                        "signType": "MD5",         //微信签名方式：
                        "paySign": this.init.signature //微信签名
                    },
                    function (res) {
                        if (res.err_msg == "get_brand_wcpay_request:ok") {
                        }     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
                    }
                );
            },


        }
    }
</script>

<style lang="scss" src="./glodCard.scss"></style>


