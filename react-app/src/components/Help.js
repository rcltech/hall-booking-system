import React from 'react';
//import 'typeface-roboto';
import { Collapse, Card, CardBody } from 'reactstrap';

class Help extends React.Component {
  render() {
    const { collapse, collapseStyles, textBodyStyles } = this.props;
    return (
      <Collapse isOpen={collapse} style={collapseStyles}>
        <Card>
          <CardBody style={textBodyStyles}>Placeholder</CardBody>
        </Card>
      </Collapse>
    );
  }
}

export default Help;
