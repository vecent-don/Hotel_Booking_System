<template>
    <div class="info-wrapper">
        <a-tabs>
            <a-tab-pane tab="我的信息" key="1">
                <a-form :form="form" style="margin-top: 30px">
                    <a-form-item label="头像" :label-col="{ span: 3 }" :wrapper-col="{ span: 8, offset: 1 }">
                        <a-avatar
                                shape="square"
                                size="large"
                                :style="{ backgroundColor: color, verticalAlign: 'middle' }"
                        >
                            {{ avatarValue }}
                        </a-avatar>
                        <a-divider type="vertical" ></a-divider>
                        <a-button
                                size="small"
                                :style="{ marginLeft: 16, verticalAlign: 'middle' }"
                                @click="changeValue"
                                v-if="modify"
                        >
                            改变
                        </a-button>
                    </a-form-item>
                    <a-form-item label="用户名" :label-col="{ span: 3 }" :wrapper-col="{ span: 8, offset: 1  }">
                        <a-input
                                placeholder="请填写用户名"
                                v-decorator="['userName', { rules: [{ required: true, message: '请输入用户名' }] }]"
                                v-if="modify"
                        />
                        <span v-else>{{ userInfo.userName }}</span>
                    </a-form-item>
                    <a-form-item label="邮箱" :label-col="{ span: 3 }" :wrapper-col="{ span: 8, offset: 1 }">
                        <span>{{ userInfo.email }}</span>
                    </a-form-item>

                    <a-form-item label="手机号" :label-col="{ span: 3 }" :wrapper-col="{ span: 8, offset: 1 }">
                        <a-input
                                placeholder="请填写手机号"
                                v-decorator="['phoneNumber', { rules: [{ required: true, message: '请输入手机号' }] }]"
                                v-if="modify"
                        />
                        <span v-else>{{ userInfo.phoneNumber}}</span>
                    </a-form-item>
                    <a-form-item label="信用值" :label-col="{ span: 3 }" :wrapper-col="{ span: 8, offset: 1 }">
                        <span>{{ userInfo.credit }}</span>
                    </a-form-item>
                    <a-form-item label="密码" :label-col="{ span: 3 }" :wrapper-col="{ span: 8, offset: 1 }" v-if="modify">
                        <a-input
                                placeholder="请输入新密码"
                                v-decorator="['password', { rules: [{ required: true, message: '请输入新密码' }] }]"
                        />
                    </a-form-item>
                    <a-form-item :wrapper-col="{ span: 12, offset: 5 }" v-if="modify">
                        <a-button type="primary" @click="saveModify">
                            保存
                        </a-button>
                        <a-button type="default" style="margin-left: 30px" @click="cancelModify">
                            取消
                        </a-button>
                    </a-form-item>
                    <a-form-item :wrapper-col="{ span: 8, offset: 4 }" v-else>
                        <a-button type="primary" @click="modifyInfo">
                            修改信息
                        </a-button>
                    </a-form-item>
                </a-form>
            </a-tab-pane>

            <a-tab-pane tab="我的订单" key="2">
                <a-table
                        :columns="columns"
                        :dataSource="userOrderList"
                        bordered
                >
                    <span slot="price" slot-scope="text">
                        <span>￥{{ text }}</span>
                    </span>
                    <span slot="roomType" slot-scope="text">
                        <span v-if="text == 'BigBed'">大床房</span>
                        <span v-if="text == 'DoubleBed'">双床房</span>
                        <span v-if="text == 'Family'">家庭房</span>
                    </span>
                    <a-tag slot="orderState" color="blue" slot-scope="text">
                        {{ text }}
                    </a-tag>
                    <span slot="action" slot-scope="record">
                        <a-button type="primary" size="small">查看</a-button>
                        <a-divider type="vertical" v-if="record.orderState == '已预订'"></a-divider>
                        <a-popconfirm
                                title="你确定撤销该笔订单吗？"
                                @confirm="confirmCancelOrder(record.id)"
                                @cancel="cancelCancelOrder"
                                okText="确定"
                                cancelText="取消"
                                v-if="record.orderState == '已预订'"
                        >
                            <a-button type="danger" size="small">撤销</a-button>
                        </a-popconfirm>
                        <a-divider type="vertical" v-if="record.orderState == '已入住'"></a-divider>
                       <a-popconfirm
                               title="你确定删除该笔订单的历史记录吗？"
                               @confirm="confirmCancelOrder(record.id)"
                               @cancel="cancelCancelOrder"
                               okText="确定"
                               cancelText="取消"
                               v-if="record.orderState == '已入住'"
                       >
                            <a-button type="danger" size="small">删除</a-button>
                        </a-popconfirm>
                        <a-divider type="vertical" v-if="record.orderState == '已入住'"></a-divider>
                        <a-button type="primary" size="small" v-if="'已预订'" @click="addcomment(record)"><a-icon type="plus" />评价</a-button>


                    </span>
                </a-table>
            </a-tab-pane>
        </a-tabs>
        <AddCommentModal></AddCommentModal>
    </div>
