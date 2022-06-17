import React, { Component, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as employeeactions from '../../store/employee'
import { Link } from 'react-router-dom';

function Calendar(){
  const dispatch = useDispatch()
  const employees = useSelector(state => state.employee.employees)

  const obj ={
    '9:00 AM' : 9,
    '10:00 AM' : 10,
  }

  useEffect(() => {
    dispatch(employeeactions.getAllEmployees())
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
          </tr>
          )}
      </table>
    </div>
  )
}

export default Calendar
