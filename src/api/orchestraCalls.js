import api from './axiosInstance';

export const createOrchestraSignup = info => {
  return api.post('/orchestra_signup', {
    item: {
      /* Removed because digital edition
      pickup_with: info.pickupTicket,
      dormitory: info.dorm,
      active_member: info.oldOrActive,
      arrival_date: info.arriveDay,
      consecutive_10: info.tenInARow,
      other_performances: info.otherPerformances,
      attended_25: info.twoFive,
      orchestra_role: info.orchestraType,
      instrument_size: info.instrSize,
      orchestra_ticket_attributes : { kind : info.festivalPackage },
      orchestra_food_ticket_attributes : {  kind : info.foodTickets},*/
      invoice_address: info.invoice_address,
      pickup_with: 0,
      dormitory: 0,
      active_member: 0,
      arrival_date: 0,
      consecutive_10: 0,
      other_performances: 0,
      attended_25: 0,
      orchestra_role: 0,
      instrument_size: 0,
      orchestra_ticket_attributes : { kind : 0 },
      orchestra_food_ticket_attributes : {  kind : 0},
      orchestra_articles_attributes : [
        //{  kind : 0,  data : info.numTshirt, size : info.sizeTshirt },
        {  kind : 1,  data : info.numMedal },
        {  kind : 2,  data : info.numPatch }
      ],
      /* Removed because digital edition
      special_diets_attributes : [
        {  name : info.allergies }
      ]*/
      special_diets_attributes : [
        {  name : 0 }
      ]
    },
    code: info.code
  });
}

export const createOrchestra = orchestra => {
  return api.post('/orchestra', {
    data : orchestra
  })
}

export const getOrchestraSignup = id => {
  return api.get('/orchestra_signup/' + id);
}
export const deleteOrchestraSignup = id => {
  return api.delete('/orchestra_signup/' + id);
}

export const updateOrchestraSignup = (id, info) => {
  return api.put('/orchestra_signup/' + id, {
    item: {
      /* Removed because digital edition
      dormitory: info.dorm,
      active_member: info.oldOrActive,
      arrival_date: info.arriveDay,
      consecutive_10: info.tenInARow,
      other_performances: info.otherPerformances,
      attended_25: info.twoFive,
      orchestra_role: info.orchestraType,
      instrument_size: info.instrSize,
      orchestra_ticket_attributes : { kind : info.festivalPackage },
      orchestra_food_ticket_attributes : {  kind : info.foodTickets},*/
      orchestra_articles_attributes : [
        // Removed because digital edition { kind : 0,  data : info.numTshirt, size : info.sizeTshirt, id: info.TshirtID },
        { kind : 1,  data : info.numMedal, id: info.MedalID },
        { kind : 2,  data : info.numPatch, id: info.PatchID }
      ],
      /* Removed because digital edition
      special_diets_attributes : [
        { name : info.allergies, id: info.allergyId }
      ]*/
    },
  });
}

export const updateShirtSize = (id, info) => {
  return api.put('/orchestra_signup/update_shirt_size/' + id, {
    item: {
      orchestra_articles_attributes : [
        {  kind : 0, size : info.sizeTshirt, id: info.TshirtID },
      ],
    },
  });
}

export const getOrchestra = id => {
  return api.get('/orchestra/' + id, {timeout: 0});
}


/* export const getAllOrchestras = () => {
  return api.get('/orchestra/all_orchestras');
}

export const getAllOrchestraSignUps = id => {
  return api.get(`/orchestra/${id}/all_signups`);
}

 */
