import axios from './index';

export const validate = () => axios.get('/api/validate')