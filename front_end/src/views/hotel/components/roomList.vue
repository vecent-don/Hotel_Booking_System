<template>
    <div class="room-list">
        <div class="filter">

        </div>

        <div style="width: 100%; text-align: right; margin:20px 0">
            <a-button type="primary" @click="addRoom" v-if="userInfo.userType=='HotelManager'"><a-icon type="plus" />添加房间</a-button>
        </div>

        <div class="list">
            <a-table
                :columns="columns"
                :dataSource="rooms"
        >
                <span slot="price" slot-scope="text">
                    <span>￥{{ text }}</span>
                </span>

            <span slot="action" slot-scope="text, record">
                    <a-button type="primary" @click="order(record)" v-if="userInfo.userType=='Client'">预定</a-button>
                <a-button type="primary" @click="order(record)" v-if="userInfo.userType=='HotelManager'">修改</a-button>
                <a-divider type="vertical"></a-divider>
                <a-button type="primary" @click="order(record)" v-if="userInfo.userType=='HotelManager'">删除</a-button>
            </span>

        </a-table>
        </div>
        <AddRoomModal></AddRoomModal>
        <OrderModal></OrderModal>
    </div>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import OrderModal from './orderModal'
import AddRoomModal from './addRoomModal'
import hotelList from "../hotelList";
const columns = [
    {  
      title: '房型',
      dataIndex: 'roomType',
      key: 'roomType',
    },
    {
      title: '床型',
      dataIndex: 'bedType',
      key: 'bedType',
    },
    {
      title: '早餐',
      dataIndex: 'breakfast',
      key: 'breakfast',
    },
    {
      title: '入住人数',
      key: 'peopleNum',
      dataIndex: 'peopleNum',
    },
    {
      title: '房价',
      key: 'price',
      dataIndex: 'price',
      scopedSlots: { customRender: 'price'}
    },
    {
      title: 'Action',
      key: 'action',
      scopedSlots: { customRender: 'action' },
    },
  ];
export default {
    name:'roomList',
    props: {
        rooms: {
            type: Array
        }
    },
    data() {
        return {
            columns,
        }
    },
    components: {
        OrderModal,
        AddRoomModal,
    },
    computed: {
        ...mapGetters([
            'orderModalVisible',
            'userInfo',
            'hotelList',
            'activeHotelId',
            'addRoomModalVisible',
        ])
    },
    monuted() {
    },
    methods: {
        ...mapMutations([
            'set_orderModalVisible',
            'set_currentOrderRoom',
            'set_addRoomModalVisible',
            'set_activeHotelId',
        ]),
        ...mapActions([
            'getHotelList',

        ]),
        order(record) {
            this.set_currentOrderRoom(record)
            this.set_orderModalVisible(true)
        },
        change(record){
            this.set_activeHotelId(record.id)
            this.set_addRoomModalVisible(true)
        },
        addRoom() {
            this.set_activeHotelId(1)//activeHotelId.id
            this.set_addRoomModalVisible(true)
        },
        // dele(record){
        //
        // },
    }
}
</script>