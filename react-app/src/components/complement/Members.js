import React from 'react';
import Member from './Member';
import { map } from 'lodash';
import sean from '../../images/team-members/sean.jpg';
import sid from '../../images/team-members/sid.png';
import utkarsh from '../../images/team-members/utkarsh.png';
import welvin from '../../images/team-members/welvin.png';

const style = {
  container: {
    width: '100%',
    margin: 'auto'
  },
  titleStyle: {
    fontSize: '1.5em'
  }
};

const data = {
  utkarsh: {
    name: 'Utkarsh Goel',
    image: utkarsh,
    role: 'Full-stack developer'
  },
  sean: {
    name: 'Sean Chok',
    image: sean,
    role: 'Back-End developer and Designer'
  },
  sid: {
    name: 'Siddhant Bagri',
    image: sid,
    role: 'Front-End developer and Designer'
  },
  welvin: {
    name: 'Welvin Bun',
    image: welvin,
    role: 'Front-End developer'
  }
};

const createMember = data =>
  map(data, (value, key) => <Member key={key} data={value} />);

class Members extends React.Component {
  render() {
    return (
      <div style={style.container}>
        <h1 style={style.titleStyle}>Our Team</h1>
        {createMember(data)}
      </div>
    );
  }
}

export default Members;
