import './styles.css';
import { Button, Container } from 'semantic-ui-react';
import EventDashboard from '../../features/events/event-dashboard/EventDashboard';
import NavBar from '../../features/nav/NavBar';

function App() {
  return (
    <div>
      <NavBar />
      <Container className="main">
        <EventDashboard />
      </Container>
    </div>
  );
}

export default App;
