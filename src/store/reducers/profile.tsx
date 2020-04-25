import { TypeAction } from "../../typings/common";
import LOGIN_TYPES from '../../typings/login-types';

export interface TypeProfile {
  loginState: LOGIN_TYPES;
  user: any; // 存放用户信息
  error: any; // 登录失败的原因
}

let initialState: TypeProfile = {
  loginState: LOGIN_TYPES.UN_VALIDATE,
  user: null,
  error: null
}

export default function (state: TypeProfile = initialState, action: TypeAction): TypeProfile {
  switch(action.type) {
    default:
      return state;
  }
}