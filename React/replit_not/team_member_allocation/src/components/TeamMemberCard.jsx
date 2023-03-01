import femaleProfile from '../assets/images/femaleProfile.jpg'
import maleProfile from '../assets/images/maleProfile.jpg'

const TeamMemberCard = ({employee, handleEmployeeCardClick, selectedTeam}) => {
  return (
    <>
      <div 
        className={"card m-2" + (employee.teamName === selectedTeam 
          ? " standout"
          : ''
        )
        } 
        key={employee.id} 
        id={employee.id} 
        style={{ cursor: 'pointer' }} 
        onClick={handleEmployeeCardClick}
      >
        <img 
          src={employee.gender === 'female' ? femaleProfile : maleProfile } 
          alt="profile" 
        />
        <div className="card-body">
          <h5 className="card-title">Full Name: {employee.fullName}</h5>
          <p className="card-text"><b>Designation:</b> {employee.designation}</p>
        </div>
      </div>
    </>
  )
}

export default TeamMemberCard