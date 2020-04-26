import * as TYPES from '../action-types';
import { Dispatch } from 'redux';
import { validate, register, login, logout } from '../../api/profile';
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
    return async function (dispatch: Dispatch) {
      let result: TypeAnyObject  = await register(values);
      if (result.code === 0) {
        dispatch(push('/login'));
      } else {
        message.error(result.error);
      }
    }
  },

  // 登录
  login(values: TypeAnyObject): TypeThunkFunction {
    return async function(dispatch: Dispatch) {
      let result: TypeAnyObject = await login(values);
      if (result.code === 0) {
        dispatch(push('/profile'));
      } else {
        message.error(result.error);
      }

    }
  },

  // 退出
  logout() {
    return {
      type: TYPES.LOGOUT,
      payload: logout()
    }
  }
}