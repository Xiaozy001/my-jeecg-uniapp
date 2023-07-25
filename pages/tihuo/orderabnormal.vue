<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">异常调整</block>
		</cu-custom>
		<form>
			<view class="cu-form-group">
				<view class="title">异常类型:</view>
				<uni-data-select v-model="value" :localdata="range">
				</uni-data-select>
			</view>
			<block v-if="value==0">
				<view class="cu-form-group">
					<view class="title">订单号:</view>
					<input placeholder="请输入订单号" name="input" v-model="orderName"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">推迟时间(MIN):</view>
					<input placeholder="请输入推迟时间(MIN)" name="input" v-model="deliayTime"></input>
				</view>
			</block>
			<block v-else>
				<view class="cu-form-group">
					<view class="title">订单号:</view>
					<input placeholder="请输入订单号" name="input" v-model="orderName"></input>
				</view>
				<view class="cu-form-group" >
					<view class="title">客户:</view>
					<input name="input" v-model="cusName" placeholder="请输入客户" />
				</view>
				<view class="cu-form-group" >
					<view class="title">项目:</view>
					<input name="input" v-model="project" placeholder="请输入项目" />
				</view>
				<view class="cu-form-group" >
					<view class="title">型号:</view>
					<input name="input" v-model="type" placeholder="请输入型号" />
				</view>
			</block>
			<view class="padding flex flex-direction">
				<button class="cu-btn bg-blue lg" @click="onSubmit()">提交</button>
				<button class="cu-btn" @click="onReset">重置</button>
			</view>
		</form>
	</view>
</template>

<script>
	import {
		http
	} from '@/common/service/service.js'
	export default {
		data() {
			return {
				url: '/carsorder/carsOrder',
				abnormalType: ['订单推迟', '订单修改'],
				data:{},
				value: '',
				onSure: '',
				cusName: '',
				project: '',
				type: '',
				orderName: '',
				deliayTime: '',
				range: [{
						"value": 0,
						"text": "订单推迟"
					},
					{
						"value": 1,
						"text": "订单修改"
					}
				]
			}
		},
		onLoad() {
		},
		methods: {
			onSubmit(){
				console.log(this.value);
				let that=this;
				uni.showModal({
					content: "确定要进行" + that.range[that.value].text + "吗?",
					confirmText: "确定",
					cancelText: "取消",
					success: function (res) {
							if (res.confirm) {
								that.handle();
							} else if (res.cancel) {
								return ;
							}
						}
				})
			
			},
			handle(){
				switch (this.value){
					case 0:
					this.url=this.url + "/orderdeliay";
					this.data.orderName=this.orderName;
					this.data.deliayTime=this.deliayTime;
					break;
					case 1:
					this.url=this.url + "/orderupdate";
					this.data.cusName=this.cusName;
					this.data.project=this.project;
					this.data.type=this.type;
					this.data.orderName=this.orderName;
					break;
					}
				http.post(this.url,JSON.stringify(this.data)).then(res=>{
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
			},
			onReset(){
				this.cusName='',
				this.project='',
				this.type='',
				this.orderName='',
				this.deliayTime=''
				},
			
		}
	}
</script>
<style>
	.cu-form-group .title {
		min-width: calc(4em + 15px);
	}
	
	.uni-stat__select{
		min-width: 280px;
	}
</style>
