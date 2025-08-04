import { Toggle } from "@/components/ui/toggle";
import { useState } from "react";
import DashboardCards from "./Dashboard/DashboardCards";
import DashboardCharts from "./Dashboard/DashboardCharts";
import UserTable from "./Dashboard/UserTable";

const Dashboard = () => {
  // Use a union type for the view state: 'charts' or 'users'
  const [view, setView] = useState<'charts' | 'users'>('charts');

  // The activeCard state is a simple string
  const [activeCard, setActiveCard] = useState<string>('');

  const handleCardClick = (cardTitle: string) => {
    setView('users');
    setActiveCard(cardTitle);
  };

  const handleToggleCharts = () => {
    setView('charts');
    setActiveCard('');
  };

  return (
    <div className="p-4 md:p-8 space-y-8">
      {/* Header and Toggle Button */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard Overview</h1>
        <Toggle
          pressed={view === 'charts'}
          onPressedChange={handleToggleCharts}
        >
          {view === 'charts' ? 'Showing Charts' : 'Show Charts'}
        </Toggle>
      </div>

      {/* Cards Section */}
      <DashboardCards onCardClick={handleCardClick} activeCard={activeCard} />

      {/* Conditional Rendering Section */}
      {view === 'charts' ? (
        <DashboardCharts />
      ) : (
        <UserTable cardTitle={activeCard} />
      )}
    </div>
  );
};

export default Dashboard;