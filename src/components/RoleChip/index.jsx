import { Chip } from '@material-tailwind/react';
import { Roles } from '../../data/constants';

const roleColors = {
  [Roles.MANAGER]: "blue",
  [Roles.SUPERVISOR]: "purple",
  [Roles.HR]: "green",
  [Roles.SECRETARY]: "amber",
  [Roles.EMPLOYEE]: "red",
};

const RoleChip = ({ role }) => {
  return (
    <div className="w-max">
      <Chip
        size="sm"
        variant="ghost"
        value={role}
        color={roleColors[role] || "gray"}
      />
    </div>
  );
};

export default RoleChip;