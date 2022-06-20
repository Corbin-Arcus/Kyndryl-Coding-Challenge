
const CREATE_SCHEDULE = 'schedule/CREATE_SCHEDULE'
const GET_SCHEDULE = 'schedule/GET_SCHEDULE'
const UPDATE_SCHEDULE = 'schedule/UPDATE_SCHEDULE'

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

const updateSchedule = (schedule) => {
  return{
    type: UPDATE_SCHEDULE,
    payload: schedule
  }
}

export const updateScheduleHours = (id, hours) => async (dispatch) => {
  const res = await fetch(`/api/schedules/${id}/${hours}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      hours
    })
  })
  if (res.ok) {
    const data = await res.json()
    dispatch(updateSchedule(data))
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

export const updateOneSchedule = (scheduleId, monday, tuesday, wednesday, thursday, friday, saturday, sunday) =>
async (dispatch) => {
  const res = await fetch(`/api/schedules/${scheduleId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      monday, tuesday, wednesday, thursday, friday, saturday, sunday
    })
  })
  if (res.ok) {
    const data = await res.json()
    dispatch(updateSchedule(data))
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

export const createASchedule = (employee_id, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday) => async(dispatch) => {
  const res = await fetch('/api/schedules/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      employee_id,
      Monday,
      Tuesday,
      Wednesday,
      Thursday,
      Friday,
      Saturday,
      Sunday
    })
  })


  if (res.ok) {
    const data = await res.json()
    dispatch(createSchedule(data))
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
    case CREATE_SCHEDULE:
      newState = {...state, ...action.payload}
      return newState
    case UPDATE_SCHEDULE:
      newState = {...state, ...newState}
      return newState
    default:
      return state
  }
}

export default scheduleReducer
