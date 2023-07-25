<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">装车信息填写</block>
		</cu-custom>
		<form>
			<view class="cu-form-group">
				<view class="title">车牌号:</view>
				<input name="input" v-model="loadinfo.carNum" placeholder="请输入车牌号" />
			</view>
			<view class="cu-form-group">
				<view class="title">订单号:</view>
				<input name="input" v-model="loadinfo.orderCode" placeholder="请输入订单号" />
			</view>
			<view>
				<my-date label="装车时间：" v-model="loadinfo.loadTime" placeholder="请选择装车时间" fields="minute"></my-date>
			</view>
			<view class="cu-form-group">
				<view class="title">装车地点:</view>
				<input name="input" v-model="loadinfo.loadPosition" placeholder="请输入装车地点" />
			</view>
			<view class="cu-form-group">
				<view class="title">当前地址:</view>
				<input name="input" v-model="loadinfo.realPosition" disabled="true" placeholder="请输入当前地址" />
			</view>
			<view class="padding flex flex-direction">
				<button class="cu-btn bg-blue lg" @click="onSubmit">提交</button>
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
				url: '/loadinfo/loadInfo/appAdd',
				loadinfo: {
					carNum: '',
					orderCode: '',
					loadTime: '',
					loadPosition: '',
					realPosition: ''
				},
			}
		},
		onLoad() {
			this.getLocation()
		},
		methods: {
			onSubmit() {
				http.post(this.url, JSON.stringify(this.loadinfo)).then(res => {
					if (res.data.success) {
						this.$tip.success('提交成功!')
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
			onReset() {
				this.loadinfo.carNum = '',
					this.loadinfo.orderCode = '',
					this.loadinfo.loadTime = '',
					this.loadinfo.loadPosition = '',
					this.loadinfo.realPosition = ''
			},
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
								that.loadinfo.realPosition = adres;
								console.log(adres);
								// 此处使用的this不是指向vc
								// 所在在头部先获取到this复制给that
							}
						});
					},
					fail(e) {
						let errMsgTit = '';
						if (e.errMsg === 'getLocation:fail auth deny') {
							errMsgTit = '你已拒绝授权，是否跳转至设置页面开启权限';
						} else {
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
</style>
