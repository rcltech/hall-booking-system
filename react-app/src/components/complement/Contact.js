import React from 'react';
import { Collapse, Card, CardBody } from 'reactstrap';

class Contact extends React.Component {
  render() {
    const { collapse, collapseStyles, textBodyStyles } = this.props;
    return (
      <Collapse isOpen={collapse} style={collapseStyles}>
        <Card>
          <CardBody style={textBodyStyles}>
            To report any problems with Owl, please{' '}
            <a href="mailto:contact@rctech.club?subject=Owl%20Problem">
              contact us by email
            </a>
            .
          </CardBody>
        </Card>
      </Collapse>
    );
  }
}

export default Contact;
