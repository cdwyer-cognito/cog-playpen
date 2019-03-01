import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import SignaturePad from 'react-signature-canvas';

const styles = () => ({
  container: {
    boxSizing: 'border-box',
    zIndex: '0',
    overflow: 'hidden',
  },
  sigButtons: {
    position: 'fixed',
    bottom: '0',
    right: '0',
    left: '0',
    marginRight: 'auto',
    marginLeft: 'auto',
    display: 'flex',
    flex: 'column',
    paddingBottom: '5px',
    zIndex: '100',
  },
  sigButtonsInner: {
    margin: 'auto',
  },
  watermark: {
    boxSizing: 'border-box',
    position: 'fixed',
    width: '100%',
    top: '40px',
    textAlign: 'center',
    zIndex: '10',
  },
  button: {
    textTransform: 'none',
    fontSize: '1.0rem',
    margin: '10px',
  },
});

class SignatureCapture extends Component {
  constructor(props) {
    super(props);
    this.state = {
      windowHeight: 0,
      windowWidth: 0,
    };
    this.sigPad = {};
  }

  componentDidMount() {
    // Listener to pickup on changes to window size
    window.addEventListener('resize', this.updateDimensions);

    // get dimentions when mounted
    this.updateDimensions();

    // re-render last signature if comonent re-opened
    const { signature } = this.props;
    if (signature) {
      this.sigPad.fromDataURL(signature);
    }
  }

  componentWillUnmount() {
    // remove the listener
    window.removeEventListener('resize', this.updateDimensions);
  }

  updateDimensions = () => {
    const w = Math.floor(window.innerWidth);
    const h = Math.floor(window.innerHeight);
    this.setState({
      windowHeight: h,
      windowWidth: w,
    });
  };

  clearSignature = () => {
    this.sigPad.clear();
  };

  saveSignature = () => {
    const { saveAsType, storeSignature } = this.props;

    if (this.sigPad.isEmpty()) {
      window.alert('Signature is empty!');
      return;
    }

    if (this.sigPad.toData().flat().length <= 20) {
      window.alert('Signature is too short!');
      return;
    }

    // png (default), svg, jpeg
    let save = '';
    if (saveAsType === 'svg') {
      save = 'image/svg+xml';
    }

    if (saveAsType === 'jpg' || saveAsType === 'jpeg') {
      save = 'image/jpeg';
    }
    const signature = this.sigPad.toDataURL(save);

    // need a redux action to save the signature
    // need a redux action to store the sig object to play re-render if signature re-opened
    storeSignature(signature);
  };

  render() {
    const { windowWidth, windowHeight } = this.state;
    const { classes, watermark, penColor } = this.props;

    return (
      <div
        id="signature_container"
        className={classes.container}
        style={{ width: windowWidth, height: windowHeight }}
      >
        <SignaturePad
          penColor={penColor}
          canvasProps={{
            width: windowWidth,
            height: windowHeight,
            className: styles.sigPad,
          }}
          ref={ref => {
            this.sigPad = ref;
          }}
        />
        <div key="signature_watermark" id="signature_watermark" className={classes.watermark}>
          <Typography variant="h5" gutterBottom>
            {watermark}
          </Typography>
        </div>
        <div id="signature_button_group" className={classes.sigButtons}>
          <div className={classes.sigButtonsInner}>
            <Button
              key="clear"
              id="clear"
              variant="contained"
              size="large"
              color="primary"
              className={classes.button}
              onClick={this.clearSignature}
            >
              Clear
            </Button>
            <Button
              key="save"
              id="save"
              variant="contained"
              size="large"
              color="primary"
              className={classes.button}
              onClick={this.saveSignature}
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

SignatureCapture.propTypes = {
  classes: PropTypes.shape({
    container: PropTypes.string.isRequired,
    sigButtons: PropTypes.string.isRequired,
    sigButtonsInner: PropTypes.string.isRequired,
    watermark: PropTypes.string.isRequired,
    button: PropTypes.string.isRequired,
  }).isRequired,
  watermark: PropTypes.string,
  penColor: PropTypes.string,
  saveAsType: PropTypes.string,
  storeSignature: PropTypes.func.isRequired,
  signature: PropTypes.string,
};

SignatureCapture.defaultProps = {
  watermark: '',
  penColor: 'black',
  saveAsType: '',
  signature: '',
};

export default withStyles(styles)(SignatureCapture);
