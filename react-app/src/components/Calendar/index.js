import React, { Component, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as employeeactions from '../../store/employee'
import * as scheduleActions from '../../store/schedules'

function getHours(schedule){
  let hours = 0;
  let ans;
  let times = Object.values(schedule)
  let filtered = times.filter(time => time.length > 1)
  let arr = filtered.filter(time => !time.includes('OFF') && !time.includes('Off'))
  let str = arr.toString()
  // console.log(str)
  let newArr = str.split(',')
  newArr.forEach(time => {
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
  return hours
}

// function update(hours){
//   dispatch(employeeactions.updateOneEmployee(hours))
// }

function Calendar(props){
  const dispatch = useDispatch()
  const employees = useSelector(state => state.employee.employees)
  const schedules = useSelector(state => state.schedule.schedules)

  function update(employee_id, hours){
    dispatch(employeeactions.updateOneEmployeeHours(employee_id, hours))
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
                <td>{getHours(schedule)}</td>
                    {props.setHours(getHours(schedule))}
                    {update(employee.id, props.hours)}

            </>
          )}
          </tr>
          )}
      </table>
    </div>
  )
}

export default Calendar
