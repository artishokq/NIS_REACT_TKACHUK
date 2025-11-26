import React, { createContext, useState } from "react";
import type { ReactNode } from "react";

export interface EventContextType {
  events: string[];
  addEvent: (event: string) => void;
  clearEvents: () => void;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export { EventContext };

interface EventProviderProps {
  children: ReactNode;
}

export const EventProvider: React.FC<EventProviderProps> = ({ children }) => {
  const [events, setEvents] = useState<string[]>([]);

  const addEvent = (event: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setEvents((prev) => [`[${timestamp}] ${event}`, ...prev]);
  };

  const clearEvents = () => {
    setEvents([]);
  };

  return (
    <EventContext.Provider value={{ events, addEvent, clearEvents }}>
      {children}
    </EventContext.Provider>
  );
};
