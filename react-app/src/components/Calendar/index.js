import React, { Component, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as employeeactions from '../../store/employee'
import * as scheduleActions from '../../store/schedules'
import { NavLink, useParams, Link } from 'react-router-dom'


function Calendar(){
  const dispatch = useDispatch()
  const employees = useSelector(state => state.employee.employees)
  const schedules = useSelector(state => state.schedule.schedules)

  const currentEmployees = employees?.filter(employee => employee?.current_employee == true)


  useEffect(() => {
    dispatch(employeeactions.getAllEmployees())
    dispatch(scheduleActions.getAllSchedules())
  },[dispatch])

  return(
    <div>
      <h1>Schedule</h1>
      <table>
        <tr>
          <th></th>
          <th>Monday</th>
          <th>Tuesday</th>
          <th>Wednesday</th>
          <th>Thursday</th>
          <th>Friday</th>
          <th>Saturday</th>
          <th>Sunday</th>
          <th>Total Hours</th>
        </tr>
        {currentEmployees?.map(employee =>
          <tr>
            <th>{employee.name}</th>
            {schedules?.filter(schedule => schedule.employee_id == employee.id)?.map(schedule =>
            <>
                <td>{schedule.Monday}</td>
                <td>{schedule.Tuesday}</td>
                <td>{schedule.Wednesday}</td>
                <td>{schedule.Thursday}</td>
                <td>{schedule.Friday}</td>
                <td>{schedule.Saturday}</td>
                <td>{schedule.Sunday}</td>
                <td>{schedule.total_hours}</td>
               <Link to={`/schedules/${schedule.id}/edit`}><button>Update Schedule</button></Link>
            </>
          )}
          </tr>
          )}
      </table>
    </div>
  )
}

export default Calendar
