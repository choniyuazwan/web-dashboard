import Config from './Config'

const { api: { baseAddress, login, country, province, regency } } = Config;
export const setUrl = (uri) => `${baseAddress}${uri}`;

export const url = {
  login: setUrl(login),
  country: setUrl(country),
  province: setUrl(province),
  regency: setUrl(regency)
};

export const options = {
  headers: {
    'api-client-access-token': 'lawgoindonesia',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
};
