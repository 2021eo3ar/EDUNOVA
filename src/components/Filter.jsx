import React, { useState } from 'react';

const Filter = ({ onApplyFilter }) => {
  const [showRoles, setShowRoles] = useState(false);
  const [showTeams, setShowTeams] = useState(false);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [selectedTeams, setSelectedTeams] = useState([]);

  const roles = ['Product Designer', 'Product Manager', 'Frontend Developer', 'Backend Developer'];
  const teams = ['Design', 'Product', 'Marketing', 'Technology'];

  const handleRoleChange = (role) => {
    setSelectedRoles(prev =>
      prev.includes(role) ? prev.filter(r => r !== role) : [...prev, role]
    );
  };

  const handleTeamChange = (team) => {
    setSelectedTeams(prev =>
      prev.includes(team) ? prev.filter(t => t !== team) : [...prev, team]
    );
  };

  const applyFilter = () => {
    onApplyFilter({ roles: selectedRoles, teams: selectedTeams });
  };

  return (
    <div className="absolute top-12 right-0.5 bg-white p-4 rounded-md shadow-lg z-20">
      <h3 className="text-lg font-semibold mb-2 w-64">Filters</h3>
      
      <div>
        <label className="block text-sm font-medium text-gray-700">
          <input
            type="checkbox"
            onChange={() => setShowRoles(!showRoles)}
            checked={showRoles}
            className="mr-2"
          />
          Roles
        </label>
        {showRoles && (
          <div className="ml-4 mt-2 space-y-2">
            {roles.map(role => (
              <label key={role} className="block text-sm text-gray-700">
                <input
                  type="checkbox"
                  value={role}
                  checked={selectedRoles.includes(role)}
                  onChange={() => handleRoleChange(role)}
                  className="mr-2"
                />
                {role}
              </label>
            ))}
          </div>
        )}
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">
          <input
            type="checkbox"
            onChange={() => setShowTeams(!showTeams)}
            checked={showTeams}
            className="mr-2"
          />
          Teams
        </label>
        {showTeams && (
          <div className="ml-4 mt-2 space-y-2">
            {teams.map(team => (
              <label key={team} className="block text-sm text-gray-700">
                <input
                  type="checkbox"
                  value={team}
                  checked={selectedTeams.includes(team)}
                  onChange={() => handleTeamChange(team)}
                  className="mr-2"
                />
                {team}
              </label>
            ))}
          </div>
        )}
      </div>

      <button
        onClick={applyFilter}
        className="mt-4 bg-purple-600 text-white p-4 w-64 rounded-md hover:bg-purple-700 "
      >
        Apply Filter
      </button>
    </div>
  );
};

export default Filter;
