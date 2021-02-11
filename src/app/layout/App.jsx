import { useState } from 'react';
import { Button, Container } from 'semantic-ui-react';
import './styles.css';
import EventDashboard from '../../features/events/event-dashboard/EventDashboard';
import NavBar from '../../features/nav/NavBar';

function App() {
  const [formOpen, setFormOpen] = useState(false);

  return (
    <div>
      <NavBar setFormOpen={setFormOpen} />
      <Container className="main">
        <EventDashboard formOpen={formOpen} />
      </Container>
    </div>
  );
}

export default App;
