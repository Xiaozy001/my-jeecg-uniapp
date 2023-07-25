<template>
	<view>
		<view class="uni-container">
			<cu-custom bgColor="bg-gradual-pink" :isBack="true">
				<block slot="backText">返回</block>
				<block slot="content">订单信息</block>
			</cu-custom>
			<zb-table style="height:620px" :show-header="true" :stripe="true" :border="true" :columns="column"
				:data="orderlist"  emptyText="暂无更多数据">
			</zb-table>
		</view>
	</view>
</template>

<script>
	import {http} from '@/common/service/service.js'
	import api from '@/api/api.js'
	export default {
		data() {
			return {
				url: '/carsorder/carsOrder/appCarQuery',
				orderlist: [],
				startindex:1,
				linesum:20,
				column: [{
						type: 'index',
						fixed: false,
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
						name: 'carNum',
						align: 'center',
						label: '车牌号'
					},
					{
						name: 'orderId',
						align: 'center',
						label: '订单号'
					},
					{
						name: 'cusName',
						align: 'center',
						label: '客户'
					},
					{
						name: 'project',
						align: 'center',
						label: '项目'
					},
					{
						name: 'type',
						align: 'center',
						label: '叶型'
					},
					{
						name: 'serialNum',
						align: 'center',
						label: '流水号'
					},
					{
						name: 'frockNum',
						align: 'center',
						label: '工装编号'
					},
					{
						name: 'pickTime',
						align: 'center',
						label: '提货函时间',
						width: 160
					},
					{
						name: 'loadTime',
						align: 'center',
						label: '到厂时间',
						width: 160
					},
					{
						name: 'address',
						align: 'center',
						label: '到厂位置',
						width: 200
					},
					{
						name: 'station',
						align: 'center',
						label: '车辆停靠位置',
						width: 200
					},
					
				
				]
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
					title:"查询中"
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
						this.isData=0
						
					}
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
	.uni-button {
		margin-left:10px;
	}

</style>
