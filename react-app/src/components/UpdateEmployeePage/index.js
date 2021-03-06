import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as employeeActions from '../../store/employee'
import * as scheduleActions from '../../store/schedules'
import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom';
import {UpdateEmployeeContainer} from '../styles/UpdateEmployee.styled'

function UpdateEmployeePage() {
  const history = useHistory()
  const dispatch = useDispatch();

  const buttonHandler = () => {
    setCurrentEmployee(current => !current)
  }


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
      dispatch(employeeActions.updateOneEmployee(employeeId, name, email, hourly_wages, current_employee))
      return dispatch(employeeActions.getAllEmployees())
    }
  }
  useEffect(() => {
    dispatch(employeeActions.getAllEmployees())
    dispatch(scheduleActions.getAllSchedules())
  },[dispatch])

  const employees = useSelector(state => state.employee.employees)
  const { id } = useParams()
  const employeeId = id
  let employee;
  if(employees){
    employee = employees?.filter(employee => employee?.id == id)[0]
  }

  const [name, setName] = useState(employee?.name)
  const [email, setEmail] = useState(employee?.email)
  const [hourly_wages, setHoury_wages] = useState(employee?.hourly_wages)
  const [current_employee, setCurrentEmployee] = useState(employee?.current_employee)
  const [errors, setErrors] = useState([])

  return (
    <UpdateEmployeeContainer>
      <form onSubmit={handleSubmit} className='form'>
        {errors.length > 0 && <ul>
            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
          </ul>}
          <h1>Update {employee?.name}</h1>
          <input
          type='hidden'
          name='employeeId'
          value={employeeId}
          />
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
          <label>
            Is {employee?.name} a current employee?
            <br />
           <select value={current_employee} name='current_employee' onChange={(e) => setCurrentEmployee(e.target.value)}>
            <option></option>
            <option value={true}>Yes</option>
            <option value={false}>No</option>
           </select>
          </label>
          <br />
          <button type='submit'>Update Employee</button>
      </form>
    </UpdateEmployeeContainer>
  )
}

export default UpdateEmployeePage;
