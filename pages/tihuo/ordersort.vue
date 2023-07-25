<template>
	<view>
		<view class="uni-container">
			<cu-custom bgColor="bg-gradual-pink" :isBack="true">
				<block slot="backText">返回</block>
				<block slot="content">订单信息</block>
				<view slot="right"  @tap="rightClick">确定</view>
			</cu-custom>
			<zb-table :key="isData" style="height:620px" :show-header="true" :stripe="true" :border="true" :columns="column"
				:data="orderlist"  @upmove="upmove" @downmove="downmove" emptyText="暂无更多数据">
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
				url: '/carsorder/carsOrder/waitHandleOrder',
				url1: '/pickorder/pickOrder/ordersort',
				isData: 1,
				startindex:1,
				linesum:20,
				orderlist: [],
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
						name: 'carNum',
						align: 'center',
						label: '车牌号',
						width: 200
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
						name: 'station',
						align: 'center',
						label: '车辆停靠位置',
						width: 200
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
						name: 'remarks',
						align: 'center',
						label: '备注',
						width: 200
					},
					{
						name: 'sequence',
						align: 'center',
						label: '订单顺序',
						width: 80
					},
					{
						name: 'operation',
						align: 'center',
						type: 'operation',
						label: '操作',
						renders: [{
							name: '向上移',
							func: 'upmove' // func 代表子元素点击的事件 父元素接收的事件 父元素 @edit
						},
						{
							name: '向下移',
							func: 'downmove' // func 代表子元素点击的事件 父元素接收的事件 父元素 @edit
						}]
					}

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

					}
				})
			},
			upmove(row,index) {
				console.log("向上移动");
				var list=this.orderlist;
				if(index=="0"){
					return ;
				}
				var item=this.orderlist[index-1];
				list[index-1]=this.orderlist[index];
				list[index]=item;
				this.isData=this.isData+1;
				console.log(this.orderlist);
			},
			downmove(row,index) {
				console.log("向下移动");
				var list=this.orderlist;
				if(index==this.orderlist.length-1){
					return ;
				}
				var item=this.orderlist[index+1];
				list[index+1]=this.orderlist[index];
				list[index]=item;
				this.isData=this.isData+1;
				console.log(this.orderlist);
			},
			rightClick(){
				http.post(this.url1,this.orderlist).then(res=>{
					if(res.data.success){
						setTimeout(() => {
						  uni.showToast({
						    title: res.data.message,
						    icon: "success",
						    mask: true,
						    duration: 3000
						  });
						}, 300);
						 this.$Router.replaceAll({name:'index'})
					}else{
				          this.$tip.alert(res.data.message);
				        }
				}).catch((err) =>{
				      let msg = err.data.message || "请求出现错误，请稍后再试"
					  this.$tip.alert(msg);
				    })
			}
		},
	}
</script>

<style>
	.uni-group {
		display: flex;
		align-items: center;
	}

	.uni-button {
		margin-left: 10px;
	}
</style>
