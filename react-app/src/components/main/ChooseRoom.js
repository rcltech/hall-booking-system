import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle
} from 'reactstrap';

import NavBar from '../complement/NavBar';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Typography } from '@material-ui/core';

import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const useStyles = makeStyles(theme => ({
  dropdownContainer: {
    display: 'flex',
    justifyContent: 'center',
    padding: '20px 0'
  }
}));

function dropdownItems(room, selectRoom) {
  return (
    <DropdownItem key={room} onClick={() => selectRoom(room)}>
      <Typography>{room}</Typography>
    </DropdownItem>
  );
}

function ChooseRoom() {
  const [isOpen, toggleOpen] = useState(false);
  const [room, selectRoom] = useState(null);
  const classes = useStyles();

  const GET_ROOMS = gql`
    query rooms {
      rooms {
        number
        name
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_ROOMS);
  if (loading) return <div>Loading</div>;
  if (error) return <div>Error</div>;

  const { rooms } = data;

  if (room)
    return (
      <Redirect
        to={{
          pathname: '/date',
          state: {
            room
          }
        }}
      />
    );

  return (
    <div>
      <NavBar backPath="/" />
      <div className={classes.dropdownContainer}>
        <Dropdown isOpen={isOpen} toggle={() => toggleOpen(!isOpen)} size="lg">
          <DropdownToggle caret>{room ? room : 'Select room'}</DropdownToggle>
          <DropdownMenu>
            {rooms.map(room => dropdownItems(room.number, selectRoom))}
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  );
}

export default ChooseRoom;
