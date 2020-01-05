import React from 'react';
import { RoomListItem } from './RoomListItem';

export const RoomList = ({ rooms, selectRoom }) => {
  return (
    <>
      {rooms.map(room => (
        <RoomListItem key={room.name} room={room} selectRoom={selectRoom} />
      ))}
    </>
  );
};
