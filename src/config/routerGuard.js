// 配置路由守卫
import router from "../router";
import {getStore} from "./global";

router.beforeEach((to, from, next) => {
    const isLogin = JSON.parse(getStore('userInfo'));
    if (isLogin?.token) {
        // 如果用户信息存在则往下执行。
        if (to.path === '/login') {
            sessionStorage.setItem('tabBarActiveKey','home');
            next('/dashboard/home')
        } else {
            next()
        }
    } else {
        // 如果用户token不存在则跳转到login页面
        if (to.path === '/login') {
            next()
        } else {
            next('/login')
        }
    }
})