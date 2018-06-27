import Axios from 'axios'
// const Axios = require('axios')

function Service() {
    let axiosIns = Axios.create({
        // timeout: 1000,
        baseURL: 'http://http://wx.wident.cn/server/wx9962603dfa0540e2/',
        // baseURL: '172.16.5.54:8081',
        transformRequest: [function(data) {
            let retData = ""
            for (let i in data) {
                retData += i + '=' + data[i] + '&'
            }
            return retData
        }],
    })
    axiosIns.defaults.withCredentials = true
        // axiosIns.defaults.headers.common['token'] = sessionStorage.getItem('token')
    axiosIns.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8'

    this.postRegister = (phone, name, smsCode) => {
        return axiosIns.post('register', { phone: phone, name: name, smsCode: smsCode })
    }

    this.getverifyCodeImage = () => {
        console.log('server')
            // return this.$http.get('/verifyCodeImage')
        return this.$http.get(`http://api.zb.com/data/v1/ticker?market=btc_usdt`)
    }



}

// module.exports = new Service()
export default new Service()