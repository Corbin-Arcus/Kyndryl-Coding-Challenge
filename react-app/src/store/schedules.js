import employeeReducer from "./employee"

const CREATE_SCHEDULE = 'schedule/CREATE_SCHEDULE'
const GET_SCHEDULE = 'schedule/GET_SCHEDULE'

const getSchedule = (schedule) => {
  return{
    type:GET_SCHEDULE,
    payload: schedule
  }
}


const createSchedule = (schedule) => {
  return{
    type: CREATE_SCHEDULE,
    payload: schedule
  }
}

export const getAllSchedules = () => async (dispatch) => {
    const res = await fetch ('/api/schedules/all', {
      method:'GET'
    })

    if (res.ok) {
      const data = await res.json()
      dispatch(getSchedule(data))
      return data
    }
    else if (res.status < 500) {
      const data = await res.json()
      if (data.errors) return data.errors
    }
    else {
      return ['An error occurred. Please try again']
    }
}

const scheduleReducer = (state = {}, action) => {
  let newState;
  switch(action.type) {
    case GET_SCHEDULE:
      let schedules = Object.values(action.payload.schedules)
      newState = {...state, schedules}
      return newState
    default:
      return state
  }
}

export default scheduleReducer
