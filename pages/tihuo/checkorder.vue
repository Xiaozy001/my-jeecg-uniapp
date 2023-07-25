<template>
	<view>
		<view class="uni-container">
			<cu-custom bgColor="bg-gradual-pink" :isBack="true">
				<block slot="backText">返回</block>
				<block slot="content">订单信息</block>
			</cu-custom>
			<zb-table style="height:620px" :show-header="true" :stripe="true" :border="true" :columns="column"
				:data="orderlist" @handle="orderdetailed" emptyText="暂无更多数据">
			</zb-table>
		</view>
	</view>
</template>

<script>
	import {
		http
	} from '@/common/service/service.js'
	import api from '@/api/api.js'
	export default {
		data() {
			return {
				url: '/carsorder/carsOrder/appCheckOrderQuery',
				isData: 1,
				startindex:1,
				linesum:20,
				orderlist:[],
				column: [
					{
						type: 'index',
						align: 'center',
						width: 50
					},
					{
						name: 'peoName',
						align: 'center',
						label: '驾驶人'
					},
					{
						name: 'telNum',
						align: 'center',
						label: '电话',
						width: 110
					},
					{
						name: 'tranCompany',
						align: 'center',
						label: '运输公司'
					},
					{
						name: 'project',
						align: 'center',
						label: '项目'
					},
					{
						name: 'orderCode',
						align: 'center',
						label: '订单号'
					},
					{
						name: 'cusName',
						align: 'center',
						label: '客户'
					},
					{
						name: 'type',
						align: 'center',
						label: '叶型'
					},
					{
						name: 'bladeNum',
						align: 'center',
						label: '组号'
					},
					{
						name: 'state',
						align: 'center',
						label: '订单状态',
						filters: {
							'0': '待装车',
							'01': '待装车信息录入',
							'02': '待放行报检',
							'03': '待外观检测',
							'04': '待外观检测输出',
							'05': '待同步检修',
							'06': '待检修报检',
							'07': '待维修闭环确认',
							'08': '待封盖板检查',
							'09': '待放行信息发布',
							'10': '待发货清单办理',
							'11': '待发货清单交接',
							'12': '已完成'
						}
					},
					{
						name: 'station',
						align: 'center',
						label: '车辆停靠位置',
						width: 200
					},
					{
						name: 'operation',
						align: 'center',
						type: 'operation',
						label: '操作',
						renders: [{
							name: '处理',
							func: 'handle' // func 代表子元素点击的事件 父元素接收的事件 父元素 @edit
						}]
					}
				],
			}
		},
		onLoad() {
			this.carlist()
		},
		onReachBottom() {
			if(this.orderlist.length==this.startindex-1){
			console.log('onReachBottom');
			this.carlist()
			}else{
				this.$tip.alert("无更多数据");
			}
		},
		methods: {
			carlist() {
				uni.showLoading({
					title:"处理中"
				})
				let url=this.url + '?startindex=' + this.startindex + '&linesum=' + this.linesum;
				this.$http.get(url).then(res => {
					if (res.data.success) {
						uni.hideLoading();
						this.startindex=this.startindex+this.linesum;
						console.log(res.data);
						this.orderlist = res.data.result;
					} else {
						uni.hideLoading();
						this.$tip.alert(res.data.message);
						this.isData = 0
					}
				})
			},
			orderdetailed(row) {
				if (row.state == '12') {
					this.$tip.success('当前订单已完成所有质检!')
					return
				}
				console.log("checkorder发送数据")
				console.log(row)
				uni.navigateTo({
					url: '/pages/tihuo/checkorderhandle?data=' + JSON.stringify(row),
				})
			},
		},
	}
</script>

<style>
	.uni-group {
		display: flex;
		align-items: center;
	}
</style>
