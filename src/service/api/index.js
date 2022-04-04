/*
所有接口请求模块
* */

import ajax from './ajax'
export const baseUrl = '/api'; //线下地址
// const baseUrl = 'http://shop.zhangsh.ltd'; //上线后地址

const appId = '23812942';
const appSecret = '5pIrxJMi';

//登录
export const reqLogin = (username,password)=> ajax(`${baseUrl}/login`,{username,password},"POST");

//获取分类（一级/二级）列表
export const reqCategory = (parentId)=> ajax(`${baseUrl}/manage/category/list`,{parentId});

//添加分类
export const reqAddCategory = (parentId,categoryName)=> ajax(`${baseUrl}/manage/category/add`,{parentId,categoryName},"POST");

//修改分类名称
export const reqUpdateCategory = (categoryId,categoryName)=> ajax(`${baseUrl}/manage/category/update`,{categoryId,categoryName},"POST");

// 获取商品分页列表
export const reqProducts = (pageNum,pageSize)=> ajax(`${baseUrl}/manage/product/list`,{pageNum,pageSize});

// 搜索商品分页列表
/*
* searchType 取值：productName（根据名称搜索），productDesc（根据描述搜索）
* */
export const reqSearchProducts = ({pageNum,pageSize,searchName,searchType})=> ajax(`${baseUrl}/manage/product/search`,{
    pageNum,
    pageSize,
    [searchType] : searchName
});

// 根据分类ID获取分类
export const reqCategoryById = (categoryId)=> ajax(`${baseUrl}/manage/category/info`,{categoryId});

// 对商品进行上架/下架处理(商品状态: 1:在售, 2: 下架了)
export const reqUpdateStatus = (productId,status)=> ajax(`${baseUrl}/manage/product/updateStatus`,{productId,status},"POST");

//删除商品图片
export const reqRemoveImg = (name) => ajax(`${baseUrl}/manage/img/delete`,{name},"POST");

//添加/更新商品
export const reqAddOrUpdateProduct = (product) => ajax(`${baseUrl}/manage/product/${product._id ? 'update':'add'}`,product,"POST");

//获取所有角色列表
export const reqRoles = (product) => ajax(`${baseUrl}/manage/role/list`);

//添加角色
export const reqAddRole = (roleName) => ajax(`${baseUrl}/manage/role/add`,{roleName},"POST");

//添加角色权限信息
export const reqUpdateAuth = (role) => ajax(`${baseUrl}/manage/role/update`,role,"POST");

//获取用户列表
export const reqUsers = () => ajax(`${baseUrl}/manage/user/list`);

//删除用户
export const reqDeleteUsers = (userId) => ajax(`${baseUrl}/manage/user/delete`,{userId},"POST");

//添加用户
export const reqAddUser = (user) => ajax(`${baseUrl}/manage/user/add`,user,"POST");

//修改用户
export const reqUpdateUser = (user) => ajax(`${baseUrl}/manage/user/update`,user,"POST");

//请求天气
export const reqWeather = ()=> ajax(`https://tianqiapi.com/free/day?appid=${appId}&appsecret=${appSecret}`);

