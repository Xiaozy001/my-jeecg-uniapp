<template id="carstable">
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">车辆信息填写</block>
		</cu-custom>
		<form>
	<view class="cu-form-group" >
		<view class="title">司机姓名:</view>
		<input name="input" v-model="carsData.peoName" placeholder="请输入姓名" />
	</view>
	<view class="cu-form-group" >
		<view class="title">联系电话:</view>
		<input placeholder="请输入联系电话" type="number" maxlength="11" v-model="carsData.telNum"></input>
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
		<view class="title">运输公司:</view>
		<picker  @change="changeTransport" :range="transportCompanyList">
			<view class="uni-input">{{this.carsData.tranCompany}}</view>
		</picker>
	</view>
	<view class="cu-form-group" >
		<view class="title">提货工厂:</view>
			<picker @change="bindPickerChange" :value="carsData.relTenantIds" :range="array" range-key="name">
				<view class="uni-input">{{array[carsData.relTenantIds].name}}</view>
			</picker>
	</view>
	<view class="cu-form-group" >
		<view class="title">车牌号:</view>
		<input name="input" v-model="carsData.carNum" placeholder="请输入车牌号" />
	</view>
	<view class="cu-form-group" >
		<view class="title">客户:</view>
		<input name="input" v-model="carsData.cusName" placeholder="请输入客户" />
	</view>
	<view class="cu-form-group" >
		<view class="title">项目:</view>
		<input name="input" v-model="carsData.project" placeholder="请输入项目" />
	</view>
	<view class="cu-form-group" >
		<view class="title">型号:</view>
		<input name="input" v-model="carsData.type" placeholder="请输入型号" />
	</view>
	<view>
	  <my-date label="提货函时间：" v-model="carsData.pickTime" placeholder="请选择提货函时间" fields="minute"></my-date>
	</view>
	<view class="cu-form-group" >
		<view class="title">到厂时间:</view>
		<input name="input" v-model="carsData.loadTime" disabled="true" placeholder="请输入到厂时间" />
	</view>
	<view class="cu-form-group" >
		<view class="title">地址:</view>
		<input name="input" v-model="carsData.address" disabled="true" placeholder="请输入地址" />
	</view>
	<view class="padding flex flex-direction">
		<button class="cu-btn bg-blue lg"  @click="onSubmit">提交</button>
		<button class="cu-btn"  @click="onReset">重置</button>
	</view>
		</form>
	</view>
</template>

