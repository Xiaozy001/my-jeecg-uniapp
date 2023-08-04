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
				<block v-for="(image,index) in imagesList" :key="index">
					<view class="uni-uploader__file">
						<text>图片文件</text>
						<image class="uni-uploader__img" :src="image" :data-src="image" @tap="previewImage"></image>
					</view>
				</block>
			</view>
		</view>
	</view>
	<view class="uni-list list-pd">
		<view class="uni-list-cell cell-pd">
			<view class="uni-uploader">
				<view class="uni-uploader__file">
					<text>其他文件</text>
					<li v-for="(file,index) in filesList" :key="index">
						<view class="uni-uploader__file" width="100%">
							<a @click="downloadFile(file)">{{file.filename}}</a>
						</view>
					</li>
				</view>
			</view>
		</view>
	</view>
	<view class="padding flex flex-direction">
		<button class="cu-btn bg-blue lg"  @click="onSubmit">同意</button>
		<button class="cu-btn"  @click="onReset">否决</button>
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
				url : '/cartransport/carTransport/queryById?id=',
				array: [{name:'一个月'},{name:'三个月'},{name:'半年'},{name:'一年'}],
				relTenantIds: 0,
				imagesList: [],
				filesList: [],
				transport: {
					transCompanyName: '',
					transCompanyPeople: '',
					transCompanyTelnum: '',
					effectiveTime:'',
					imageFiles: '',
					otherFiles: '',
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
						filename: res,
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
			
			downloadFile(file) {
				 let filePath = 'file://storage/emulated/0/downloads/' + file.filename
				uni.downloadFile({
					url: file.fileurl,
					success(res) {
						if(res.statusCode === 200) {
							uni.saveFile({
								tempFilePath:res.tempFilePath,
								filePath: filePath,
								success(saveRes) {
									uni.showToast({
										title:"文件下载成功",
										icon:'success'
									});
									console.log(saveRes.savedFilePath)
								},
								fail(saveErr) {
									uni.showToast({
										title:"文件下载失败",
										icon:'none'
									});
									console.log(saveErr)
								}
							});
						}else {
							uni.showToast({
								title:"文件下载失败",
								icon:'none'
							});
							console.log(res)
						}
					},
					fail(err) {
						uni.showToast({
							title:"文件下载失败",
							icon:'none'
						});
						console.log(err)
					}
				})
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
