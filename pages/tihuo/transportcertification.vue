<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">运输公司资质申请</block>
		</cu-custom>
		<form>
	<view class="cu-form-group" >
		<view class="title">公司名称:</view>
		<input name="input" v-model="transport.traName" placeholder="请输入公司名称" />
	</view>
	<view class="cu-form-group" >
		<view class="title">联系人:</view>
		<input name="input" v-model="transport.traPeo" placeholder="请输入联系人" />
	</view>
	<view class="cu-form-group" >
		<view class="title">联系电话:</view>
		<input placeholder="请输入联系电话" type="number" maxlength="11" v-model="transport.telNum"></input>
		<view class="cu-capsule radius">
			<view class='cu-tag bg-blue '>
				+86
			</view>
			<view class="cu-tag line-blue">
				中国大陆
			</view>
		</view>
	</view>
	<view class="cu-form-group" >
		<view class="title">申请有效时间:</view>
			<picker @change="bindPickerChange" :value="transport.relTenantIds" :range="array" range-key="name">
				<view class="uni-input">{{array[transport.relTenantIds].name}}</view>
			</picker>
	</view>
	</form>
	</view>
	<!-- 营业执照，道路运输许可证，护送方案 -->
	
</template>

<script>
	import {http} from '@/common/service/service.js'
	import moment from 'moment'
	export default {
		data() {
			return {
				url : '/carsorder/carsOrder/appAdd',
				array: [{name:'一个月'},{name:'三个月'},{name:'半年'},{name:'一年'}],
				transport: {
					traName: '',
					traPeo: '',
					telNum: '',
					relTenantIds: 0
				},
			}
		},
		onLoad(){
			this.addloadTime();
			console.log("调用资质审核")
		},
		methods: {
			bindPickerChange(e){
				this.transport.relTenantIds = e.detail.value;
				console.log(this.transport)
			},
			addZero(s) {
				return s<10 ? ('0'+s) : s;
			},
			addloadTime() {
				var nowtime=new Date();
				this.transport.loadTime = moment(nowtime).format('YYYY-MM-DD HH:mm:ss');
			},
			onSubmit() {
				if(this.transport.traName==''){
					this.$tip.alert("运输公司名称不能为空");
					return 
				}
				if(this.transport.traPeo==''){
					this.$tip.alert("联系人不能为空");
					return 
				}
				if(this.transport.telNum==''){
					 this.$tip.alert("联系电话不能为空");
					 return 
				}
				uni.showLoading({
					title:"处理中"
				});
				http.post(this.url,JSON.stringify(this.transport)).then(res=>{
					if(res.data.success){
						uni.hideLoading();
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
					uni.hideLoading();
			          let msg = err.data.message || "请求出现错误，请稍后再试"
					  this.$tip.alert(msg);
			        })
			},
			onReset(){
				this.transport.peoName='',
				this.transport.cusName='',
				this.transport.telNum='',
				this.transport.tranCompany='',
				this.transport.project='',
				this.transport.type='',
				this.transport.pickTime=''
				},
			}
		}
</script>
<style>
	.cu-form-group .title {
		min-width: calc(4em + 15px);
	}
</style>
