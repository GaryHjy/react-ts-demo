import { TypeAction } from "../../typings/common";

export interface TypeHome {
  currentCategory: string;
}

let initialState = {
  currentCategory: 'all'
}

export default function (state: TypeHome = initialState, action: TypeAction) {
  switch(action.type) {
    default:
      return state;
  }
}