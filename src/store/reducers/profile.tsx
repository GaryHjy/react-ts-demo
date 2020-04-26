import { TypeAction } from "../../typings/common";
import LOGIN_TYPES from '../../typings/login-types';
import * as TYPES from '../action-types';

export interface TypeProfile {
  loginState: LOGIN_TYPES;
  user: any; // 存放用户信息
  error: any; // 登录失败的原因
}

let initialState: TypeProfile = {
  loginState: LOGIN_TYPES.UN_LOGIN,
  user: null,
  error: null
}

export default function (state: TypeProfile = initialState, action: TypeAction): TypeProfile {
  switch(action.type) {
    case TYPES.VALIDATE:
      let { code, data, error } = action.payload;
      if (code === 0) {
        return {...state, loginState: LOGIN_TYPES.LOGIN_ED, user: data, error: null}
      } else {
        return { ...state, loginState: LOGIN_TYPES.UN_LOGIN, user: null, error }
      }
      break;
    case TYPES.LOGOUT: 
      return { ...state, loginState: LOGIN_TYPES.UN_LOGIN, user: null, error: null }
    default:
      return state;
  }
}