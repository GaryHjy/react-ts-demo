import { TypeAction } from "../../typings/common";

interface TypeHome {

}

let initialState = {

}

export default function (state: TypeHome = initialState, action: TypeAction) {
  switch(action.type) {
    default:
      return state;
  }
}