import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as scheduleActions from '../../store/schedules'
import * as employeeActions from '../../store/employee'
import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom';
import {UpdateScheduleContainer} from '../styles/UpdateSchedule.styled'

function UpdateSchedulePage() {
  const history = useHistory()
  const dispatch = useDispatch();



  const schedules = useSelector(state => state.schedule.schedules)
  const employees = useSelector(state => state.employee.employees)

  const { id } = useParams()
  const scheduleId = id
  let schedule
  if(schedules){
   schedule = schedules?.filter(scheule => scheule?.id == scheduleId)[0]
  }

  let schedule_id = schedule.id

  const [monday, setMonday] = useState(schedule?.Monday)
  const [tuesday, setTuesday] = useState(schedule?.Tuesday)
  const [wednesday, setWednesday] = useState(schedule?.Wednesday)
  const [thursday, setThursday] = useState(schedule?.Thursday)
  const [friday, setFriday] = useState(schedule?.Friday)
  const [saturday, setSaturday] = useState(schedule?.Saturday)
  const [sunday, setSunday] = useState(schedule?.Sunday)
  const [errors, setErrors] = useState([])
  const employee = employees?.filter(employee => employee?.id == schedule?.employee_id)[0]

  useEffect(() => {
    dispatch(employeeActions.getAllEmployees())
    dispatch(scheduleActions.getAllSchedules())
  },[dispatch])


    // const employee_id = employees?.filter(employee => employee?.id == schedule?.employee_id)[0]?.id

  const handleSubmit = async (e) => {
      e.preventDefault();
      history.push('/')
       dispatch(scheduleActions.updateOneSchedule(schedule_id, monday, tuesday, wednesday, thursday, friday, saturday, sunday))
      dispatch(scheduleActions.getAllSchedules())
  }


  return (
    <UpdateScheduleContainer>
      <form onSubmit={handleSubmit} class='form'>
        {errors.length > 0 && <ul>
            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
          </ul>}
          <h1>Update {employee?.name}'s Schedule</h1>
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
          <button type='submit'>Update Schedule</button>
      </form>
    </UpdateScheduleContainer>
  )
}

export default UpdateSchedulePage
