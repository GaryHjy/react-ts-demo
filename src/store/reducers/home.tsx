import { TypeAction } from "../../typings/common";
import * as TYPES from '../action-types';

export interface Slider {
  url: string
}

export interface Lesson {
  _id: string, // id
  order: number,//顺序
  title: string,//标题
  video: string,//视频
  poster: string, //海报
  url: string,//url地址
  price: string,//价格
  category: string,//分类
}
export interface Lessons {
  loading: boolean // 是否在加载课程列表
  list: Array<Lesson> // 课程列表
  hasMore: boolean // 是否还有更多
  offset: number // 偏移量，每次获取5条
  limit: number // 每页条数
}
export interface TypeHome {
  currentCategory: string;
  sliders: Array<Slider>;
  lessons: Lessons
}

let initialState: TypeHome = {
  currentCategory: 'all',
  sliders: [],
  lessons: {
    loading: false,
    list: [],
    hasMore: true,
    offset: 0,
    limit: 5
  }
}

export default function (state: TypeHome = initialState, action: TypeAction): TypeHome {
  switch(action.type) {
    case TYPES.SET_CURRENT_CATEGORY: 
      return { ...state, currentCategory: action.payload}
    case TYPES.GET_SLIDERS:
      return {...state, sliders: action.payload.data}
    case TYPES.SET_LESSONS_LOADING:
      return { ...state, lessons: { ...state.lessons, loading:action.payload}}
    case TYPES.SET_LESSONS:
      return { ...state, lessons: { 
        ...state.lessons, 
        loading: false, 
        list: [...state.lessons.list, ...action.payload.list],
        hasMore: action.payload.hasMore,
        offset: state.lessons.offset + action.payload.list.length
      }}
    case TYPES.REFRESH_LESSONS:
      return {
        ...state, lessons: {
          ...state.lessons,
          loading: false,
          list: action.payload.list,
          hasMore: action.payload.hasMore,
          offset: action.payload.list.length
        }
      }
    default:
      return state;
  }
}