<script>
	import {http} from '@/common/service/service.js'
	import moment from 'moment'
	export default {
		data() {
			return {
				url : '/carsorder/carsOrder/appAdd',
				transportUrl:'/cartransport/carTransport/appTransList',
				array: [{name:'---请选择工厂---'},{name:'动力谷工厂'},{name:'天津工厂'},{name:'光明工厂'},{name:'射阳工厂'},{name:'蒙西工厂'},{name:'吉林工厂'},{name:'宾县工厂'}],
				transportCompanyList:[],
				carsData: {
					peoName: '',
					telNum: '',
					relTenantIds: 0,
					tranCompany: '',
					carNum: '',
					cusName: '',
					project: '',
					type : '',
					pickTime: '',
					loadTime: '',
					address:''
				},
			}
		},
		onLoad(){
			this.addloadTime();
			console.log("调用定位")
			this.getLocation();	
			this.getTransportCompany();
		},
		methods: {
			
			changeTransport(e) {
				this.carsData.tranCompany=this.transportCompanyList[e.detail.value]
			},
			
			getTransportCompany() {
				this.$http.get(this.transportUrl).then(res => {
					if (res.data.success) {
						this.transportCompanyList=this.transportCompanyList.concat(res.data.result),
						console.log("this.transportCompanyList",this.transportCompanyList)
					} else {
						this.$tip.alert(res.data.message);
					}
				})
			},
			
			bindPickerChange(e){
				this.carsData.relTenantIds = e.detail.value;
				console.log(this.carsData)
			},
			
			
			addloadTime() {
				var nowtime=new Date();
				this.carsData.loadTime = moment(nowtime).format('YYYY-MM-DD HH:mm:ss');
			},
			
			onSubmit(){
				console.log(this.carsData.address)
				if(this.carsData.peoName==''){
					this.$tip.alert("司机姓名不能为空");
					return 
				}
				if(this.carsData.telNum==''){
					this.$tip.alert("司机电话不能为空");
					return 
				}
				if(this.carsData.tranCompany=='' || this.carsData.tranCompany=='---请选择运输公司---'){
					 this.$tip.alert("运输公司不能为空");
					 return 
				}
				if(this.carsData.relTenantIds==0){
					this.$tip.alert("提货工厂不能为空");
					return 
				}
				if(this.carsData.carNum==''){
					 this.$tip.alert("车牌号不能为空");
					 return 
				}
				if(this.carsData.cusName==''){
					this.$tip.alert("客户不能为空");
					return 
				}
				if(this.carsData.project==''){
					this.$tip.alert("项目不能为空");
					return 
				}
				if(this.carsData.type==''){
					this.$tip.alert("叶型不能为空");
					return 
				}
				if(this.carsData.pickTime==''){
					 this.$tip.alert("提货函时间不能为空");
					 return 
				}
				if(new Date(this.carsData.pickTime)>new Date()){
					this.$tip.alert("提货函时间不能大于当前时间");
					return 
				};
				uni.showLoading({
					title:"处理中"
				});
				http.post(this.url,JSON.stringify(this.carsData)).then(res=>{
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
				this.carsData.peoName='',
				this.carsData.cusName='',
				this.carsData.telNum='',
				this.carsData.tranCompany='',
				this.carsData.project='',
				this.carsData.type='',
				this.carsData.pickTime=''
				},
				// 获取当前位置
				getLocation() {
					const that = this;
					// 获取位置信息
					uni.getLocation({
						type: 'wgs84',
						success(res) {
							// 经纬度转化地址信息
							const qqmap = require('@/components/qqmap/qqmap-wx-jssdk.min.js')
							const showmap = new qqmap({
								key: '7PGBZ-AT76D-AM64Y-PIJT4-2SPD5-GOF5W'
							})
							// 逆地址解析reverseGeocoder
							showmap.reverseGeocoder({
								location: {
									latitude: res.latitude,
									longitude: res.longitude,
									// latitude: 27.81,
									// longitude: 113.13
								},
								success(result) {
									// 地址信息
									const adres = result.result.address;
									that.carsData.address = adres;
									console.log(adres);
									console.log(that.carsData.address);
									// 此处使用的this不是指向vc
									// 所在在头部先获取到this复制给that
								}
							});
						},
						fail(e) {
							let errMsgTit = '';
							console.log(e);
							if (e.errMsg === 'getLocation:fail auth deny') {
								errMsgTit = '你已拒绝授权，是否跳转至设置页面开启权限';
							} else {
								console.log(e.errMsg)
								errMsgTit = '操作频繁提示，建议搭配onLocationChange()使用';
							}
							uni.showModal({
								title: '提示',
								content: `${errMsgTit}`,
								success(res) {
									if (res.confirm) {
										// 获取设置页面权限信息
										uni.getSetting({
											success(res) {
												console.log(res.authSetting);
												// 判断是否开启获取位置权限
												if (!res.authSetting['scope.userLocation']) {
													// 如果没有开启，点击确认后打开设置页面
													uni.openSetting({});
												}
											}
										});
										console.log('用户点击确定');
									} else if (res.cancel) {
										console.log('用户点击取消');
									}
								}
							});
						}
					});
				},
			}
		}
</script>
<style>
	.cu-form-group .title {
		min-width: calc(4em + 15px);
	}
	.uni-input {
		padding: 0px 0px !important;
	}
	.cu-form-group uni-picker::after {
		display: none;
	}
</style>
