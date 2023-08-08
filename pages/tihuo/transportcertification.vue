<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">运输公司资质申请</block>
		</cu-custom>
		<form>
	<view class="cu-form-group" >
		<view class="title">公司名称:</view>
		<input name="input" v-model="transport.transCompanyName" placeholder="请输入公司名称" />
	</view>
	<view class="cu-form-group" >
		<view class="title">联系人:</view>
		<input name="input" v-model="transport.transCompanyPeople" placeholder="请输入联系人" />
	</view>
	<view class="cu-form-group" >
		<view class="title">联系电话:</view>
		<input placeholder="请输入联系电话" type="number" maxlength="11" v-model="transport.transCompanyTelnum"></input>
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
			<picker @change="bindPickerChange" :value="relTenantIds" :range="array" range-key="name">
				<view class="uni-input">{{array[relTenantIds].name}}</view>
			</picker>
	</view>
	<view class="uni-list list-pd">
		<view class="uni-list-cell cell-pd">
			<view class="uni-uploader">
				<uni-file-picker
				title="图片上传(营业执照,道路运输许可证等)"
				file-mediatype="image"
				limit="9"
				:auto-upload="false"
				@select="selectImages"
				@delete="deleteImage"
				></uni-file-picker>
			</view>
		</view>
	</view>
	<view class="uni-list list-pd">
		<view class="uni-list-cell cell-pd">
			<view class="uni-uploader">
				<uni-file-picker
				title="其他附件上传(护送方案等)"
				file-extname="doc,xls,ppt,pdf,docx,xlsx,pptx"
				limit="9"
				file-mediatype="all"
				:auto-upload="false"
				@select="selectFiles"
				@delete="deleteFile"
				></uni-file-picker>
			</view>
		</view>
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
	import { forEach } from '../../common/luch-request/utils'
	import config from '@/common/service/config.service.js'
	export default {
		data() {
			return {
				url : '/cartransport/carTransport/add',
				array: [{name:'一个月'},{name:'三个月'},{name:'半年'},{name:'一年'}],
				seq: 1,
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
		onLoad(){
			console.log("调用资质申请")
		},
		methods: {
			//选择有效期
			bindPickerChange(e){
				let that = this
				that.relTenantIds = e.detail.value;
				console.log(that.array[that.relTenantIds].name)
			},
			
			//选择图片
			selectImages(e){
				console.log(e)
				let that = this
				e.tempFiles.forEach((tempFile) => {
					let File = {
						'file' : tempFile.file
					}
					that.imagesList.push(File)
				})
				console.log(that.imagesList)
			},
			
			//删除图片
			deleteImage(e){
				console.log(e)
				let that = this
				that.imagesList = that.imagesList.filter((image) => image == e)
				console.log(that.imagesList)
			},
			
			//选择文件
			selectFiles(e){
				console.log(e)
				let that = this
				e.tempFiles.forEach((tempFile) => {
					let File = {
						'file' : tempFile.file
					}
					that.filesList.push(File)
				})
				console.log(that.filesList)
			},
			
			//删除文件
			deleteFile(e){
				console.log(e)
				let that = this
				that.filesList = that.filesList.filter((file) => file == e)
				console.log(that.filesList)
			},

			//文件上传
			upLoadFile(List) {
				let imageurl = '/sys/common/upload'
				console.log("uploadfile",List)	
				var promises = List.map((file) => {
					return new Promise((resolve,reject) => {
						this.$http.upload(this.$config.apiUrl + imageurl,file,{
										filePath: file.path,
										name: 'file',
									}).then(res => {
										if(res.statusCode ==200){
											resolve(res)
										}else{
											reject(res)
										}
									}).catch((err) =>{
									  let msg = err.data.message || "请求出现错误，请稍后再试"
									  this.$tip.alert(msg);
						})
					})
				})
				return promises
			},
			
			//文件上传校验
			fileUpload(result,Type) {
				let that = this
				result.forEach( (Res) => {
					if(!Res.statusCode == 200){
						if(Type == 'image'){
							that.$tip.alert("图片" + file.name + "上传错误");
							that.transport.imageFiles="";
						}else{
							that.$tip.alert("文件" + file.name + "上传错误");
							that.transport.otherFiles=""
						}
					}else{
						if(Type == 'image')
						{
							that.transport.imageFiles = that.transport.imageFiles + Res.data.message;
						}else{
							that.transport.otherFiles = that.transport.otherFiles + Res.data.message;
						}
					}
				})
			},
			
			 async onSubmit() {
				if(this.transport.traName==''){
					this.$tip.alert("运输公司名称不能为空");
					return 
				}
				if(this.transport.transCompanyPeople==''){
					this.$tip.alert("联系人不能为空");
					return 
				}
				if(this.transport.transCompanyTelnum==''){
					 this.$tip.alert("联系电话不能为空");
					 return 
				}
				switch (this.relTenantIds) {
					case 0:
						this.transport.effectiveTime = moment(new Date()).add(1,'months').format('YYYY-MM-DD HH:mm:ss')
						break;
					case 1:
						this.transport.effectiveTime = moment(new Date()).add(3,'months').format('YYYY-MM-DD HH:mm:ss')
						break;
					case 2:
						this.transport.effectiveTime = moment(new Date()).add(6,'months').format('YYYY-MM-DD HH:mm:ss')
						break;
					case 3:
						this.transport.effectiveTime = moment(new Date()).add(12,'months').format('YYYY-MM-DD HH:mm:ss')
						break;
					default:
						break;
				}
				if(this.imagesList.length == 0 ){
					this.$tip.alert("请选择对应的图片资源");
					return
				}
				if(this.filesList.length == 0 ){
					this.$tip.alert("请选择对应的护送方案等");
					return
				}
				var imageResult = await Promise.all(this.upLoadFile(this.imagesList))
				this.fileUpload(imageResult,'image')
				var fileResult = await Promise.all(this.upLoadFile(this.filesList))
				this.fileUpload(fileResult,'file')
				console.log("this.transport",this.transport)
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
				this.transport = {}
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
</style>
