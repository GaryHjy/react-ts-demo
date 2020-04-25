import { TypeAction } from "../../typings/common";
import * as TYPES from '../action-types';

export interface TypeHome {
  currentCategory: string;
}

let initialState = {
  currentCategory: 'all'
}

export default function (state: TypeHome = initialState, action: TypeAction) {
  switch(action.type) {
    case TYPES.SET_CURRENT_CATEGORY: 
      return { ...state, currentCategory: action.payload}
    default:
      return state;
  }
}