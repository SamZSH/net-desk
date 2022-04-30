//封装axios
import axios from 'axios';
import Axios from "axios";
import {getStore} from "../../config/global";

Axios.interceptors.request.use(
    config => {
        if(JSON.parse(getStore('userInfo'))?.token){
            config.headers.token = JSON.parse(getStore('userInfo'))?.token;
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    });

export default function ajax(url,data={},type="GET") {

    return new Promise((resolve,reject)=>{
        let promise;
        //执行ajax异步请求
        if (type === "GET"){
            promise = axios.get(url,{
                params : data
            });
        } else if (type === "POST") {
            promise = axios.post(url,data);
        }
        promise.then((response)=>{
            //如果成功，调用resolve
            resolve(response.data);
        }).catch((error)=>{
            //如果失败，不调用reject，而是提示异常信息
            console.log(error);
        });
    });
}