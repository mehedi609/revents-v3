import { Route, useLocation } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import './styles.css';
import EventDashboard from '../../features/events/event-dashboard/EventDashboard';
import NavBar from '../../features/nav/NavBar';
import HomePage from '../../features/home/HomePage';
import EventDetailedPage from '../../features/events/event-detailed/EventDetailedPage';
import EventForm from '../../features/events/event-form/EventForm';
import Sandbox from '../../features/sandbox/Sandbox';

function App() {
  const { key } = useLocation();
  return (
    <div>
      <Route exact path="/" component={HomePage} />
      <Route
        path={'/(.+)'}
        render={() => (
          <>
            <NavBar />
            <Container className="main">
              <Route exact path="/events" component={EventDashboard} />
              <Route path="/events/:id" component={EventDetailedPage} />
              <Route
                path={['/createEvent', '/manage/:id']}
                component={EventForm}
                key={key}
              />
              <Route path="/sandbox" component={Sandbox} />
            </Container>
          </>
        )}
      />
    </div>
  );
}

export default App;
