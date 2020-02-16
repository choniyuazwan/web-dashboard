import Config from './Config'

const { api: { baseAddress } } = Config;
export const setUrl = (uri) => `${baseAddress}${uri}`;

export const options = {
  headers: {
    'api-client-access-token': 'lawgoindonesia',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
};
