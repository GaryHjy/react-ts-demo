import * as TYPES from '../action-types';
import { Dispatch, Store } from 'redux';
import { validate, register } from '../../api/profile';
import { TypeAnyObject, TypeThunkFunction } from '../../typings/common';
import { push } from 'connected-react-router';
import { message } from 'antd';

export default {
  validate() {
    // redux-promise中间件会拦截掉这个action，判断如果payload是一个promise，就会等待promise完成
    // 将payload的值变成resolve出来的值，重新派发
    return {
      type: TYPES.VALIDATE,
      payload: validate()
    }
  },
  // 注册用户
  register(values: TypeAnyObject): TypeThunkFunction {
    return async function (dispatch: Dispatch, getState: Store['getState']) {
      let result: TypeAnyObject  = await register(values);
      if (result.code === 0) {
        dispatch(push('/login'));
      } else {
        message.error(result.error);
      }
    }
  }
}