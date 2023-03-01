import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Employees from './components/Employees';
import { useState } from "react"
import { EmployeeData } from "./interfaces/EmployeeData"
import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import GroupedTeamMembers from './components/GroupedTeamMembers';
import Nav from './components/Nav';
import NotFound from './components/NotFound';

function App() {
  const [employees, setEmployees] = useState(
    JSON.parse(localStorage.getItem('employeeList')) || EmployeeData
    )
  const [selectedTeam, setSelectedTeam] = useState(
    JSON.parse(localStorage.getItem('selectedTeam')) || 'TeamB'
    )

  useEffect(() => {
    localStorage.setItem('employeeList', JSON.stringify(employees))
  }, [employees])

  useEffect(() => {
    localStorage.setItem('selectedTeam', JSON.stringify(selectedTeam))
  }, [selectedTeam])

  const handleTeamSelectionChange = (e) => {
    e.preventDefault()
    setSelectedTeam(e.target.value)
  }

  const handleEmployeeCardClick = (e) => {
    e.preventDefault()
    const transformedEmployees = employees.map(employee => 
      employee.id === parseInt(e.currentTarget.id)
        ? (employee.teamName === selectedTeam)
          ? {...employee, teamName: ''}
          : {...employee, teamName: selectedTeam}
        : employee
    )
    setEmployees(transformedEmployees)
  }

  return (
    <Router>
      <Nav />
      <Header 
        selectedTeam={selectedTeam} 
        teamMemberCount={employees.filter(employee => employee.teamName === selectedTeam).length}
      />
      <Routes>
        <Route 
          path='/'
          element={
            <Employees 
              employees={employees} 
              selectedTeam={selectedTeam} 
              handleEmployeeCardClick={handleEmployeeCardClick}
              handleTeamSelectionChange={handleTeamSelectionChange}
            />
          }
        />
        <Route 
          path='/GroupedTeamMembers' 
          element={
            <GroupedTeamMembers 
                employees={employees} 
                selectedTeam={selectedTeam}
                setSelectedTeam={setSelectedTeam}    
            />
          }
        />
        <Route 
          path='*' 
          element={<NotFound />}
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
