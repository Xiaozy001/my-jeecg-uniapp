<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">订单处理</block>
		</cu-custom>
		<form>
			<view class="cu-list menu">
				<view class="cu-item animation-slide-bottom">
					<view class="content">
						<text class="text-grey">姓名</text>
					</view>
					<view class="action">
						<text class="text-grey">{{cardetaillistedit.peoName}}</text>
					</view>
				</view>
				<view class="cu-item animation-slide-bottom">
					<view class="content">
						<text class="text-grey">联系电话</text>
					</view>
					<view class="action">
						<text class="text-grey">{{cardetaillistedit.telNum}}</text>
					</view>
				</view>
				<view class="cu-item animation-slide-bottom">
					<view class="content">
						<text class="text-grey">运输公司</text>
					</view>
					<view class="action">
						<text class="text-grey">{{cardetaillistedit.tranCompany}}</text>
					</view>
				</view>
				<view class="cu-item animation-slide-bottom">
					<view class="content">
						<text class="text-grey">车牌号</text>
					</view>
					<view class="action">
						<text class="text-grey">{{cardetaillistedit.carNum}}</text>
					</view>
				</view>
				<view class="cu-item animation-slide-bottom">
					<view class="content">
						<text class="text-grey">客户</text>
					</view>
					<view class="action">
						<text class="text-grey">{{cardetaillistedit.cusName}}</text>
					</view>
				</view>
				<view class="cu-item animation-slide-bottom">
					<view class="content">
						<text class="text-grey">项目</text>
					</view>
					<view class="action">
						<text class="text-grey">{{cardetaillistedit.project}}</text>
					</view>
				</view>
				<view class="cu-item animation-slide-bottom">
					<view class="content">
						<text class="text-grey">型号</text>
					</view>
					<view class="action">
						<text class="text-grey">{{cardetaillistedit.type}}</text>
					</view>
				</view>
				<view class="cu-item animation-slide-bottom">
					<view class="content">
						<text class="text-grey">提货函时间</text>
					</view>
					<view class="action">
						<text class="text-grey">{{cardetaillistedit.pickTime}}</text>
					</view>
				</view>
				<view class="cu-item animation-slide-bottom">
					<view class="content">
						<text class="text-grey">订单号</text>
					</view>
					<view class="action">
						<text class="text-grey">{{cardetaillistedit.orderCode}}</text>
					</view>
				</view>
				<view class="cu-item animation-slide-bottom">
					<view class="content">
						<text class="text-grey">订单状态</text>
					</view>
					<view class="action">
						<text class="text-grey">{{statelist[parseInt(cardetaillistedit.state)]}}</text>
					</view>
				</view>
				<view class="cu-item animation-slide-bottom">
					<view class="content">
						<text class="text-grey">车辆停靠位置</text>
					</view>
					<view class="action">
						<text class="text-grey">{{cardetaillistedit.station}}</text>
					</view>
				</view>
				<view class="cu-form-group">
					<view class="title">叶型:</view>
					<input name="input" v-model="cardetaillistedit.bladeType" placeholder="请输入叶型" />
				</view>
				<view class="cu-form-group">
					<view class="title">组号:</view>
					<input name="input" v-model="cardetaillistedit.bladeNum" placeholder="请输入组号" />
				</view>
				<view class="cu-form-group">
					<view class="title">流水号:</view>
					<input name="input" v-model="cardetaillistedit.serialNum" placeholder="请输入流水号" />
				</view>
				<view class="cu-form-group">
					<view class="title">工装编号:</view>
					<input name="input" v-model="cardetaillistedit.frockNum" placeholder="请输入工装编号" />
				</view>
				<view class="cu-item animation-slide-bottom">
					<view class="content">
						<text class="text-grey">装车完成时间</text>
					</view>
					<view class="action">
						<text class="text-grey">{{cardetaillistedit.truckTime}}</text>
					</view>
				</view>
				<view class="cu-form-group">
					<view class="title">订单顺序:</view>
					<input name="input" v-model="cardetaillistedit.sequence" placeholder="请输入订单顺序" />
				</view>
				<view class="padding flex flex-direction">
					<button class="cu-btn bg-blue lg" @click="onSubmit">确认装车</button>
					<button class="cu-btn bg-red  lg" type="warn" @click="onReset">重置</button>
				</view>
			</view>
		</form>
	</view>
</template>

<script>
	import {
		http
	} from '@/common/service/service.js'
	import {
		states
	} from '@/pages/tihuo/orderstate.js'
	export default {
		data() {
			return {
				url: "/carsorder/carsOrder/appOrderUpdate",
				statelist: states.data,
				cardetaillist: {
					peoName: '',
					cusName: '',
					tranCompany:'',
					project:'',
					type:'',
					telNum: '',
					pickTime: '',
					orderCode: '',
					state: '',
					sequence: '',
					carNum: '',
					bladeType:'',
					bladeNum:'',
					serialNum:'',
					frockNum:'',
					station:''
				},
				cardetaillistedit: {
					peoName: '',
					cusName: '',
					tranCompany:'',
					project:'',
					type:'',
					telNum: '',
					pickTime: '',
					orderCode: '',
					state: '',
					sequence: '',
					carNum: '',
					bladeType:'',
					bladeNum:'',
					serialNum:'',
					frockNum:'',
					truckTime:'',
					station:''
				}
			}
		},
		onLoad(e) {
			console.log("接收数据")
			let obj = e.data
			this.cardetaillist = JSON.parse(obj)
			console.log(this.cardetaillist)
			this.cardetaillistedit = this.cardetaillist
			this.cardetaillistedit.truckTime=new Date().getFullYear()+'-'+(new Date().getMonth()+1)+'-'+new Date().getDay()+' '+new Date().getHours()+':'+new Date().getMinutes()+':'+new Date().getSeconds()
		},
		methods: {
			onSubmit() {
				if (this.cardetaillistedit.bladeType != this.cardetaillistedit.type){
					let msg ="请确认输入的叶型是否一致"
					this.$tip.alert(msg)
					return
				}
				if (this.cardetaillistedit.bladeNum == '') {
					let msg ="请输入组号"
					this.$tip.alert(msg)
					return 
				}
				if (this.cardetaillistedit.serialeNum == '') {
					let msg ="请输入流水号"
					this.$tip.alert(msg)
					return 
				}
				if (this.cardetaillistedit.frockNum == '') {
					let msg ="请输入工装编号"
					this.$tip.alert(msg)
					return 
				}
				uni.showLoading({
					title:"处理中"
				})
					http.post(this.url, JSON.stringify(this.cardetaillistedit)).then(res => {
						if (res.data.success) {
							uni.hideLoading();
							this.$tip.success('提交成功!')
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
			onReset() {
				this.cardetaillistedit = this.cardetaillist
			},
		},
	}
</script>
<style>
	.cu-form-group .title {
		min-width: calc(4em + 15px);
	}
	.cu-btn {
		margin-top: 10px;
	}
</style>
