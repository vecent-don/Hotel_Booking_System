<template>
    <a-modal
            :visible="addCouponVisible"
            title="添加优惠策略"
            cancelText="取消"
            okText="确定"
            @cancel="cancel"
            @ok="handleSubmit"
    >
        <a-form :form="form" style="margin-top: 30px" v-bind="formItemLayout">
            <a-form-item label="优惠劵类型" v-bind="formItemLayout">
                <a-select
                        v-decorator="[
                        'coupontype',
                        {rules:[{required:true,message: '请选择优惠券类型'}]}
                    ]">
                    <a-select-option value=1>测试满减</a-select-option>
                    <a-select-option value=2>测试满减1</a-select-option>
                    <a-select-option value=3>测试满减3</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="券名" v-bind="formItemLayout">
                <a-input placeholder="请填写券名" v-decorator="['name',{rules: [{required: true,message: '请填写券名'}]}]"/>
            </a-form-item>
            <a-form-item label="优惠简介" v-bind="formItemLayout">
                <a-input
                        type="textarea"
                        :row="4"
                        placeholder="请填写优惠简介"
                        v-decorator="['description',{rules:[{required:true, message:'请填写优惠简介'}]}]"/>
            </a-form-item>
            <a-form-item label="达标金额" v-bind="formItemLayout">
                <a-input placeholder="请填写达标金额" v-decorator="['targetnum',{rules: [{required: true,message: '请填写达标金额'}]}]"/>
            </a-form-item>
            <a-form-item label="优惠金额" v-bind="formItemLayout">
                <a-input placeholder="请填写优惠金额" v-decorator="['decreasenum',{rules: [{required: true,message: '请填写优惠金额'}]}]"/>
            </a-form-item>
        </a-form>
        <!-- 这里是添加策略模态框区域，请编写表单 -->
    </a-modal>
</template>
<script>
    import { mapGetters, mapMutations, mapActions } from 'vuex'
    export default {
        name: 'addCouponModal',
        data() {
            return {
                formItemLayout: {
                    labelCol: {
                        xs: { span: 12 },
                        sm: { span: 6 },
                    },
                    wrapperCol: {
                        xs: { span: 24 },
                        sm: { span: 16 },
                    },
                },
            }
        },
        computed: {
            ...mapGetters([
                'activeHotelId',
                'addCouponStrategyParams',
                'addCouponVisible'
            ])
        },
        beforeCreate() {
            // 表单名默认为“form”
            this.form = this.$form.createForm(this, { name: 'addCouponModal' });
        },
        mounted() {

        },
        methods: {
            ...mapMutations([
                'set_addCouponVisible',
                'set_addCouponStrategyParams'
            ]),
            ...mapActions([
                // addHotelCoupon：添加酒店策略接口
                'addHotelCoupon'
            ]),
            cancel() {
                this.set_addCouponVisible(false)
            },
            changeType(v){
                if( v == '3') {

                }else{
                    this.$message.warning('请实现')
                }
            },
            handleSubmit(e) {
                console.log("what's ????")
                e.preventDefault();

                this.form.validateFieldsAndScroll((err, values) => {
                    if (!err) {
                        const data = {
                            // 这里添加接口参数
                            name: this.form.getFieldValue('name'),
                            description: this.form.getFieldValue('description'),
                            type: this.form.getFieldValue('coupontype'),
                            targetMoney: this.form.getFieldValue('targetnum'),
                            discountMoney: this.form.getFieldValue('decreasenum'),
                            discount:this.form.getFieldValue('discount'),
                            hotelId: this.activeHotelId,
                        }
                        // alert("wow1")
                        // this.set_addCouponStrategyParams(data)
                        //alert("wow2")
                        this.addHotelCoupon(data)
                    }
                });
            },
        }
    }
</script>