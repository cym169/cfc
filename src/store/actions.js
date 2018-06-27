import Svc from '../service/index.js'

export const login = ({ commit }, { loginName, password, vcode }) => {
    return Svc.login(loginName, password, vcode)
}

export const getverifyCodeImage = ({ commit }) => {
    console.log('action')
    return Svc.getverifyCodeImage()
}

/*******************注册********************/
// 提交注册
export const postRegister = ({ commit }, { phone, name, smsCode }) => {
    return Svc.postRegister(phone, name, smsCode)
}

// 数据一致性同步
export const postDataSyn = ({ commit }) => {
    return Svc.postDataSyn()
}

/*******************交易所管理********************/
// 获得数据列表
export const getExchangeList = ({ commit }, { currentPage }) => {
    return Svc.getExchangeList(currentPage)
}

// 数据一致性同步
export const postExchangeSyn = ({ commit }) => {
    return Svc.postExchangeSyn()
}

// 开启/关闭按钮操作
export const postChangeStatus = ({ commit }, { status, id }) => {
    return Svc.postChangeStatus(Number(status), id)
}