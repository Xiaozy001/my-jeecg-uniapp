<template>
	<view>
		<view class="uni-container">
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">订单详情</block>
		</cu-custom>
		<zb-table style="height:620px" :show-header="true" :stripe="true" :border="true" :columns="column"
			:data="cardetaillist" emptyText="暂无更多数据">
		</zb-table>
			</view>
	</view>
</template>

<script>
	import {http} from '@/common/service/service.js'
	import api from '@/api/api.js'
	import { states } from '@/pages/tihuo/orderstate.js'
	export default {
		data() {
			return {
				url: '/carsorder/carsOrder/appOrderDetailQuery',
				statelist:states.data,
				orderCode:'',
				cardetaillist: [],
				column: [{
						type: 'index',
						fixed: false,
						align: 'center',
						width: 50
					},
					{
						name: 'checkName',
						align: 'center',
						label: '流程',
						width:110
					},
					{
						name: 'carNum',
						align: 'center',
						label: '车牌号',
						width: 200
					},
					{
						name: 'bladeType',
						align: 'center',
						label: '叶型',
						wigth: 40
					},
					{
						name: 'principal',
						align: 'center',
						label: '负责人'
					},
					{
						name: 'estimatedTime',
						align: 'center',
						label: '标准时间'
					},
					{
						name: 'pritelNum',
						align: 'center',
						label: '电话',
						width: 110
					},
					{
						name: 'pickTime',
						align: 'center',
						label: '提货函时间',
						width: 160
					},
					{
						name: 'estimatestartTime',
						align: 'center',
						label: '预计开始时间',
						width: 160
					},
					{
						name: 'estimatefinishTime',
						align: 'center',
						label: '预计结束时间',
						width: 160
					},
					{
						name: 'actualPick',
						align: 'center',
						label: '实际处理时间',
						width: 160
					}
				]
			}
		},
		onLoad(e) {
			console.log("接收数据")
			console.log(e.data)
			this.orderCode=JSON.parse(e.data)
			this.queryDetail(this.orderCode)
		},
		methods: {
			queryDetail(code){
				this.$http.get(this.url,{params:{"orderCode":code}}).then(res => {
					if (res.data.success) {
						console.log(res.data);
						this.cardetaillist = res.data.result;
					} else {
						this.$tip.alert(res.data.message);
					}
				})
			},
		},
	}
</script>
<style>
	.cu-form-group .title {
		min-width: calc(4em + 15px);
	}
</style>