</template>
<script>
    import {getUserInfoAPI} from "../../api/user";
    const colorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];
    import { mapGetters, mapMutations, mapActions } from 'vuex'
    import AddCommentModal from './components/addComment'
    const columns = [
        {
            title: '订单号',
            dataIndex: 'id',
        },
        {
            title: '酒店名',
            dataIndex: 'hotelName',
        },
        {
            title: '房型',
            dataIndex: 'roomType',
            scopedSlots: { customRender: 'roomType' }
        },
        {
            title: '入住时间',
            dataIndex: 'checkInDate',
            scopedSlots: { customRender: 'checkInDate' }
        },
        {
            title: '离店时间',
            dataIndex: 'checkOutDate',
            scopedSlots: { customRender: 'checkOutDate' }
        },
        {
            title: '入住人数',
            dataIndex: 'peopleNum',
        },
        {
            title: '房价',
            dataIndex: 'price',
        },
        {
            title: '状态',
            filters: [{ text: '已预订', value: '已预订' }, { text: '已撤销', value: '已撤销' }, { text: '已入住', value: '已入住' }],
            onFilter: (value, record) => record.orderState.includes(value),
            dataIndex: 'orderState',
            scopedSlots: { customRender: 'orderState' }
        },
        {
            title: '操作',
            key: 'action',
            scopedSlots: { customRender: 'action' },
        },

    ];
    export default {
        name: 'info',
        data(){
            return {
                avatarValue:"1",
                color: colorList[0],
                modify: false,
                formLayout: 'horizontal',
                pagination: {},
                columns,
                data: [],
                form: this.$form.createForm(this, { name: 'coordinated' }),
            }
        },
        components: {
            AddCommentModal
        },
        computed: {
            ...mapGetters([
                'userId',
                'userInfo',
                'userOrderList',
                'addCommentVisible',
                'activeOrderId',
            ])
        },
        async mounted() {
            await this.getUserInfo()
            await this.getUserOrders()
            this.avatarValue=this.userInfo.userName
        },
        methods: {
            changeValue() {
                const index = colorList.indexOf(this.color);
                this.color = index < colorList.length - 1 ? colorList[index + 1] : colorList[0];
            },
            ...mapMutations([
                'set_addCommentVisible',
                'set_activeOrderId',
            ]),
            ...mapActions([
                'getUserInfo',
                'getUserOrders',
                'updateUserInfo',
                'cancelOrder'
            ]),
            saveModify() {
                this.form.validateFields((err, values) => {
                    if (!err) {
                        const data = {
                            userName: this.form.getFieldValue('userName'),
                            phoneNumber: this.form.getFieldValue('phoneNumber'),
                            password: this.form.getFieldValue('password'),
                            avatarValue:this.form.getFieldValue('userName'),
                        }
                        this.avatarValue=data.userName
                        this.updateUserInfo(data).then(()=>{
                            this.modify = false
                        })
                    }
                });
            },
            modifyInfo() {
                setTimeout(() => {
                    this.form.setFieldsValue({
                        'userName': this.userInfo.userName,
                        'phoneNumber': this.userInfo.phoneNumber,
                    })
                }, 0)
                this.modify = true
            },
            cancelModify() {
                this.modify = false
            },
            confirmCancelOrder(orderId){
                this.cancelOrder(orderId)
            },
            cancelCancelOrder() {

            },
            addcomment(record){
                this.set_activeOrderId(record.orderId);
                this.set_addCommentVisible(true);


            }

        }
    }
</script>
<style scoped lang="less">
    .info-wrapper {
        padding: 50px;
        .chart {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-top: 20px
        }
    }
</style>
<style lang="less">
    .info-wrapper {
        .ant-tabs-bar {
            padding-left: 30px
        }
    }
</style>
<style lang="less">

</style>
