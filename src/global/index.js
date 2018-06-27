// 获取cookie, 判断是否调起用户授权
import { cookie } from 'vux'


export function cookies() {
    let cookies = cookie.get('_wx9962603dfa0540e2_userId')

    if (cookies) {
        return cookies
    } else {
        location.href = 'http://wx.wident.cn/server/mp/oauth/wx9962603dfa0540e2'
    }
}