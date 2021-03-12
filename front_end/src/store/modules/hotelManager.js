import {
    addRoomAPI,
    addHotelAPI,
} from '@/api/hotelManager'
import {
    getHotelOrdersAPI,
    getAllOrdersAPI,
    updateOdersAPI,
} from '@/api/order'
import {
    hotelAllCouponsAPI,
    hotelTargetMoneyAPI,
} from '@/api/coupon'
import { message } from 'ant-design-vue'

const hotelManager = {
    state: {
        updateOrderModalVisible: false,
        orderList: [],
        addHotelParams: {
            name: '',
            address: '',
            bizRegion:'XiDan',
            hotelStar:'',
            rate: 0,
            description:'',
            phoneNum:'',
            managerId:'',
        },
        addHotelModalVisible: false,
        addRoomParams: {
            roomType: '',
            hotelId: '',
            price: '',
            total: 0,
            curNum: 0,
            peopleNum:0,
            breakfast: '',
        },
        addRoomModalVisible: false,
        addCouponStrategyParams: {
            description:'',
            type:'',
            name:'',
            targetMoney:0,
            discountMoney:0,
            discount:0,
        },
        updateOrdersParams:{
            hotelId: '',
            hotelName: '',
            userId: -1,
            checkInDate: '',
            checkOutDate: '',
            roomType: '',
            roomNum: '',
            peopleNum: '',
            haveChild: '',
            createDate: '',
            price:'',
        },
        couponVisible: false,
        addCouponVisible: false,
        activeHotelId: 0,
        couponList: [],
    },
    mutations: {
        set_orderList: function(state, data) {
            state.orderList = data
        },
        set_addHotelModalVisible: function(state, data) {
            state.addHotelModalVisible = data
        },
        set_addHotelParams: function(state, data) {
            state.addHotelParams = {
                ...state.addHotelParams,
                ...data,
            }
        },
        set_addRoomModalVisible: function(state, data) {
            state.addRoomModalVisible = data
        },
        set_addRoomParams: function(state, data) {
            console.log(state.addRoomParams);
            state.addRoomParams = {
                ...state.addRoomParams,
                ...data,
            }

            console.log(state.addRoomParams);

        },
        set_couponVisible: function(state, data) {
            state.couponVisible = data
        },
        set_addCouponStrategyParams(state,data){
            state.addCouponStrategyParams={
                ...state.addCouponStrategyParams,
                ...data,
            }
        },
        set_activeHotelId: function(state, data) {
            state.activeHotelId = data
        },
        set_couponList: function(state, data) {
            state.couponList = data
        },
        set_addCouponVisible: function(state, data) {
            state.addCouponVisible =data
        },
        set_updateOrderModalVisible: function (state,data) {
            state.updateOrderModalVisible=data
        },
        set_updateOrdersParams:function (state,data) {

            state.updateOrdersParams={
                ...state.updateOrdersParams,
                ...data,
            }
        }
    },
    actions: {
        getAllOrders: async({ state, commit }) => {
            const res = await getAllOrdersAPI()
            if(res){
                commit('set_orderList', res)
            }
        },
        getHotelOrders:async ({state,commit})=>{
          const data={
              hotelId: Number(state.hotelId)
          }
          const  res= await getHotelOrdersAPI(data)
            alert(res)
            if(res){
                commit('set_orderList',res)
                console.log(state.orderList)
            }
        },
        addHotel: async({ state, dispatch, commit }) => {
            const res = await addHotelAPI(state.addHotelParams)
            if(res){
                dispatch('getHotelList')
                commit('set_addHotelParams', {
                    name: '',
                    address: '',
                    bizRegion:'XiDan',
                    hotelStar:'',
                    rate: 0,
                    description:'',
                    phoneNum:'',
                    managerId:'',
                })
                commit('set_addHotelModalVisible', false)
                message.success('添加成功')
            }else{
                message.error('添加失败')
            }
        },
        addRoom: async({ state, dispatch, commit }) => {
            const res = await addRoomAPI(state.addRoomParams)
            if(res===null){
                commit('set_addRoomModalVisible', false)
                commit('set_addRoomParams', {
                    roomType: '',
                    hotelId: '',
                    price: '',
                    total: 0,
                    curNum: 0,
                    peopleNum: 0,
                    breakfast: '',
                })
                message.success('添加成功')
            }else{
                message.error('添加失败')
            }
        },
        getHotelCoupon: async({ state, commit }) => {
            const res = await hotelAllCouponsAPI(state.activeHotelId)

            if(res) {
                // 获取到酒店策略之后的操作（将获取到的数组赋值给couponList）
                commit('set_couponList',res)
            }
            alert(state.couponList)
            console.log(state.couponList)
        },
        addHotelCoupon: async({ commit, dispatch }, data) => {

            const res = await hotelTargetMoneyAPI(data)

            if(res){
                // 添加成功后的操作（提示文案、modal框显示与关闭，调用优惠列表策略等）
                commit('set_addCouponVisible', false)


                // commit('set_addCouponStrategyParams', {
                //     name: '',
                //     description: '',
                //     type: '',
                //     targetMoney: 0,
                //     discountMoney: 0,
                // })
                message.success('添加成功')
                dispatch('getHotelCoupon')
                commit('set_couponVisible', true)

            }else{
                // 添加失败后的操作
                message.error('添加失败')
            }
        },

        updateOrders: async ({state,commit,dispatch},data,type)=>{
            const value={
                updateType:type,
                order:data,
            }
            const res = await updateOdersAPI(value)
            if(res){
                message.success('修改成功')
                state.set_updateOrderModalVisible(false)
                dispatch('getHotelOrders')
            }
            else{
                message.error('修改失败')
            }

        }
    }
}
export default hotelManager