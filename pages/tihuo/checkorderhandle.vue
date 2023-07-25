<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">订单检测</block>
		</cu-custom>
		<form>
			<view class="cu-list menu">
				<view class="cu-item animation-slide-bottom">
					<view class="content">
						<text class="text-grey">姓名</text>
					</view>
					<view class="action">
						<text class="text-grey">{{cardetaillist.peoName}}</text>
					</view>
				</view>
				<view class="cu-item animation-slide-bottom">
					<view class="content">
						<text class="text-grey">联系电话</text>
					</view>
					<view class="action">
						<text class="text-grey">{{cardetaillist.telNum}}</text>
					</view>
				</view>
				<view class="cu-item animation-slide-bottom">
					<view class="content">
						<text class="text-grey">运输公司</text>
					</view>
					<view class="action">
						<text class="text-grey">{{cardetaillist.tranCompany}}</text>
					</view>
				</view>
				<view class="cu-item animation-slide-bottom">
					<view class="content">
						<text class="text-grey">车牌号</text>
					</view>
					<view class="action">
						<text class="text-grey">{{cardetaillist.carNum}}</text>
					</view>
				</view>
				<view class="cu-item animation-slide-bottom">
					<view class="content">
						<text class="text-grey">客户</text>
					</view>
					<view class="action">
						<text class="text-grey">{{cardetaillist.cusName}}</text>
					</view>
				</view>
				<view class="cu-item animation-slide-bottom">
					<view class="content">
						<text class="text-grey">项目</text>
					</view>
					<view class="action">
						<text class="text-grey">{{cardetaillist.project}}</text>
					</view>
				</view>
				<view class="cu-item animation-slide-bottom">
					<view class="content">
						<text class="text-grey">型号</text>
					</view>
					<view class="action">
						<text class="text-grey">{{cardetaillist.type}}</text>
					</view>
				</view>
				<view class="cu-item animation-slide-bottom">
					<view class="content">
						<text class="text-grey">提货函时间</text>
					</view>
					<view class="action">
						<text class="text-grey">{{cardetaillist.pickTime}}</text>
					</view>
				</view>
				<view class="cu-item animation-slide-bottom">
					<view class="content">
						<text class="text-grey">订单号</text>
					</view>
					<view class="action">
						<text class="text-grey">{{cardetaillist.orderCode}}</text>
					</view>
				</view>
				<view class="cu-item animation-slide-bottom">
					<view class="content">
						<text class="text-grey">订单状态</text>
					</view>
					<view class="action">
						<text class="text-grey">{{statelist[parseInt(cardetaillist.state)]}}</text>
					</view>
				</view>
				<view class="cu-item animation-slide-bottom">
					<view class="content">
						<text class="text-grey">订单顺序</text>
					</view>
					<view class="action">
						<text class="text-grey">{{cardetaillist.sequence}}</text>
					</view>
				</view>
				<view class="cu-item animation-slide-bottom">
					<view class="content">
						<text class="text-grey">叶型</text>
					</view>
					<view class="action">
						<text class="text-grey">{{cardetaillist.bladeType}}</text>
					</view>
				</view>
				<view class="cu-item animation-slide-bottom">
					<view class="content">
						<text class="text-grey">组号</text>
					</view>
					<view class="action">
						<text class="text-grey">{{cardetaillist.bladeNum}}</text>
					</view>
				</view>
				<view class="cu-item animation-slide-bottom">
					<view class="content">
						<text class="text-grey">流水号</text>
					</view>
					<view class="action">
						<text class="text-grey">{{cardetaillist.serialNum}}</text>
					</view>
				</view>
				<view class="cu-item animation-slide-bottom">
					<view class="content">
						<text class="text-grey">工装编号</text>
					</view>
					<view class="action">
						<text class="text-grey">{{cardetaillist.frockNum}}</text>
					</view>
				</view>
				<view class="cu-item animation-slide-bottom">
					<view class="content">
						<text class="text-grey">检测名称</text>
					</view>
					<view class="action">
						<text class="text-grey">{{cardetaillist.checkName}}</text>
					</view>
				</view>
				<view class="cu-item animation-slide-bottom">
					<view class="content">
						<text class="text-grey">检测项</text>
					</view>
					<view class="action">
						<text class="text-grey">{{cardetaillist.checkItem}}</text>
					</view>
				</view>
				<view class="uni-textarea">
					<textarea @blur="bindTextAreaBlur" style="min-height:60px ;" placeholder-style="color:#F76260;font-weight:bold" placeholder="请输入不合格原因" auto-height />
				</view>
				<block v-if="submitWay==1">
					<view class="padding flex flex-direction">
						<button class="cu-btn bg-blue lg" type="primary" @click="onSubmit(1)">合格</button>
						<button class="cu-btn bg-red  lg" type="warn" @click="onSubmit(-1)">不合格</button>
					</view>
				</block>
				<block v-else>
					<view class="padding flex flex-direction">
						<button class="cu-btn bg-blue lg" type="primary" @click="onSubmit(1)">已完成</button>
					</view>
				</block>
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
				url: "/checktable/checkTable/handle",
				checkurl: "/checktable/checkTable/appQuery",
				statelist: states.data,
				submitWay: 1,
				cardetaillist: {
					peoName: '',
					cusName: '',
					tranCompany: '',
					project: '',
					type: '',
					telNum: '',
					pickTime: '',
					orderCode: '',
					state: '',
					sequence: '',
					carNum: '',
					bladeType: '',
					bladeNum: '',
					checkName: '',
					checkItem: '',
					remarks:''
				},
				remarks:''
			}
		},
		onLoad(e) {
			let obj = e.data
			this.cardetaillist = JSON.parse(obj)
			console.log("checkorderhandle接收数据")
			console.log(this.cardetaillist)
			this.checkquery(this.cardetaillist)
			this.buttenStyle()
		},
		methods: {
			onSubmit(val) {
				console.log("val"+val)
				if(val=="-1" && this.remarks==''){
					this.$tip.alert('必须输入不合格原因')
					return ;
				}
				this.cardetaillist.remarks=this.remarks
				let dataurl = this.url + '?val=' + val
				http.post(dataurl, JSON.stringify(this.cardetaillist)).then(res => {
					if (res.data.success) {
						this.cardetaillist.remarks=null
						this.$tip.success('检测成功!')
						this.$Router.replaceAll({
							name: 'index'
						})
					} else {
						this.$tip.alert(res.data.message);
					}
				}).catch((err) => {
					let msg = err.data.message || "请求出现错误，请稍后再试"
					this.$tip.alert(msg);
				})
			},
			bindTextAreaBlur: function (e) {
				this.remarks=e.detail.value
			},
			checkquery(list) {
				http.post(this.checkurl, JSON.stringify(list)).then(res => {
					this.cardetaillist = res.data.result;
				}).catch((err) => {
					let msg = err.data.message || "请求出现错误，请稍后再试"
					this.$tip.alert(msg);
				})
			},
			buttenStyle() {
				let exceptionlist = ["2", "5", "6", "8", "10", "11"]
				console.log(exceptionlist.includes(this.cardetaillist.state))
				if (exceptionlist.includes(this.cardetaillist.state)) {
					this.submitWay = 2
				}
			}
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

	.cu-list menu,.uni-textarea {
		width: 100%;
		background: #fff;
	}

	.cu-list menu,.uni-textarea textarea {
		width: 96%;
		padding: 18rpx 4%;
		line-height: 1.8;
		font-size: 30rpx;
		height: 150rpx;
	}
</style>
