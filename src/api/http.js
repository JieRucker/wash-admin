/**
 * Created by Administrator on 2018/3/19.
 * http 配置
 */

import axios from 'axios';

// axios 配置
axios.defaults.timeout = 10000;
axios.defaults.withCredentials = true;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// axios.defaults.baseURL = 'http://192.168.10.163';
// axios.defaults.baseURL = 'http://washdev.ngrok.qimiaowa.com';
/*axios.defaults.proxy = {
    host: 'http://wx.o2o.rhy.com',
    //port: 9000,
};*/

// 对外接口
export default axios;

