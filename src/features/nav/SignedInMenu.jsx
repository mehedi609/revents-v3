import React from 'react';
import { Dropdown, Image, Menu } from 'semantic-ui-react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { signOutFirebase } from '../../app/firestore/firebaseService';
import { toast } from 'react-toastify';

const SignedInMenu = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const history = useHistory();

  async function handleSignOut() {
    try {
      history.push('/');
      await signOutFirebase();
    } catch (e) {
      toast.error(e.message);
    }
  }

  return (
    <>
      <Menu.Item position="right">
        <Image
          avatar
          spaced="right"
          src={currentUser.photoURL || '/assets/user.png'}
        />

        <Dropdown pointing="top left" text={currentUser.email}>
          <Dropdown.Menu>
            <Dropdown.Item
              as={Link}
              to="/createEvent"
              text="Create Event"
              icon="plus"
            />

            <Dropdown.Item text="My Profile" icon="user" />
            <Dropdown.Item
              as={Link}
              to="/account"
              text="My Account"
              icon="settings"
            />

            <Dropdown.Item
              text="Sign out"
              icon="power"
              onClick={handleSignOut}
            />
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Item>
    </>
  );
};

export default SignedInMenu;
