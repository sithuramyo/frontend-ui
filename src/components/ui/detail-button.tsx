import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import { Button } from "./button";

interface DetailButtonProps {
  href: string;
}

export const DetailButton = ({ href }: DetailButtonProps) => {
  return (
    <Link to={href}>
      <Button
        variant="outline"
        className="flex items-center gap-2 px-3 py-1.5 text-sm"
      >
        <ExternalLink className="w-1 h-1" />
        <span>Detail</span>
      </Button>
    </Link>
  );
};
