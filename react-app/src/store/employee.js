const CREATE_EMPLOYEE = 'deck/CREATE_EMPLOYEE'
const UPDATE_EMPLOYEE = 'deck/UPDATE_EMPLOYEE'

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


export const createAnEmployee = (name, email) => async(dispatch) => {
  const res = await fetch('/api/employees/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name,
      email
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
    method: 'PUT',
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

const employeeReducer = (state = {}, action) => {
  let newState;
  switch(action.type) {
    case CREATE_EMPLOYEE:
      newState = {...state, ...action.payload}
      return newState
      case UPDATE_EMPLOYEE:
        newState = {...state, ...newState}
        return newState
    default:
      return state
  }
}

export default employeeReducer
