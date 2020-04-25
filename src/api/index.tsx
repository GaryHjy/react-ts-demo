import axios from 'axios';
import qs from 'querystring';

axios.defaults.baseURL = "http://localhost:9000";
axios.defaults.withCredentials = true; // 跨域的时候是否携带cookie
axios.defaults.transformRequest = (data={}) => qs.stringify(data);
// response headers body data 很多属性 data属性放的是对象格式的响应体
axios.interceptors.response.use(result => result.data);

export default axios;