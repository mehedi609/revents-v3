import React from 'react';
import { Dropdown, Image, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const SignedInMenu = ({ signOut }) => {
  return (
    <>
      <Menu.Item position="right">
        <Image avatar spaced="right" src="/assets/user.png" />

        <Dropdown>
          <Dropdown.Menu>
            <Dropdown.Item
              as={Link}
              to="/createEvent"
              text="Create Event"
              icon="plus"
            />

            <Dropdown.Item text="My Profile" icon="user" />

            <Dropdown.Item text="Sign out" icon="power" onClick={signOut} />
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Item>
    </>
  );
};

export default SignedInMenu;
