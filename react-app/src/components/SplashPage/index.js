import React, { Component, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as employeeactions from '../../store/employee'
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

function SplashPage(props){
  const dispatch = useDispatch()
  const employees = useSelector(state => state.employee.employees)


  useEffect(() => {
    dispatch(employeeactions.getAllEmployees())
  },[dispatch])

  return(
    <div>
      <h1>Kyndryl Coding Assignment</h1>
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
              <td>{employee.hours}</td>
              <td>{employee.current_employee ? 'True': 'False'}</td>
              <td>{employee.hourly_wages}</td>
              <td>{multiply(employee.hours, employee.hourly_wages)}</td>
              <td>25%</td>
              <td>{irs(gross)}</td>
            </tr>
            )}
      </table>
    </div>

  )


}

export default SplashPage
