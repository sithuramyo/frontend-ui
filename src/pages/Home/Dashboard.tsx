// src/components/dashboard/Dashboard.tsx

import { Toggle } from "@/components/ui/toggle";
import AbsentMoreThan5DaysTable from "@/components/UserTable/AbsentMoreThan5DaysTable";
import CurrentClientsTable from "@/components/UserTable/CurrentClientsTable";
import TodaysAppointmentsTable from "@/components/UserTable/TodaysAppointmentsTable";
import TotalRegisterTable from "@/components/UserTable/TotalRegisterTable";
import { useState } from "react";
import DashboardCharts from "./Dashboard/DashboardCharts";
import DashboardCards from "./Dashboard/DashboardCards";

// Import the specific user list components


// Define a type for the component mapping
type UserListComponent = React.FC;

// Create a mapping object from card title to component
const userListComponents: Record<string, UserListComponent> = {
  'Current Clients': CurrentClientsTable,
  'Total Register': TotalRegisterTable,
  'Today\'s Appointments': TodaysAppointmentsTable,
  'Absent more than 5 Days': AbsentMoreThan5DaysTable,
};

const Dashboard = () => {
  const [view, setView] = useState<'charts' | 'users'>('charts');
  const [activeCard, setActiveCard] = useState<string>('');

  const handleCardClick = (cardTitle: string) => {
    // Only switch to 'users' view if the card title exists in our mapping
    if (userListComponents[cardTitle]) {
      setView('users');
      setActiveCard(cardTitle);
    }
  };

  const handleToggleCharts = () => {
    setView('charts');
    setActiveCard('');
  };

  // Determine which component to render
  const renderContent = () => {
    if (view === 'charts') {
      return <DashboardCharts />;
    } else {
      // Look up the component from the mapping object
      const UserListComponentToRender = userListComponents[activeCard];
      // Render the component if it exists, otherwise show a message or null
      return UserListComponentToRender ? (
        <UserListComponentToRender />
      ) : (
        <div className="p-4 rounded-lg border text-center">
          <p>Please select a card to view the user list.</p>
        </div>
      );
    }
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
      {renderContent()}
    </div>
  );
};

export default Dashboard;