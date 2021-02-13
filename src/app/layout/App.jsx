import { Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import './styles.css';
import EventDashboard from '../../features/events/event-dashboard/EventDashboard';
import NavBar from '../../features/nav/NavBar';
import HomePage from '../../features/home/HomePage';
import EventDetailedPage from '../../features/events/event-detailed/EventDetailedPage';
import EventForm from '../../features/events/event-form/EventForm';

function App() {
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
              />
            </Container>
          </>
        )}
      />
    </div>
  );
}

export default App;
