import Config from './Config'

const { api: { baseAddress, login, country, province } } = Config;
export const setUrl = (uri) => `${baseAddress}${uri}`;

export const url = {
  login: setUrl(login),
  country: setUrl(country),
  province: setUrl(province)
};

export const options = {
  headers: {
    'api-client-access-token': 'lawgoindonesia',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
};
