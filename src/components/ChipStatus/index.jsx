import { Chip } from "@material-tailwind/react";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";

export function ChipStatus({ status }) {
  return (
    <div className="flex gap-2">
      {status === "present" ? (
        <Chip
          variant="ghost"
          color="green"
          size="sm"
          value="Presente"
          icon={
            <CheckCircleIcon/>
          }
        />
      ) : (
        <Chip
          variant="ghost"
          color="red"
          size="sm"
          value="Ausente"
          icon={
            <XCircleIcon/>
          }
        />
      )}
    </div>
  );
}