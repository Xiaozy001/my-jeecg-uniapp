<template>
	<view>
		<view class="uni-container">
			<cu-custom bgColor="bg-gradual-pink" :isBack="true">
				<block slot="backText">返回</block>
				<block slot="content">订单信息</block>
			</cu-custom>
			<zb-table style="height:620px" :show-header="true" :stripe="true" :border="true"  :columns="column"
				:data="orderlist" @confirm="confirm" @unconfirm="unconfirm" emptyText="暂无更多数据">
			</zb-table>
		</view>
	</view>
</template>

<script>
	import {
		http
	} from '@/common/service/service.js'
	import api from '@/api/api.js'
	import {
		states
	} from '@/pages/tihuo/orderstate.js'
	export default {
		data() {
			return {
				handurl: '/pickorder/pickOrder/appOrderConfirm',
				url: '/pickorder/pickOrder/appOrderConfirmQuery',
				isData: 1,
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
						name: 'project',
						align: 'center',
						label: '项目'
					},
					{
						name: 'cusName',
						align: 'center',
						label: '客户'
					},
					{
						name: 'pickTime',
						align: 'center',
						label: '提货函时间',
						width: 160
					},
					{
						name: 'orderCode',
						align: 'center',
						label: '订单号'
					},
					{
						name: 'operation',
						align: 'center',
						type: 'operation',
						label: '操作',
						renders: [{
							name: '确定',
							func: 'confirm' // func 代表子元素点击的事件 父元素接收的事件 父元素 @edit
						},
						{
							name: '驳回',
							func: 'unconfirm' // func 代表子元素点击的事件 父元素接收的事件 父元素 @edit
						}]
					}
				],
				orderlist:[],
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
						this.isData = 0

					}
				})
			},
			confirm(row) {
				uni.showLoading({
					title:"处理中"
				})
				let url=this.handurl + '?ordercode='+row.orderCode+'&state=1'
				this.$http.get(url).then(res => {
					if (res.data.success) {
							uni.hideLoading();
							this.$tip.success('处理成功!')
							this.$Router.replaceAll({
								name: 'index'
							})
						} else {
							uni.hideLoading();
							this.$tip.alert(res.data.message);
						}
					}).catch((err) => {
						uni.hideLoading();
						let msg = err.data.message || "请求出现错误，请稍后再试"
						this.$tip.alert(msg);
					})
			},
			unconfirm(row){
				uni.showLoading({
					title:"处理中"
				})
				let url=this.handurl + '?ordercode='+row.orderCode+'&state=-1'
				this.$http.get(url).then(res => {
					if (res.data.success) {
							uni.hideLoading();
							this.$tip.success('处理成功!')
							this.$Router.replaceAll({
								name: 'index'
							})
						} else {
							uni.hideLoading();
							this.$tip.alert(res.data.message);
						}
					}).catch((err) => {
						uni.hideLoading();
						let msg = err.data.message || "请求出现错误，请稍后再试"
						this.$tip.alert(msg);
					})
			}
		},
	}
</script>

<style>

</style>
