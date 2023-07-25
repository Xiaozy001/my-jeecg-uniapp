<template>
	<view>
		<view class="uni-container">
			<cu-custom bgColor="bg-gradual-pink" :isBack="true">
				<block slot="backText">返回</block>
				<block slot="content">装车信息</block>
			</cu-custom>
			<uni-table ref="table" border emptyText="暂无更多数据">
				<uni-tr>
					<uni-th width="55" align="center">序号</uni-th>
					<uni-th width="100" align="center">订单号</uni-th>
					<uni-th width="90" align="center">车牌号</uni-th>
					<uni-th width="170" align="center">装车时间</uni-th>
					<uni-th width="85" align="center">装车位置</uni-th>
					<uni-th width="184" align="center">定位</uni-th>
				</uni-tr>
				<uni-tr v-for="(item, index) in loadinfolist" :key="index">
					<uni-td align="center">{{index+1}}</uni-td>
					<uni-td align="center">{{ item.orderCode }}</uni-td>
					<uni-td align="center">{{ item.carNum }}</uni-td>
					<uni-td align="center">{{ item.loadTime }}</uni-td>
					<uni-td align="center">{{item.loadPosition}}</uni-td>
					<uni-td align="center">{{item.realPosition}}</uni-td>
				</uni-tr>
			</uni-table>
		</view>
	</view>
</template>

<script>
	import {
		http
	} from '@/common/service/service.js'
	export default {
		data() {
			return {
				url: '/loadinfo/loadInfo/appQuery',
				loadinfolist: {
					carNum: '',
					orderCode: '',
					loadTime: '',
					loadPosition: '',
					realPosition: ''
				},
			}
		},
		onLoad() {
			this.loadlist()
		},
		methods: {
			loadlist(){
				this.$http.get(this.url).then(res => {
					if (res.data.success) {
						console.log(res.data);
						this.loadinfolist = res.data.result;
					} else {
						this.$tip.alert(res.data.message);
					}
				})
			}
			},
	}
</script>
<style>
	.cu-form-group .title {
		min-width: calc(4em + 15px);
	}
</style>
