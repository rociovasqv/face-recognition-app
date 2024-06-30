import {
  Card as CardMaterial,
  CardBody,
  Typography,
} from "@material-tailwind/react";

const Card = ({ title, description, icon, onClick }) => {
  const Icon = icon;
  return (
    <CardMaterial className="mt-6 w-96 h-40 cursor-pointer" onClick={onClick}>
      <CardBody className="flex flex-col">
        <div className="flex items-center gap-2">
          <Icon className="h-8 w-8 text-teal-500" strokeWidth={2} />
          <Typography variant="h4" color="blue-gray" className="">
            {title}
          </Typography>
        </div>
        <Typography variant="paragraph" className="mt-4">
          {description}
        </Typography>
      </CardBody>
    </CardMaterial>
  );
};

export default Card;