import Vue from 'vue'
import router from '@/router'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import { message } from 'ant-design-vue'
import {
    loginAPI,
    registerAPI,
    getUserInfoAPI,
    updateUserInfoAPI,
} from '@/api/user'


import {
    getUserOrdersAPI,
    cancelOrderAPI,
    commentAddApI,

} from '@/api/order'
import {dataToArray} from "ant-design-vue/lib/vc-drawer/src/utils";

const getDefaultState = () => {
    return {
        userId: '',
        userInfo: {

        },
        userOrderList: [

        ],

    }
}

const user = {
    state : {userId: '',
        userInfo: {

        },
        userOrderList: [
        ],
        addCommentVisible:false,
        commentVisible:true,
        activeOrderId:-1
    },

    mutations: {
        reset_state: function(state) {
            state.token = '',
            state.userId = '',
            state.userInfo = {
                
            },
            state.userOrderList = []
        },
        set_token: function(state, token){
            state.token = token
        },
        set_email: (state, data) => {
            state.email = data
        },
        set_addCommentVisible:(state,data)=>{

            state.addCommentVisible=data,
            alert(state.addCommentVisible)
        },
        set_commentVisible:(state,data)=>{
            state.commentVisible=data
        },
        set_activeOrderId:(state,data)=>{
            state.activeOrderId=data
        },
        set_userId: (state, data) => {
            state.userId = data
        },
        set_userInfo: (state, data) => {
            state.userInfo = {
                ...state.userInfo,
                ...data
            }
        },
        set_userOrderList: (state, data) => {
            state.userOrderList = data
        }
    },

    actions: {
        login: async ({ dispatch, commit }, userData) => {
            const res = await loginAPI(userData)
            if(res){
                setToken(res.id)
                commit('set_userId', res.id)
                dispatch('getUserInfo')
                router.push('/hotel/hotelList')
            }
        },
        register: async({ commit }, data) => {
            const res = await registerAPI(data)
            if(res){
                message.success('????????????')
            }
        },
        getUserInfo({ state, commit }) {
            return new Promise((resolve, reject) => {
              getUserInfoAPI(state.userId).then(response => {
                const data = response
                if (!data) {
                  reject('?????????????????????????????????')
                }
                commit('set_userInfo', data)
                commit('set_userId', data.id)
                resolve(data)
              }).catch(error => {
                reject(error)
              })
            })
        },
        updateUserInfo: async({ state, dispatch }, data) => {
            const params = {
                id: state.userId,
                ...data,
            }
            const res = await updateUserInfoAPI(params)
            if(res){
                message.success('????????????')
                dispatch('getUserInfo')
            }
        },
        getUserOrders: async({ state, commit }) => {
            const data = {
                userId: Number(state.userId)
            }
            const res = await getUserOrdersAPI(data)
            if(res){
                commit('set_userOrderList', res)
                console.log(state.userOrderList)
            }
        },
        cancelOrder: async({ state, dispatch }, orderId) => {
            const res = await cancelOrderAPI(orderId)
            if(res) {
                dispatch('getUserOrders')
                message.success('????????????')
            }else{
                message.error('????????????')
            }
        },
        logout: async({ commit }) => {
            removeToken()
            resetRouter()
            commit('reset_state')
        },
          // remove token
        resetToken({ commit }) {
            return new Promise(resolve => {
                removeToken() // must remove  token  first
                commit('reset_state')
                resolve()
            })
        },

        addComment: async ({commit,dispatch},data)=>{
            const res=await commentAddApI(data)
            if(res){
                     commit('set_addCommentVisible',false)
                    message.success('????????????')
                    dispatch('getUserOrders')
                    commit('set_commentVisible',true)

            }
            else{
                message.error('????????????')
            }
        }
    }
}

export default user