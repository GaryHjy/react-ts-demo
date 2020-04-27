import axios from './index';
import { TypeAnyObject } from '@/typings/common';

export const getLesson = (id:string) => axios.get(`/api/getLesson/${id}`);
