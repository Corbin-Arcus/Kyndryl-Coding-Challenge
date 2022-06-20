import React, { Component, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as employeeactions from '../../store/employee'
import * as scheduleActions from '../../store/schedules'
import { NavLink, useParams, Link } from 'react-router-dom'


function Calendar(){
  const dispatch = useDispatch()
  const employees = useSelector(state => state.employee.employees)
  const schedules = useSelector(state => state.schedule.schedules)

  function updateHours(id, hours){
     return dispatch(scheduleActions.updateScheduleHours(id, hours))
  }
  function getHours(schedule){
    let hours = 0;
    let ans;
    let id = schedule.employee_id
    let times = Object?.values(schedule)
    let filtered = times?.filter(time => time?.length > 1)
    let arr = filtered?.filter(time => !time?.includes('OFF') && !time.includes('Off'))
    let str = arr?.toString()
    let newArr = str?.split(',')
    let temp = newArr?.forEach(time => {
      let nums = time?.replace(/\D/g,'')
      let first = Number(nums[0])
      let second = Number(nums[1])
      if(second < first)
      {
        second += 12
      }
      if(isNaN(first)){
          return
        }
        else{
         ans = second - first
        }
        hours += ans
    })
    updateHours(id, hours)
  }

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
        {employees?.map(employee =>
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
                    {getHours(schedule)}
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
