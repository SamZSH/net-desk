/*
所有接口请求模块
* */

import ajax from './ajax'
// export const baseUrl = '/api'; //线下地址
const baseUrl = 'http://localhost:8080/blCloud'; //上线后地址

const appId = '23812942';
const appSecret = '5pIrxJMi';

//登录
export const reqLogin = ({username, password})=> ajax(`${baseUrl}/login?username=${username}&password=${password}`,{username,password},"POST");

// 文件列表
export const reqFileList = (params)=> ajax(`${baseUrl}/file/fileList`,params);


