import axios from 'axios';

axios.interceptors.request.use(config => {
  return config;
})

axios.interceptors.response.use(res => {
  if (res.data.err === 1) {
    return Promise.reject(res.data.data);
  }
  return res;
}, err => {
  return Promise.reject(err);
});

export default axios;