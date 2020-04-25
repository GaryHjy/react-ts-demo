import * as TYPES from '../action-types';
import { validate } from '../../api/profile';

export default {
  validate() {
    // redux-promise中间件会拦截掉这个action，判断如果payload是一个promise，就会等待promise完成
    // 将payload的值变成resolve出来的值，重新派发
    return {
      type: TYPES.VALIDATE,
      payload: validate()
    }
  }
}