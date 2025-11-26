import { useContext } from "react";
import { EventContext } from "../context/EventContext";
import type { EventContextType } from "../context/EventContext";

export const useEventLog = (): EventContextType => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error("useEventLog must be used within an EventProvider");
  }
  return context;
};
