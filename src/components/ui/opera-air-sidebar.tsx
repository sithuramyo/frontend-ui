import { operaLongSidebarItems, operaShortSidebarItems } from "@/constants/sidebar";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const OperaAirSidebar = () => {
  const navigate = useNavigate();

  // Handle the back button behavior
  const handleBack = () => {
    // Check if there's a history to go back to
    if (window.history.length > 1) {
      navigate(-1); // Go back to the previous page
    } else {
      // Optionally handle the case where there's no history (e.g., show a message or disable button)
      console.log("No previous page to go back to.");
    }
  };

  return (
    <div className="fixed left-4 top-24 bottom-20 flex flex-col w-20 items-center z-50">
      <nav className="flex flex-col h-full items-center">

        {/* Back Button with Glass Effect */}
        <button
          onClick={handleBack}  // Use the handleBack function to go back
          className="
            bg-white/10
            backdrop-blur-3xl
            border border-white/30
            shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]
            rounded-full
            w-12 h-12
            mb-4
            text-[#53068c]
            hover:bg-blue-400/20
            transition-all duration-300 items-center flex justify-center"
        >
          <ArrowLeft />
        </button>

        {/* Shared Glass Styles */}
        <ul className="
          flex flex-col space-y-4
          bg-white/10
          backdrop-blur-3xl
          border border-white/30
          shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]
          rounded-full
          p-3 py-5
          transition-all duration-300
        ">
          {operaShortSidebarItems.map((item) => (
            <li key={item.id}>
              <Link
                to={item.path || "#"}
                className="flex items-center justify-center w-12 h-12 rounded-xl text-[#53068c] hover:bg-blue-400/20 transition-colors"
              >
                <item.icon className="w-6 h-6" />
              </Link>
            </li>
          ))}
        </ul>

        {/* Separator */}
        <div className="flex-grow my-4 border-b border-gray-300" />

        {/* Long Sidebar Items */}
        <ul className="
          flex flex-col space-y-4
          bg-white/10
          backdrop-blur-3xl
          border border-white/30
          shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]
          rounded-full
          p-3 py-5
          transition-all duration-300
        ">
          {operaLongSidebarItems.map((item) => (
            <li key={item.id}>
              <Link
                to={item.path || "#"}
                className="flex items-center justify-center w-12 h-12 rounded-xl text-[#53068c] hover:bg-blue-400/20 transition-colors"
              >
                <item.icon className="w-6 h-6" />
              </Link>
            </li>
          ))}
        </ul>

      </nav>
    </div>
  );
};

export default OperaAirSidebar;
