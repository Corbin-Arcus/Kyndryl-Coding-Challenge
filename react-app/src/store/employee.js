const CREATE_EMPLOYEE = 'employee/CREATE_EMPLOYEE'
const UPDATE_EMPLOYEE = 'employee/UPDATE_EMPLOYEE'
const GET_EMPLOYEE = 'employee/GET_EMPLOYEE'

const createEmployee = (employee) => {
  return{
    type: CREATE_EMPLOYEE,
    payload: employee
  }
}

const updateEmployee = (employee) => {
  return{
    type: UPDATE_EMPLOYEE,
    payload: employee
  }
}

const getEmployee = (employee) => {
  return{
    type: GET_EMPLOYEE,
    payload: employee
  }
}


export const createAnEmployee = (name, email, hourly_wages) => async(dispatch) => {
  const res = await fetch('/api/employees/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name,
      email,
      hourly_wages
    })
  })

  if (res.ok) {
    const data = await res.json()
    dispatch(createEmployee(data))
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


export const updateOneEmployee = (employeeId, name, email, hours, current_employee) => async(dispatch) => {
  const res = await fetch(`/api/employees/${employeeId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name,
      email,
      hours,
      current_employee
    })
  })
  if (res.ok) {
    const data = await res.json()
    dispatch(updateEmployee(data))
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

export const updateOneEmployeeHours = (employeeId, hours) => async(dispatch) => {
  const res = await fetch(`/api/employees/${employeeId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      hours
    })
  })
  if (res.ok) {
    const data = await res.json()
    dispatch(updateEmployee(data))
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


export const getAllEmployees = () => async (dispatch) => {
  const res = await fetch ('/api/employees/all', {
    method: 'GET'
  })
  if (res.ok) {
    const data = await res.json()
    dispatch(getEmployee(data))
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

const employeeReducer = (state = {}, action) => {
  let newState;
  switch(action.type) {
    case CREATE_EMPLOYEE:
      newState = {...state, ...action.payload}
      return newState
    case UPDATE_EMPLOYEE:
      newState = {...state, ...newState}
      return newState
    case GET_EMPLOYEE:
      let employees = Object.values(action.payload.employees)
      newState = {...state, employees}
      return newState
    default:
      return state
  }
}

export default employeeReducer
