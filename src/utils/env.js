/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 *
 */

let baseUrl = '';
// let routerMode = 'history';
let imgBaseUrl = 'http://images.cangdu.org/';


if (process.env.NODE_ENV == 'development') {
        // baseUrl="http://localhost:8080";
    baseUrl="http://120.79.162.149:3000";
}else if(process.env.NODE_ENV == 'production'){

    // baseUrl = 'http://cangdu.org:8001';
    baseUrl="http://120.79.162.149:3000";
}

export {
    baseUrl,
    // routerMode,
    imgBaseUrl,
}