import { EventProvider } from "./context/EventContext";
import { Dashboard } from "./pages/Dashboard";

function App() {
  return (
    <EventProvider>
      <Dashboard />
    </EventProvider>
  );
}

export default App;
