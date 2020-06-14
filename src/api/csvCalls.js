import api from './axiosInstance';

export const getOrchestraCSV = (id) =>{
  return api.get('/orchestra/' + id + '/all_signups', {timeout: 0});
}

export const getAnniversaryCSV = (id) =>{
  return api.get('/orchestra/anniversary/', {timeout: 0});
}

export const getArticlesCSV = (id) =>{
  return api.get('/orchestra/item_summary/', {timeout: 0});
}

export const getAllergiesCSV = (id) =>{
  return api.get('/orchestra/allergies/', {timeout: 0});
}

export const getOverlapCSV = (id) =>{
  return api.get('/orchestra/overlaps/', {timeout: 0});
}

