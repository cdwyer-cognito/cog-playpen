import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';
import Zoom from '@material-ui/core/Zoom';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ClearIcon from '@material-ui/icons/Clear';
import AddIcon from '@material-ui/icons/Add';

import SignaturePad from 'react-signature-canvas';

const styles = theme => ({
  container: {
    boxSizing: 'border-box',
    overflow: 'hidden',
  },
  selectBox: {
    boxSizing: 'border-box',
    display: 'block',
    width: '100%',
    height: '100px',
    textAlign: 'center',
    margin: 'auto',
  },
  selectBoxText: {
    boxSizing: 'border-box',
    margin: 'auto',
  },
  signatureImg: {
    padding: '5px',
    margin: 'auto',
    maxWidth: '90%',
    maxHeight: '90%',
  },
  sigPad: {},
  sigButtons: {
    position: 'fixed',
    bottom: '2vh',
    right: '0',
    display: 'flex',
    flex: 'column',
  },
  divider: {
    boxSizing: 'border-box',
    position: 'fixed',
    top: '50vh',
  },
  fab: {
    margin: theme.spacing.unit,
  },
  watermark: {
    boxSizing: 'border-box',
    position: 'fixed',
    width: '100%',
    top: '10vh',
    textAlign: 'center',
  },
});

class SignatureCapture extends Component {
  constructor(props) {
    super(props);
    this.state = {
      windowHeight: 0,
      windowWidth: 0,
      acc: 0,
      showCapture: false,
      signatureImage: '',
    };
    this.sigPad = {};
  }

  componentDidMount() {
    // Listener to pickup on changes to window size
    window.addEventListener('resize', this.updateDimensions);

    // get dimentions when mounted
    this.updateDimensions();
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

    // adding as rotation clears the image but not the object
    // this.clearSignature();
  };

  clearSignature = () => {
    this.sigPad.clear();

    // workaround to regain focus after clear
    let { acc } = this.state;
    this.setState({
      acc: (acc += 1),
      signatureImage: '',
    });
  };

  handleSignatureShow = () => {
    this.setState({ showCapture: true });
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

    // TBD need a redux action to store the sig object
    storeSignature(signature);

    this.setState({
      signatureImage: this.sigPad.getTrimmedCanvas().toDataURL(''),
      showCapture: false,
    });
  };

  closeSignatureCapture = () => {
    const { signatureImage } = this.state;

    // clear signature object if not saved
    if (!signatureImage) {
      this.clearSignature();
    }

    this.setState({
      showCapture: false,
    });
  };

  render() {
    const { windowWidth, windowHeight, acc, showCapture, signatureImage } = this.state;
    const { classes, watermark, penColor } = this.props;

    return (
      <div di="signature_control">
        <Collapse in={!showCapture}>
          <Paper onClick={this.handleSignatureShow}>
            <div className={classes.selectBox}>
              {signatureImage ? (
                <img className={classes.signatureImg} alt="sig_preview" src={signatureImage} />
              ) : (
                <Typography className={classes.selectBoxText} variant="h4" gutterBottom>
                  Sign here
                </Typography>
              )}
            </div>
          </Paper>
        </Collapse>
        <Zoom in={showCapture}>
          <div
            id="signature_container"
            className={classes.container}
            style={{ width: windowWidth, height: windowHeight }}
          >
            <SignaturePad
              key={acc}
              penColor={penColor}
              backgroundColor="rgba(0,0,0,0)"
              clearOnResize={false} // this doesn't appear to work, not an issue if I can lock an oriebtation.
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
            <Divider className={classes.divider} />
            <div id="signature_button_group" className={classes.sigButtons}>
              <Fab
                color="primary"
                aria-label="Back"
                className={classes.fab}
                onClick={this.closeSignatureCapture}
              >
                <ArrowLeftIcon />
              </Fab>
              <Fab
                color="primary"
                aria-label="Clear"
                className={classes.fab}
                onClick={this.clearSignature}
              >
                <ClearIcon />
              </Fab>
              <Fab
                color="primary"
                aria-label="Save"
                className={classes.fab}
                onClick={this.saveSignature}
              >
                <AddIcon />
              </Fab>
            </div>
          </div>
        </Zoom>
      </div>
    );
  }
}

SignatureCapture.propTypes = {
  classes: PropTypes.shape({
    container: PropTypes.string.isRequired,
    selectBox: PropTypes.string.isRequired,
    selectBoxText: PropTypes.string.isRequired,
    sigPad: PropTypes.string.isRequired,
    sigButtons: PropTypes.string.isRequired,
    divider: PropTypes.string.isRequired,
    fab: PropTypes.string.isRequired,
    watermark: PropTypes.string.isRequired,
  }).isRequired,
  watermark: PropTypes.string,
  penColor: PropTypes.string,
  saveAsType: PropTypes.string,
  storeSignature: PropTypes.func.isRequired,
};

SignatureCapture.defaultProps = {
  watermark: '',
  penColor: 'black',
  saveAsType: '',
};

export default withStyles(styles)(SignatureCapture);
