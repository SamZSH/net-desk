import Vue from 'vue'
import Router from 'vue-router'

//引入一级组件
import Login from './../views/login/Login.vue';
import DashBoard from './../views/dashboard/DashBoard.vue';

// 引入二级组件
const Home = () => import('./../views/home/Home.vue');
const FileAll = () => import('./../views/fileAll/FileAll');
const FilePicture = () => import('./../views/filePicture/FilePicture.vue');
const FileAudio = () => import('./../views/fileAudio/FileAudio.vue');
const FileVideo = () => import('./../views/fileVideo/FileVideo.vue');
const FileCompressed = () => import('./../views/fileCompressed/FileCompressed.vue');
const PersonalSetting = () => import('./../views/personalSetting/PersonalSetting.vue');
const RecycleBin = () => import('./../views/recycleBin/RecycleBin.vue');
const Reserve = () => import('./../views/reserve/Reserve.vue');

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: DashBoard,
            children: [
                {
                    path: '/dashboard',
                    redirect: '/dashboard/home'
                },
                {
                    path: 'home',
                    name: 'home',
                    component: Home,
                    meta: { keepAlive: true}
                },
                {
                    path: 'all-files',
                    name: 'allFiles',
                    component: FileAll,
                    meta: { keepAlive: true}
                },
                {
                    path: 'pictures',
                    name: 'pictures',
                    component: FilePicture,
                    meta: { keepAlive: true}
                },
                {
                    path: 'audios',
                    name: 'audios',
                    component: FileAudio,
                    meta: { keepAlive: true}
                },
                {
                    path: 'videos',
                    name: 'videos',
                    component: FileVideo,
                    meta: { keepAlive: true}
                },
                {
                    path: 'compressedFiles',
                    name: 'compressedFiles',
                    component: FileCompressed,
                    meta: { keepAlive: true}
                },
                {
                    path: 'personalSetting',
                    name: 'personalSetting',
                    component: PersonalSetting,
                    meta: { keepAlive: true}
                },
                {
                    path: 'recycleBin',
                    name: 'recycleBin',
                    component: RecycleBin,
                    meta: { keepAlive: true}
                },
                {
                    path: 'reserve',
                    name: 'reserve',
                    component: Reserve,
                    meta: { keepAlive: true}
                },
            ]
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
        }
    ],
    mode: 'history'
});
