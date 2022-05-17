/*
所有接口请求模块
* */

import ajax, {getUserImg} from './ajax'
// export const baseUrl = '/api'; //线下地址
const baseUrl = 'http://localhost:8080/blCloud'; //上线后地址

const appId = '23812942';
const appSecret = '5pIrxJMi';

//登录
// export const reqLogin = ({username, password})=> ajax(`${baseUrl}/login?username=${username}&password=${password}`,{username,password},"POST");

//post登录

export const reqLogin = ({username,password})=> ajax(`${baseUrl}/open/login`,{username,password},"POST");


//文件相关操作
// 文件列表
export const reqFileList = (params)=> ajax(`${baseUrl}/file/fileList`,params);

//获取头像
export const reqUserImg = () => getUserImg(`${baseUrl}/user/getUserImg`);

//新建文件夹
export const reqCreateFileDir = ({targetId,fileName})=> ajax(`${baseUrl}/file/createNewDir`, {targetId,fileName},"POST");

//文件树
export const reqFileTree = () => ajax(`${baseUrl}/file/fileDirTree`);

export const reqMoveFile = (params) => ajax(`${baseUrl}/file/changeFilesPath`,params,"POST")

//修改文件名
export const reqRenameFile = (params) => ajax(`${baseUrl}/file/renameFiles`,params,"POST");
//删除文件（文件-->回收站）
export const reqDelFile = (ids) => ajax(`${baseUrl}/file/deleteFiles`, {ids:ids});

//回收站文件列表
export const reqBinFileList = ()=> ajax(`${baseUrl}/file/binList`)
