import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SignatureCapture from '../../components/SignatureCapture/SignatureCapture';

class Playpen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <SignatureCapture watermark="Hello World" saveAs="svg" />;
  }
}

Playpen.propTypes = {};

Playpen.defaultProps = {};

export default Playpen;
