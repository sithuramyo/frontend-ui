// src/components/dashboard/DashboardCards.tsx

"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { UsersIcon, CalendarDaysIcon, ClockIcon } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

// Define the props interface for the component
interface DashboardCardsProps {
  onCardClick: (cardTitle: string) => void;
  activeCard: string;
}

// Define the type for card data
interface CardData {
  title: string;
  icon: LucideIcon;
  counts: { label: string; value: number }[];
  description: string;
}

const DashboardCards: React.FC<DashboardCardsProps> = ({ onCardClick, activeCard }) => {
  const cards: CardData[] = [
    {
      title: 'Current Clients',
      icon: UsersIcon,
      counts: [
        { label: 'MMT', value: 200 },
        { label: 'BPN', value: 350 },
      ],
      description: 'Total active clients across MMT and BPN.',
    },
    {
      title: 'Today\'s Appointments',
      icon: CalendarDaysIcon,
      counts: [{ label: 'Total', value: 12 }],
      description: 'Number of appointments scheduled for today.',
    },
    {
      title: 'Absent more than 5 Days',
      icon: ClockIcon,
      counts: [{ label: 'Total', value: 7 }],
      description: 'Clients absent for more than 5 consecutive days.',
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {cards.map((card) => {
        const HeaderIconComponent = card.icon;
        return (
          <Card
            key={card.title}
            className={cn(
              'relative overflow-hidden group transition-all duration-300 ease-in-out cursor-pointer hover:shadow-lg hover:border-primary',
              { 'border-2 border-primary': activeCard === card.title }
            )}
            onClick={() => onCardClick(card.title)}
          >
            {/* Header and top-right icon, which is card-specific */}
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {card.title}
              </CardTitle>
              <HeaderIconComponent className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
            </CardHeader>

            {/* Content with counts */}
            <CardContent>
              <div className="flex items-center gap-2 mb-2">
                {card.counts.map((count, index) => (
                  <Badge key={index} variant="secondary" className="text-lg font-bold p-2 px-3 flex items-center gap-2">
                    {/* The UsersIcon is used for every count */}
                    <UsersIcon className="h-5 w-5" />
                    {count.value} {count.label}
                  </Badge>
                ))}
              </div>

              <p className="text-xs text-muted-foreground">{card.description}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default DashboardCards;