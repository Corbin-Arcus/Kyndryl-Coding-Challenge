import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as employeeActions from '../../store/employee'
import { useHistory } from 'react-router';
import { CreateEmployeeContainer } from '../styles/CreateEmployee.styled'

function CreateEmployeePage() {
  const history = useHistory()
  const dispatch = useDispatch();
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [hourly_wages, setHoury_wages] = useState(0)
  // const [hours, setHours] = useState(0)
  // const [currentEmployee, setCurrentEmployee] = useState(True)
  const [errors, setErrors] = useState([])


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name.length < 4 || name.length > 50) {
      setErrors(['Employee name must be within 4 and 50 characters'])
    }
    else if (!email.includes('@')) {
      setErrors(['Please enter a valid email'])
    }
    else {
      setErrors([])
      history.push('/')
      dispatch(employeeActions.createAnEmployee(name, email, hourly_wages))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors.length > 0) setErrors(data.errors)
      })
      return dispatch(employeeActions.getAllEmployees())
    }
  }

  return (
    <CreateEmployeeContainer>
      <form onSubmit={handleSubmit} className='form'>
        {errors.length > 0 && <ul>
            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
          </ul>}
          <h1>Add a new employee</h1>
          <label>
            Employee Name
            <br />
            <input
            type='text'
            name='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            />
          </label>
          <br />
          <label>
            What is the employee's email?
            <br />
            <input
            type='email'
            name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            />
          </label>
          <br />
          <label>
            What is the employee's hourly rate of pay?
            <br />
            <input
            type='number'
            name='hourly_wages'
            value={hourly_wages}
            onChange={(e) => setHoury_wages(e.target.value)}
            required
            />
          </label>
          <br />
          <button type='submit'>Create Employee</button>
      </form>
    </CreateEmployeeContainer>
  )
}

export default CreateEmployeePage;
