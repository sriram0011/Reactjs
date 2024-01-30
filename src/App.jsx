import axios, { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react'
import './App.css';

function App() {
    const [callstate, setCallstate] = useState("fail");
    const [employeesdata, setEmployeeData] = useState([])
    useEffect(() => {
        const fetchdata = async () => {
            const data = await axios.get('http://localhost:8080/zohoEmployee/getallemployees')
            setEmployeeData(data.data)
        }
        fetchdata();
    }, [callstate]);

    const [employee, setEmployee] = useState({
        "emp_id":" " ,
        "emp_name":"",
        "emp_department":"",
        "emp_grade":"",
        "emp_salary":" " ,
        "emp_date_of_join":""
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee({
            ...employee,
            [name]: value
        })
    }

    const createEmployee = async (e) => {
        e.preventDefault();
        const data = await axios.post('http://localhost:8080/zohoEmployee/addemployee', employee)
        console.log(data)
        setCallstate(data.data)
    }

    const deleteEmployee = async (emp_id) => {
        const data = await axios.delete(`http://localhost:8080/zohoEmployee/deleteemployee/${emp_id}`);

        setCallstate(data)
    }

    const updateEmployee = async (e) => {
        const data = await axios.put(`http://localhost:8080/zohoEmployee/updateemployee/${employee.emp_id}`, employee);
        setCallstate(data);
    }

    return (
        <div>
            <form>
                EmployeeId: <input type="text" name="emp_id" value={employee.emp_id} onChange={handleChange} />
                <br />
                EmployeeName: <input type="text" name="emp_name" value={employee.emp_name} onChange={handleChange} />
                <br />
                Department: <input type="text" name="emp_department" value={employee.emp_department} onChange={handleChange} />
                <br />
                Grade: <input type="text" name="emp_grade" value={employee.emp_grade} onChange={handleChange} />
                <br />
                Salary: <input type="text" name="emp_salary" value={employee.emp_salary} onChange={handleChange} />
                <br />
                Date.of.join: <input type="text" name="emp_date_of_join" value={employee.emp_date_of_join} onChange={handleChange} />
                <br />

                <button onClick={createEmployee}>create user</button>
                <button onClick={updateEmployee}>update user</button>
            </form>
            {employeesdata.map(std => <div className='container'>
                <table border={"1px"}><td>{std.emp_name}</td><td>{std.emp_id}</td><td>{std.emp_date_of_join}</td><td>{std.emp_department}</td><td>{std.emp_grade}</td><td>{std.emp_salary}</td></table>
                <button className='btn' onClick={e => deleteEmployee(std.emp_id)}>delete</button>
            </div>)}

        </div>
    )
}
export default App