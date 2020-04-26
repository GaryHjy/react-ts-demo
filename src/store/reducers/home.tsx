import { TypeAction } from "../../typings/common";
import * as TYPES from '../action-types';

export interface Slider {
  url: string
}
export interface TypeHome {
  currentCategory: string;
  sliders: Array<Slider>
}

let initialState: TypeHome = {
  currentCategory: 'all',
  sliders: []
}

export default function (state: TypeHome = initialState, action: TypeAction): TypeHome {
  switch(action.type) {
    case TYPES.SET_CURRENT_CATEGORY: 
      return { ...state, currentCategory: action.payload}
    case TYPES.GET_SLIDERS:
      return {...state, sliders: action.payload.data}
    default:
      return state;
  }
}