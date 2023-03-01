const Teams = ({selectedTeam, handleTeamSelectionChange}) => (
  <select 
    id="team" 
    className="form-select form-select-lg"
    value={selectedTeam}
    onChange={handleTeamSelectionChange}
  >
    {['A', 'B', 'C', 'D'].map((e, idx) => (
      <option key={idx + 1000} value={`Team${e}`}>{`Team${e}`}</option>
    ))}
  </select>
)

export default Teams