export const dashboardConfig = [
    {
        key: 'home',
        label: '首页',
        disabled: false,
        visible: true,
        iconClass: 'caidan',
        children: []
    },
    {
        key: 'files',
        label: '文件',
        disabled: false,
        visible: true,
        iconClass: 'wenjianjia',
        children: [
            {
                key: 'all-files',
                label: '所有文件',
                disabled: false,
                visible: true,
                iconClass: 'noun__cc'
            },
            {
                key: 'pictures',
                label: '图片',
                disabled: false,
                visible: true,
                iconClass: 'tupian'
            },
            {
                key: 'audios',
                label: '音频',
                disabled: false,
                visible: true,
                iconClass: 'yinpin'
            },
            {
                key: 'videos',
                label: '视频',
                disabled: false,
                visible: true,
                iconClass: 'shipinbofang'
            },
            {
                key: 'compressedFiles',
                label: '压缩文件',
                disabled: false,
                visible: true,
                iconClass: 'line-folderzipyasuowenjianjia'
            }
        ]
    },
    {
        key: 'personalSetting',
        label: '个人设置',
        disabled: false,
        visible: true,
        iconClass: 'shezhi',
        children: []
    },
    {
        key: 'recycleBin',
        label: '回收站',
        disabled: false,
        visible: true,
        iconClass: 'huishouzhan',
        children: []
    },
    {
        key: 'reserve',
        label: '预留',
        disabled: false,
        visible: true,
        iconClass: 'rongqi',
        children: []
    }
]