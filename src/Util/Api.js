import Config from './Config'

const { api: { baseAddress, login, country } } = Config;
export const setUrl = (uri) => `${baseAddress}${uri}`;

export const url = {
  login: setUrl(login),
  country: setUrl(country)
};

export const options = {
  headers: {
    'api-client-access-token': 'lawgoindonesia',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
};
