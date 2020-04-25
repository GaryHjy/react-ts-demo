import * as TYPES from '../action-types';
import { TypeAction } from '@/typings/common';

export default {
  setCurrentCategory(payload: string): TypeAction {
    return {
      type: TYPES.SET_CURRENT_CATEGORY,
      payload
    }
  }
}