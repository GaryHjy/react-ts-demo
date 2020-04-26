import axios from './index';
import { TypeAnyObject } from '@/typings/common';

export const getSliders = () => axios.get('/api/getSliders')