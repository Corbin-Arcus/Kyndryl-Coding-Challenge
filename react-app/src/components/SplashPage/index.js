import React, { Component, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as employeeactions from '../../store/employee'
import * as scheduleActions from '../../store/schedules'
import { Link } from 'react-router-dom';

let net;
let gross;

function multiply(x,y){
   gross =  x * y
   return gross
}

function irs(gross){
  return (gross - (gross * .25))
}

function SplashPage(){
  const dispatch = useDispatch()
  const employees = useSelector(state => state.employee.employees)
  const schedules = useSelector(state => state.schedule.schedules)

  useEffect(() => {
    dispatch(employeeactions.getAllEmployees())
  },[dispatch])


  return(
    <div>
      <h1>Kyndryl Coding Assignment</h1>
      <h3>By: Corbin Arcus</h3>
      <br />
      <h1>Payroll Report</h1>
      <table>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Hours</th>
          <th>Current Employee</th>
          <th>Hourly Wages</th>
          <th>Gross Pay</th>
          <th>Taxes</th>
          <th>Net Pay</th>
        </tr>
          {employees?.map(employee =>
            <tr>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.current_employee == true && schedules?.filter(schedule => schedule.employee_id == employee.id)[0]?.total_hours}</td>
              <td>{employee.current_employee ? 'True': 'False'}</td>
              <td>{employee.hourly_wages}</td>
              <td>{multiply(schedules?.filter(schedule => schedule.employee_id == employee.id)[0]?.total_hours, employee.hourly_wages)}</td>
              <td>25%</td>
              <td>{irs(multiply(schedules?.filter(schedule => schedule.employee_id == employee.id)[0]?.total_hours, employee.hourly_wages))}</td>
              <Link to={`/employees/${employee.id}/edit`}><button>Update Employee</button></Link>
            </tr>
            )}
      </table>
    </div>

  )


}

export default SplashPage
