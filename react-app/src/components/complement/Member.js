import React from 'react';

const style = {
  container: {
    display: 'grid',
    gridTemplateColumns: '30% 70%',
    width: '100%',
    margin: '20px auto',
    padding: '10px',
    border: '1px solid #eee',
    borderRadius: '5px'
  },
  image: {
    borderRadius: '50%',
    maxHeight: 'calc(105px + 3vmin)',
    maxWidth: '100%',
    margin: 'auto'
  },
  text: {
    textAlign: 'left',
    fontSize: '1em',
    display: 'block',
    justifyContent: 'center',
    margin: 'auto 10px'
  },
  name: {
    fontWeight: '800'
  }
};

class Member extends React.Component {
  render() {
    const { data } = this.props;
    return (
      <div style={style.container}>
        <img src={data.image} alt="member" style={style.image} />
        <div style={style.text}>
          <div style={style.name}>{data.name}</div>
          <div>{data.role}</div>
        </div>
      </div>
    );
  }
}

export default Member;
