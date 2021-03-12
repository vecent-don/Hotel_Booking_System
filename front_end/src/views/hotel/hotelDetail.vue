<template>
    <a-layout>
        <a-layout-content>
            <div class="hotelDetailCard">
                <h1>
                    {{ currentHotelInfo.title }}
                </h1>
                <div class="hotel-info">
                    <a-card style="width: 240px">
                        <img
                            alt="example"
                            src="@/assets/cover.jpeg"
                            slot="cover"
                            referrerPolicy="no-referrer"
                            />
                    </a-card>
                    <div class="info">
                        <div class="items" v-if="currentHotelInfo.name">
                            <span class="label">酒店名称：</span>
                            <span class="value">{{ currentHotelInfo.name }}</span>
                        </div>
                        <div class="items" v-if="currentHotelInfo.address">
                            <span class="label">地址</span>
                            <span class="value">{{ currentHotelInfo.address }}</span>
                        </div>
                        <div class="items" v-if="currentHotelInfo.rate">
                            <span class="label">评分:</span> 
                            <span class="value">{{ currentHotelInfo.rate }}</span>
                        </div>
                        <div class="items" v-if="currentHotelInfo.hotelStar">
                            <span class="label">星级:</span> 
                            <a-rate style="font-size: 15px" :value="currentHotelInfo.rate" disabled allowHalf/>
                        </div>
                        <div class="items" v-if="currentHotelInfo.description">
                            <span class="label">酒店简介:</span> 
                            <span class="value">{{ currentHotelInfo.description }}</span>
                        </div>
                    </div>
                </div>
                <a-divider></a-divider>
                <a-tabs>
                    <a-tab-pane tab="房间信息" key="1">
                        <RoomList :rooms="currentHotelInfo.rooms"></RoomList>
                    </a-tab-pane>
                    <a-tab-pane tab="酒店详情" key="2">

                    </a-tab-pane>
                    <a-tab-pane tab="历史评价" key="3">
                        <HistoryComment :comments="listData"></HistoryComment>

                    </a-tab-pane>
                </a-tabs>
            </div>
        </a-layout-content>
    </a-layout>
</template>
<script>

    import HistoryComment from "./components/historyComment";
    const listData = [
        {
            author: '刘钦',
            rate:3,
            color:'#f52de8',
            credit:100,
            content:
                'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
        },
        {
            author: '任桐炜',
            rate:5,
            color:'#7265e6',
            credit:120,
            content:
                'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
        }
    ];


    console.log(listData);
import { mapGetters, mapActions, mapMutations } from 'vuex'
import RoomList from './components/roomList'

export default {
    name: 'hotelDetail',
    components: {
        HistoryComment,
        RoomList
    },
    data() {
        return {
            listData
        }
    },
    computed: {
        ...mapGetters([
            'currentHotelInfo',
        ]),

    },
    mounted() {
        this.set_currentHotelId(Number(this.$route.params.hotelId))
        this.getHotelById()
        this.testMethods()
    },
    beforeRouteUpdate(to, from, next) {
        this.set_currentHotelId(Number(to.params.hotelId))
        this.getHotelById()
        next()
    },
    methods: {
        ...mapMutations([
            'set_currentHotelId',
        ]),
        ...mapActions([
            'getHotelById'
        ]),
        testMethods(){

        }
    }
}
</script>
<style scoped lang="less">
    .hotelDetailCard {
        padding: 50px 50px;
    }
    .hotel-info {
        display: flex;
        align-items: stretch;
        justify-content: flex-start;
        .info{
            padding: 10px 0;
            display: flex;
            flex-direction: column;
            margin-left: 20px;
            .items {
                display: flex;
                align-items: center;
                margin-bottom: 10px;
                .label{
                    margin-right: 10px;
                    font-size: 18px;
                }
                .value {
                    margin-right: 15px
                }
            }
        }
    }
</style>