import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as scheduleActions from '../../store/schedules'
import * as employeeActions from '../../store/employee'
import { useHistory } from 'react-router';

function CreateSchedulePage() {
  const history = useHistory()
  const dispatch = useDispatch();
  const [employee_id, setEmployee_id] = useState(0)
  const [monday, setMonday] = useState('')
  const [tuesday, setTuesday] = useState('')
  const [wednesday, setWednesday] = useState('')
  const [thursday, setThursday] = useState('')
  const [friday, setFriday] = useState('')
  const [saturday, setSaturday] = useState('')
  const [sunday, setSunday] = useState('')
  const [errors, setErrors] = useState([])

  const employees = useSelector(state => state.employee.employees)

  useEffect(() => {
    dispatch(employeeActions.getAllEmployees())
  },[dispatch])

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!employee_id){
      setErrors(['Please choose an employee for this schedule'])
    }
    else {
      setErrors([])
      history.push('/')
      dispatch(scheduleActions.createASchedule(employee_id, monday, tuesday, wednesday, thursday, friday, saturday, sunday))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors.length > 0) setErrors(data.errors)
      })
      return dispatch(scheduleActions.getAllSchedules())
    }
  }



  return (
    <>
      <form onSubmit={handleSubmit} class='form'>
        {errors.length > 0 && <ul>
            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
          </ul>}
          <h1>Create an employee schedule</h1>
          <select value={employee_id} name='employee_id' onChange={(e) => setEmployee_id(e.target.value)}>
            <option></option>
            {employees?.map(employee =>
              <option value={employee.id}>{employee.name}</option>
              )}
          </select>
          <br />
          <label>
            Monday Hours
            <br />
            <input
            type='string'
            name='Monday'
            value={monday}
            onChange={(e) => setMonday(e.target.value)}
            />
          </label>
          <br />
          <label>
            Tuesday Hours
            <br />
            <input
            type='string'
            name='Tuesday'
            value={tuesday}
            onChange={(e) => setTuesday(e.target.value)}
            />
          </label>
          <br />
          <label>
            Wednesday Hours
            <br />
            <input
            type='string'
            name='Wednesday'
            value={wednesday}
            onChange={(e) => setWednesday(e.target.value)}
            />
          </label>
          <br />
          <label>
            Thursday Hours
            <br />
            <input
            type='string'
            name='Thursday'
            value={thursday}
            onChange={(e) => setThursday(e.target.value)}
            />
          </label>
          <br />
          <label>
            Friday Hours
            <br />
            <input
            type='string'
            name='Friday'
            value={friday}
            onChange={(e) => setFriday(e.target.value)}
            />
          </label>
          <br />
          <label>
            Saturday Hours
            <br />
            <input
            type='string'
            name='Saturday'
            value={saturday}
            onChange={(e) => setSaturday(e.target.value)}
            />
          </label>
          <br />
          <label>
            Sunday Hours
            <br />
            <input
            type='string'
            name='Sunday'
            value={sunday}
            onChange={(e) => setSunday(e.target.value)}
            />
          </label>
          <br />
          <button type='submit'>Create Schedule</button>
      </form>
    </>
  )
}

export default CreateSchedulePage
