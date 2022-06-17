import React, { Component, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as employeeactions from '../../store/employee'
import { Link } from 'react-router-dom';

function SplashPage(){
  const dispatch = useDispatch()
  const employees = useSelector(state => state.employee.employees)


  useEffect(() => {
    dispatch(employeeactions.getAllEmployees())
  },[dispatch])

  console.log(employees)
  return(
    <div>
      <h1>Kyndryl Coding Assignment</h1>
      <table>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Hours</th>
          <th>Current Employee</th>
        </tr>
          {employees?.map(employee =>
            <tr>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.hours}</td>
              <td>{employee.current_employee ? 'True': 'False'}</td>
            </tr>
            )}
      </table>
    </div>

  )


}

export default SplashPage
