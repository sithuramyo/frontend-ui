import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { Button } from "./button";

interface CreateButtonProps {
    href: string; 
  }
  
  export const CreateButton = ({href} : CreateButtonProps) => {
    return (
      <Link to={href}>
        <Button variant="outline"><Plus/>Create</Button>
      </Link>
    );
  };