<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">车辆停靠定位</block>
		</cu-custom>
		<form>
			<view class="cu-form-group">
				<view class="title">车牌号:</view>
				<input name="input" v-model="carNum" placeholder="请输入车牌号" />
			</view>
			<view class="cu-form-group">
				<view class="title">地址:</view>
				<input name="input" v-model="station" disabled="true" placeholder="请输入地址" />
			</view>
			<view class="padding flex flex-direction">
				<button class="cu-btn bg-blue lg" @click="onSubmit">确认</button>
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
				url: '/carsorder/carsOrder/updateStation',
				station: '',
				carNum: ''
			}
		},
		onLoad() {
			console.log("调用定位")
			this.getLocation()
		},
		methods: {
			onSubmit() {
				this.$http.get(this.url, {
					params: {
						"station": this.station,
						"carNum": this.carNum
					}
				}).then(res => {
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
			// 获取当前位置
			getLocation() {
				const that = this;
				// 获取位置信息
				uni.getLocation({
					type: "wgs84", //默认为 wgs84 返回 gps 坐标
					success(res) {
						// 经纬度转化地址信息
						console.log("uniapp获取经纬度成功")
						const qqmap = require('@/components/qqmap/qqmap-wx-jssdk.min.js')
						const showmap = new qqmap({
							key: '7PGBZ-AT76D-AM64Y-PIJT4-2SPD5-GOF5W'
						})
						// 逆地址解析reverseGeocoder
						showmap.reverseGeocoder({
							location: {
								latitude: res.latitude,
								longitude: res.longitude,
								//latitude: 27.798321,
								//longitude: 113.024812,
							},
							success(result) {
								// 地址信息
								console.log(result)
								const adres = result.result.address;
								that.station = adres;
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
</style>
