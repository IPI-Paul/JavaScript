import { useState } from "react"

const GroupedTeamMembers = ({
    employees, 
    selectedTeam,
    setSelectedTeam    
}) => {
  const [groupedEmployees, setGroupedEmployees] = useState(groupTeamMembers())

  function groupTeamMembers() {
    // let teams = []
    // let teamAMembers = employees.filter(employee => employee.teamName === 'TeamA')
    // let teamA = {team: 'TeamA', members: teamAMembers, collapsed: selectedTeam === 'TeamA' ? false: true}
    // teams.push(teamA)
    return ['A', 'B', 'C', 'D'].map(e => ({
      team: `Team${e}`, 
      members: employees.filter(employee => employee.teamName === `Team${e}`),
      collapsed: selectedTeam === `Team${e}` ? false: true
    }))
  }

  const handleTeamClick = (e) => {
    e.preventDefault();
    const transformedGroupData = groupedEmployees.map(groupedData => 
      groupedData.team === e.currentTarget.id  
        ? {...groupedData, collapsed: !groupedData.collapsed}
        : groupedData
    )
    setGroupedEmployees(transformedGroupData)
    setSelectedTeam(e.currentTarget.id)
  }

  return (    
    <main className="container">
      {
        groupedEmployees.map(item => (
          <div 
            className="card mt-2"
            key={item.team} 
            style={{ cursor: 'pointer' }}
          >
            <h4 
              className="card-header text-secondary bg-white"
              id={item.team}
              onClick={handleTeamClick}
            >
              Team Name: {item.team}
            </h4>
            <div 
              id={"collapse_" + item.team}
              className={item.collapsed === true ? 'collapse' : ''}  
            >
              <hr />
              {
                item.members.map(member => (
                  <div className="mt-2">
                    <h5 className="card-title mt-2">
                      <span className="text-dark">
                        Full Name: {member.fullName}
                      </span>
                    </h5>
                    <p>Designation: {member.designation}</p>
                  </div>
                ))
              }
            </div>
          </div>
        ))
      }
    </main>
  )
}

export default GroupedTeamMembers