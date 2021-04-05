import api from './axiosInstance'


// TODO: add to redux
export function getFunkisTimeSlot(id) {
  return api.get(`funkis_timeslots/${id}`)
}

export function updateFunkisTimeslot(id, start, end) {
  return api.put(`funkis_timeslots/${id}`, {
    item: {
      start_time: new Date(start),
      end_time: new Date(end)
    }
  })
}