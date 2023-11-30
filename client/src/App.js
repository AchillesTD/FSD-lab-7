import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [employees, setEmployees] = useState([]);
  const [insertFormData, setInsertFormData] = useState({
    employeeName: '',
    employeeID: '',
    departmentName: '',
    phoneNumber: '',
    DateofJoining: '',
  });

  const [deleteFormData, setDeleteFormData] = useState({
    employeeID: '',
  });

  const [updateFormData, setUpdateFormData] = useState({
    employeeID: '',
    newEmployeeName: '',
    newDepartmentName: '',
    newPhoneNumber: '',
    newDateofJoining: '',
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:3001/employee');
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleInsertInputChange = (e) => {
    setInsertFormData({ ...insertFormData, [e.target.name]: e.target.value });
  };

  const validateAlphabetic = (value) => {
    return /^[a-zA-Z]+$/.test(value);
  };

  const validateNumeric = (value) => {
    return /^[0-9]+$/.test(value);
  };

  const validateEmployeeID = (value) => {
    return /^[0-9]{10}$/.test(value);
  };

  const validateForm = () => {
    const isValidName = validateAlphabetic(insertFormData.employeeName);
    const isValidID = validateEmployeeID(insertFormData.employeeID);
    const isValidPhoneNumber = validateNumeric(insertFormData.phoneNumber);

    return isValidName && isValidID && isValidPhoneNumber;
  };

  const handleInsertFormSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      alert('Please check the form fields for errors.');
      return;
    }

    try {
      await axios.post('http://localhost:3001/employee', insertFormData);
      fetchEmployees();
      setInsertFormData({
        employeeName: '',
        employeeID: '',
        departmentName: '',
        phoneNumber: '',
        DateofJoining: '',
      });
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };

  const handleDeleteInputChange = (e) => {
    setDeleteFormData({ ...deleteFormData, [e.target.name]: e.target.value });
  };

  const handleDeleteFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.delete(`http://localhost:3001/employee/${deleteFormData.employeeID}`);
      fetchEmployees();
      setDeleteFormData({
        employeeID: '',
      });
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  const handleUpdateInputChange = (e) => {
    setUpdateFormData({ ...updateFormData, [e.target.name]: e.target.value });
  };

  const handleUpdateFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const { employeeID, newEmployeeName, newDepartmentName, newPhoneNumber, newDateofJoining } = updateFormData;
      await axios.put(`http://localhost:3001/employee/${employeeID}`, {
        employeeName: newEmployeeName,
        departmentName: newDepartmentName,
        phoneNumber: newPhoneNumber,
        DateofJoining: newDateofJoining,
      });
      fetchEmployees();
      setUpdateFormData({
        employeeID: '',
        newEmployeeName: '',
        newDepartmentName: '',
        newPhoneNumber: '',
        newDateofJoining: '',
      });
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  return (
    <div>
      <h1>Employee Management System</h1>

      {/* Insert Form */}
      <form onSubmit={handleInsertFormSubmit}>
        <h2>Insert Employee</h2>
        <label>Employee Name:</label>
        <input type="text" name="employeeName" value={insertFormData.employeeName} onChange={handleInsertInputChange} required />
        <br />
        <label>Employee ID:</label>
        <input type="text" name="employeeID" value={insertFormData.employeeID} onChange={handleInsertInputChange} required />
        <br />
        <label>Department Name:</label>
        <input type="text" name="departmentName" value={insertFormData.departmentName} onChange={handleInsertInputChange} required />
        <br />
        <label>Phone Number:</label>
        <input type="text" name="phoneNumber" value={insertFormData.phoneNumber} onChange={handleInsertInputChange} required />
        <br />
        <label>Joining Date:</label>
        <input type="date" name="DateofJoining" value={insertFormData.DateofJoining} onChange={handleInsertInputChange} required />
        <br />
        <button type="submit">Add Employee</button>
      </form>

      {/* Delete Form */}
      <form onSubmit={handleDeleteFormSubmit}>
        <h2>Delete Employee</h2>
        <label>Employee ID:</label>
        <input type="text" name="employeeID" value={deleteFormData.employeeID} onChange={handleDeleteInputChange} required />
        <br />
        <button type="submit">Delete Employee</button>
      </form>

      {/* Update Form */}
      <form onSubmit={handleUpdateFormSubmit}>
        <h2>Update Employee</h2>
        <label>Employee ID:</label>
        <input type="text" name="employeeID" value={updateFormData.employeeID} onChange={handleUpdateInputChange} required />
        <br />
        <label>New Employee Name:</label>
        <input type="text" name="newEmployeeName" value={updateFormData.newEmployeeName} onChange={handleUpdateInputChange} />
        <br />
        <label>New Department Name:</label>
        <input type="text" name="newDepartmentName" value={updateFormData.newDepartmentName} onChange={handleUpdateInputChange} />
        <br />
        <label>New Phone Number:</label>
        <input type="text" name="newPhoneNumber" value={updateFormData.newPhoneNumber} onChange={handleUpdateInputChange} />
        <br />
        <label>New Joining Date:</label>
        <input type="date" name="newDateofJoining" value={updateFormData.newDateofJoining} onChange={handleUpdateInputChange} />
        <br />
        <button type="submit">Update Employee</button>
      </form>

      <h2>Employee List</h2>
      <table>
        <thead>
          <tr>
            <th>Employee Name</th>
            <th>Employee ID</th>
            <th>Department Name</th>
            <th>Phone Number</th>
            <th>Date Of Joining</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.employeeID}>
              <td>{employee.employeeName}</td>
              <td>{employee.employeeID}</td>
              <td>{employee.departmentName}</td>
              <td>{employee.phoneNumber}</td>
              <td>{employee.DateofJoining}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
