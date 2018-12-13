/**
 * Created by kurosaki on 2018/11/27.
 */
const BASE_URL = "http://118.25.110.85:8098";

const PORT_NAME = {
    register:"/platform/register",
    login:"/platform/login"
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