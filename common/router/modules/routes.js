const routes = [
{
  path: "/pages/login/login",
  name: 'login',
  meta: {
    title: '登录'
  }
}, 
{
  //注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦
  path: '/pages/index/index',
  name: 'index',
  meta: {
    title: '主页'
  }
}, 
{
  //注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦
  path: '/pages/home/home',
  //aliasPath:'/',  //对于h5端你必须在首页加上aliasPath并设置为/
  name: 'home',
  meta: {
    title: '首页'
  }
}, 
{
  path: '/pages/user/people',
  name: 'people',
  meta: {
    title: '个人中心'
  }
}, 
{
  path: '/pages/user/userdetail',
  name: 'userdetail',
  meta: {
    title: '个人详情'
  }
}, 
{
  path: '/pages/user/useredit',
  name: 'useredit',
  meta: {
    title: '个人编辑'
  }
}, 
{
  path: '/pages/user/userexit',
  name: 'userexit',
  meta: {
    title: '退出'
  }
}, 
{
  path: '/pages/user/location',
  name: 'location',
  meta: {
    title: '定位'
  }
}, 
{
  path: '/pages/common/exit',
  name: 'exit',
  meta: {
    title: '退出'
  }
}, 
{
  path: '/pages/common/success',
  name: 'success',
  meta: {
    title: 'success'
  }
}, 
{
  path: '/pages/addressbook/address-book',
  name: 'addressBook',
  meta: {
    title: 'addressBook'
  }
}, 
{
  path: '/pages/addressbook/level-address-book',
  name: 'levelAddressBook',
  meta: {
    title: 'levelAddressBook'
  }
}, 
{
  path: '/pages/addressbook/member',
  name: 'member',
  meta: {
    title: 'member'
  }
}, 
{
  path: '/pages/addressbook/address-detail',
  name: 'addressDetail',
  meta: {
    title: 'addressDetail'
  }
}, 
{
  path: '/pages/annotation/annotationList',
  name: 'annotationList',
  meta: {
    title: '通知公告'
  }
}, 
{
  path: '/pages/annotation/annotationDetail',
  name: 'annotationDetail',
  meta: {
    title: '通知详情'
  }
}, 
{
  path: '/pages/tihuo/carstable',
  name: 'carstable',
  meta: {
    title: '车辆到厂信息填写'
  }
}, 
{
  path: '/pages/tihuo/carlist',
  name: 'carlist',
  meta: {
    title: '车辆信息'
  }
}, 
{
  path: '/pages/tihuo/station',
  name: 'station',
  meta: {
    title: '车辆停靠定位'
  }
}, 
{
  path: '/pages/tihuo/carstablelist',
  name: 'carstablelist',
  meta: {
    title: '订单信息'
  }
}, 
{
  path: '/pages/tihuo/waithandorder',
  name: 'waithandorder',
  meta: {
    title: '待装车订单'
  }
}, 
{
  path: '/pages/tihuo/carlistdetailed',
  name: 'carlistdetailed',
  meta: {
    title: '订单详细信息'
  }
}, 
{
  path: '/pages/tihuo/checkorder',
  name: 'checkorder',
  meta: {
    title: '订单检测'
  }
}, 
{
  path: '/pages/tihuo/checkorderhandle',
  name: 'checkorderhandle',
  meta: {
    title: '订单检测处理'
  }
},
{
  path: '/pages/tihuo/cardetailededit',
  name: 'cardetailededit',
  meta: {
    title: '订单处理'
  }
}, 
{
  path: '/pages/tihuo/orderabnormal',
  name: 'orderabnormal',
  meta: {
    title: '异常填写'
  }
}, 
{
  path: '/pages/tihuo/ordersort',
  name: 'ordersort',
  meta: {
    title: '订单排序'
  }
}, 
{
  path: '/pages/tihuo/orderconfirm',
  name: 'orderconfirm',
  meta: {
    title: '订单确认'
	}
},
{
  path: '/pages/tihuo/transportcertification',
  name: 'transportcertification',
  meta: {
    title: '资质申请'
  }
},
{
  path: '/pages/tihuo/transportcertificationhandle',
  name: 'transportcertificationhandle',
  meta: {
    title: '资质审核明细'
  }
},
{
  path: '/pages/tihuo/transportcertificationlist',
  name: 'transportcertificationlist',
  meta: {
    title: '资质审核'
  }
}
]
export default routes