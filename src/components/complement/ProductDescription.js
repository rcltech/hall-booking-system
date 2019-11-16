import React from 'react';

const github_url = 'https://github.com/rcltech/hall-booking-system';

const description = (
  <div>
    <p>
      The Owl system aims to make booking common areas easier. Troubled by going
      to the reception and hand writing your booking? You don't have to do that
      anymore!
    </p>
    <p>
      As our product development team always seeks for improvement, you are
      welcomed to leave any comments or suggestions by sending us an email in
      the 'Report' section. For those who are interested in building a similar
      system, checkout our <a href={github_url}>github project</a>.
    </p>
  </div>
);
const style = {
  container: {
    width: '100%',
    margin: 'auto',
    marginBottom: '20px'
  },
  titleStyle: {
    fontSize: '1.5em'
  },
  descriptionStyle: {
    padding: '10px',
    border: '1px solid #eee',
    borderRadius: '5px',
    fontSize: '1em'
  }
};
class ProductDescription extends React.Component {
  render() {
    return (
      <div style={style.container}>
        <h1 style={style.titleStyle}>Product Description</h1>
        <div style={style.descriptionStyle}>{description}</div>
      </div>
    );
  }
}
export default ProductDescription;
