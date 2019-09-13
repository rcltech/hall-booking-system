import React from 'react';
//import 'typeface-roboto';
import {Collapse, Card, CardBody } from 'reactstrap';
import Members from './Members';
import ProductDescription from './ProductDescription';

class About extends React.Component {
  render() {
      const {collapse, collapseStyles, textBodyStyles} = this.props;
    return (
        <Collapse isOpen={collapse} style={collapseStyles}>
          <Card>
            <CardBody style={textBodyStyles}>
                <ProductDescription/>
                <Members/>
            </CardBody>
          </Card>
        </Collapse>
    )
  }
}

export default About;