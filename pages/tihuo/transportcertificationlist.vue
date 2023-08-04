<template>
	<view>
		<view class="uni-container">
			<cu-custom bgColor="bg-gradual-pink" :isBack="true">
				<block slot="backText">返回</block>
				<block slot="content">订单信息</block>
			</cu-custom>
			<zb-table style="height:620px" :show-header="true" :stripe="true" :border="true"  :columns="column"
				:data="transportList" @handle="transportdetailed" emptyText="暂无更多数据">
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
				url: '/cartransport/carTransport/applist',
				transportList:[],
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
						name: 'transCompanyName',
						align: 'center',
						label: '运输公司名称',
						width: 110
					},
					{
						name: 'transCompanyPeople',
						align: 'center',
						label: '联系人',
						width: 110
					},
					{
						name: 'transCompanyTelnum',
						align: 'center',
						label: '联系电话',
						width: 160
					},
					{
						name: 'effectiveTime',
						align: 'center',
						label: '有效时间',
						width: 160
					},
					{
						name: 'confirm',
						align: 'center',
						label: '审核状态',
						filters:{null:'未审核',0:'未通过',1:'通过'},
						width: 160
					},
					{
						name: 'operation',
						align: 'center',
						type: 'operation',
						label: '操作',
						renders: [{
							name: '详情',
							func: 'handle' // func 代表子元素点击的事件 父元素接收的事件 父元素 @edit
						}]
					}

				],
			}
		},
		onLoad() {
			console.log("调用资质列表")
			this.transportlist()
		},
		onReachBottom() {
			if(this.transportList.length==this.startindex-1){
			console.log('onReachBottom');
			this.transportlist()
			}else{
				this.$tip.alert("无更多数据");
			}
		},
		methods: {
			transportlist() {
				uni.showLoading({
					title:"查询中"
				})
				let url=this.url + '?startindex=' + this.startindex + '&linesum=' + this.linesum;
				this.$http.get(url).then(res => {
					if (res.data.success) {
						uni.hideLoading();
						this.startindex=this.startindex+this.linesum;
						console.log(res.data);
						this.transportList = res.data.result;
					} else {
						uni.hideLoading();
						this.$tip.alert(res.data.message);
						this.isData = 0

					}
				})
			},
			transportdetailed(row) {
				console.log("发送数据")
				console.log(row)
				uni.navigateTo({
					url: '/pages/tihuo/transportcertificationhandle?data=' + row.id,
				})
			}
		},
	}
</script>

<style>

</style>
