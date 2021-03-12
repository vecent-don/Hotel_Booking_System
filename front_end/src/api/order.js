import { axios } from '@/utils/request'
const api = {
    orderPre: '/api/order'
}
export function reserveHotelAPI(data) {
    return axios({
        url: `${api.orderPre}/addOrder`,
        method: 'POST',
        data,
    })
}
export function commentAddApI(data) {
    return axios({
        url: `${api.orderPre}/addComment`,
        method:'POST',
        data,
    })
}
export function getAllOrdersAPI() {
    return axios({
        url: `${api.orderPre}/getAllOrders`,
        method: 'GET',
    })
}
export function getUserOrdersAPI(data) {
    return axios({
        url: `${api.orderPre}/${data.userId}/getUserOrders`,
        method: 'GET',
    })
}
export function getHotelOrdersAPI(data) {
    // return axios({
    //     url: `${api.orderpre}/${data.hotelId}/getHotelorders`,
    //     method:'GET',
    // })
    return axios({
        url: `${api.orderPre}/getAllOrders`,
        method: 'GET',
    })
}
export function updateOdersAPI(data) {
    alert("we are now")
    return axios({
        url: `${api.orderPre}/updateOdersAPI`,
        method: 'POST',
        data,
    })
}
export function cancelOrderAPI(orderId) {
    return axios({
        url: `${api.orderPre}/${orderId}/annulOrder`,
        method: 'GET',
    })
}

