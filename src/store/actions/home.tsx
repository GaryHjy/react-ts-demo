import * as TYPES from '../action-types';
import { TypeAction, TypeThunkFunction } from '@/typings/common';
import { getSliders, getLessons } from '../../api/home';
import { Dispatch, Store } from 'redux';
import { message } from 'antd';

export default {
  setCurrentCategory(payload: string): TypeAction {
    return {
      type: TYPES.SET_CURRENT_CATEGORY,
      payload
    }
  },
  getSliders(): TypeAction {
    return {
      type: TYPES.GET_SLIDERS,
      payload: getSliders()
    }
  },
  getLessons(): TypeThunkFunction {
    return async function(dispatch: Dispatch, getState: Store['getState']) {
      const { currentCategory, lessons: { loading, offset, limit, hasMore}} = getState().home;
      if (!loading && hasMore) {
        dispatch({
          type: TYPES.SET_LESSONS_LOADING,
          payload: true
        })
        const result: any = await getLessons(currentCategory, offset, limit);
        if (result.code === 0) {
          dispatch({
            type: TYPES.SET_LESSONS,
            payload: result.data
          })
        } else {
          message.error(result.error);
        }
      }
    }
  }
}