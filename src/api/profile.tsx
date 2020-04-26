import axios from './index';
import { TypeAnyObject } from '@/typings/common';

export const validate = () => axios.get('/api/validate')

export const register = (values: TypeAnyObject) => axios.post('/api/register', values)