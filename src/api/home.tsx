import axios from './index';
import { TypeAnyObject } from '@/typings/common';

export const getSliders = () => axios.get('/api/getSliders')

export const getLessons = (currentCategory: string, offset: number = 0, limit: number = 5) => axios.get(`/api/getLessons?currentCategory=${currentCategory}&offset=${offset}&limit=${limit}`)