import { TypeAction } from "../../typings/common";
import LOGIN_TYPES from '../../typings/login-types';

export interface TypeMine {
}

let initialState: TypeMine = {
}

export default function (state: TypeMine = initialState, action: TypeAction) {
  switch(action.type) {
    default:
      return state;
  }
}