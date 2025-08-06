import { entryItems } from "@/constants/sidebar";
import { Link } from "react-router-dom";

const EntryPage = () => {
  return (
    <div className="min-h-[80dvh]  px-8 py-20 bg-[url('/bg-pattern.jpg')] bg-cover bg-center flex justify-center">
      <div className="flex flex-wrap gap-8 max-w-6xl justify-center">
        {entryItems.map((item) => (
          <Link
            key={item.id}
            to={item.path || "#"}
            className="
              w-[220px]
              bg-white/10
              backdrop-blur-3xl
              border border-white/30
              shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]
              rounded-2xl
              p-6
              flex flex-col items-center justify-center
              space-y-4
              text-[#53068c] hover:bg-blue-400/20 
              hover:scale-105
              hover:shadow-xl
              transition-all duration-300
            "
          >
            <item.icon className="w-10 h-10" />
            <span className="text-lg font-medium text-center">{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default EntryPage;
