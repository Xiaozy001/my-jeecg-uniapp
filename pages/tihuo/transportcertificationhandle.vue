<template id="transportcertificationhandle">
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">运输公司资质审核</block>
		</cu-custom>
		<form>
	<view class="cu-form-group" >
		<view class="title">公司名称:</view>
		<text class="text-grey">{{transport.transCompanyName}}</text>
	</view>
	<view class="cu-form-group" >
		<view class="title">联系人:</view>
		<text class="text-grey">{{transport.transCompanyPeople}}</text>
	</view>
	<view class="cu-form-group" >
		<view class="title">联系电话:</view>
		<text class="text-grey">{{transport.transCompanyTelnum}}</text>
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
		<view class="title">申请有效时间至:</view>
			<view class="uni-input">
				<text class="text-grey">{{transport.effectiveTime}}</text>
			</view>
	</view>
	<view class="uni-list list-pd">
		<view class="uni-list-cell cell-pd">
			<view class="uni-uploader">
				<view class="uni-uploader-head">
					<view class="uni-uploader-title">图片文件</view>
				</view>
				<view class="uni-uploader-body">
					<view class="uni-uploader__files">
						<block v-for="(image,index) in imagesList" :key="index">
							<view class="uni-uploader__file">
								<image class="uni-uploader__img" :src="image" :data-src="image" @tap="previewImage"></image>
							</view>
						</block>
					</view>
				</view>
			</view>
		</view>
	</view>
	<view class="uni-list list-pd">
		<view class="uni-list-cell cell-pd">
			<view class="uni-uploader">
				<view class="uni-uploader-head">
					<view class="uni-uploader-title">其他文件</view>
				</view>
				<view class="uni-uploader-body">
					<view class="uni-uploader__files">
						<uni-file-picker readonly :value="filesList" :listStyles="listStyles" file-mediatype="all">
						</uni-file-picker>
					</view>
				</view>	
			</view>
		</view>
	</view>
	<view class="padding flex flex-direction">
		<button :disabled ="ishandle" class="cu-btn bg-blue lg"  @click="onSubmit(1)">同意</button>
		<button :disabled ="ishandle" class="cu-btn"  @click="onSubmit(0)">否决</button>
	</view>
	</form>
	</view>
	
</template>

<script>
	import {http} from '@/common/service/service.js'
	import moment from 'moment'
	import { forEach } from '../../common/luch-request/utils'
	import config from '@/common/service/config.service.js'
	export default {
		data() {
			return {
				url: '/cartransport/carTransport/queryById?id=',
				submiturl: '/cartransport/carTransport/appSubmit',
				handleurl: '/cartransport/carTransport/appHandle',
				relTenantIds: 0,
				ishandle: true,
				imagesList: [],
				filesList: [],
				transport: {
					id:'',
					transCompanyName: '',
					transCompanyPeople: '',
					transCompanyTelnum: '',
					effectiveTime:'',
					imageFiles: '',
					otherFiles: '',
					confirm:'',
				},
				listStyles: {
					// 是否显示边框
					border: true,
					// 是否显示分隔线
					dividline: true,
					// 线条样式
					borderStyle: {
						width: 1,
						color: 'blue',
						style: 'dashed',
						radius: 2
					}
				},
			}
		},
		onLoad(e){
			console.log("调用资质审核")
			console.log("接收数据")
			console.log(e.data)
			this.queryTransport(e.data);
		},
		methods: {
			queryHandle() {
				this.$http.get(this.handleurl).then(res => {
					if (res.data.success && this.transport.confirm == null) {
						this.ishandle = false
					} else {
						if(!res.data.success){
						this.$tip.alert(res.data.message);
						}else{
						this.$tip.alert("当前单据已审核");
						}
					}
				})
			},
			
			queryTransport(id) {
				let that = this
				uni.showLoading({
					title:"查询中"
				})
				this.$http.get(that.url + id).then(res => {
					if (res.data.success) {
						uni.hideLoading();
						console.log(res.data);
						this.transport = res.data.result;
						this.queryHandle();
					} else {
						uni.hideLoading();
						this.$tip.alert(res.data.message);
					}
					this.queryFile();
				})
			},
			//文件路径
			queryFile() {
				let fileurl = config.apiUrl + "/sys/common/static/"
				let imagelist = this.transport.imageFiles.split(",")
				let filelist = this.transport.otherFiles.split(",")
				imagelist.forEach((res) => {
					this.imagesList.push(fileurl.concat(res))
				})
				filelist.forEach((res) => {
					let file = {
						name: res,
						extname: res.split('.').pop(),
						fileurl: fileurl.concat(res)
					}
					this.filesList.push(file)
				})
				console.log(this.imagesList)
			},
			
			previewImage: function(e) {
				console.log("this is previewImage")
				var current = e.target.dataset.src
				uni.previewImage({
					current: current,
					urls: this.imagesList
				})
			},
			
			onSubmit(state) {
				let that=this
				uni.showLoading({
					title:"处理中"
				})
				this.$http.get(that.submiturl,{params:{"state":state,"id":that.transport.id}}).then(res => {
					if (res.data.success) {
						uni.hideLoading();
						this.$tip.success('审核成功!')
						this.$Router.replaceAll({
							name: 'transportcertificationlist'
						})
					} else {
						uni.hideLoading();
						this.$tip.alert(res.data.message);
					}
				})
			}
			
			
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
	.cell-pd {
		padding: 22rpx 30rpx;
	}
	
	.list-pd {
		margin-top: 50rpx;
	}
	li{
		list-style: none;
		}
	#transportcertificationhandle .uni-uploader__file {
		width: 100% !important;
	}
</style>
