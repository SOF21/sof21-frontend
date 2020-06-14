import api from './axiosInstance';

export const getOrderItemsFromUUID = data => {
  return api.get('/collect/' + data, { timeout : 1000 * 10 });
}

export const collectItems = (ids, userID) => {
  return api.post('/collect', {
    collected_ids: ids,
    id: userID
  }, { timeout:1000 * 10});
}

export const addLiUCardCode = code => {
  return api.post('/users/set_liu_card_number', {
    liu_card_number: code
  }, { timeout:1000 * 10});
}

export const getOrderFromLiUCardCode = code => {
  return api.get('/collect/liu_card/' + code, {timeout : 1000 * 10});
}
