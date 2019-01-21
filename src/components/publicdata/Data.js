/**
 * Created by kurosaki on 2018/11/27.
 */
const BASE_URL = "http://218.2.128.222:9088";

const PORT_NAME = {
    register:"/platform/register",
    login:"/platform/login",
    getUserInfo:"/platform/queryUsrInfoForPersonal",
    updateUserForApp:"/platform/updateUserForApp",
    getAllOrgForApp:"/services/partyOrganize/getAllOrgForApp",
    getContactListForApp:"/services/getContactListForApp",//通讯录列表
    getContactDetailForApp:"/services/getContactDetailForApp",//通讯录详情
    queryCarouselForApp:"/services/article/queryCarouselForApp",//首页轮播图
    queryArticleListForApp:"/services/article/queryArticleListForApp",//首页通知公告
    queryArticleByIdForApp:"/services/article/queryArticleByIdForApp",//通知公告详情
    queryManageListForApp:"/services/serviceManage/queryManageListForApp",//服务列表
    queryManageDetailForApp:"/services/serviceManage/queryManageDetailForApp",//服务详情

}
let timetrans = (date,type)=>{
    var date = new Date(date);//如果date为13位不需要乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
    var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    var m = (date.getMinutes() <10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    var s = (date.getSeconds() <10 ? '0' + date.getSeconds() : date.getSeconds());
    if(!type){
        return Y+M+D+h+m+s;
    }else if(type=="day"){
        return Y+M+D;
    }
}



export {BASE_URL,PORT_NAME,timetrans}