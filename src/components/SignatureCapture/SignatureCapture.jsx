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

import SignaturePad from 'react-signature-pad-wrapper';

const styles = theme => ({
  container: {
    boxSizing: 'border-box',
    overflow: 'hidden',
    width: '100%',
    height: '100%',
  },
  selectBox: {
    boxSizing: 'border-box',
    display: 'block',
    width: '100%',
    height: '100px',
    margin: 'auto',
    textAlign: 'center',
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
  sigPad: {
    width: '100%',
    height: '100%',
  },
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
  userDisabled: {
    '-webkit-touch-callout': 'none' /* iOS Safari */,
    '-webkit-user-select': 'none' /* Safari */,
    '-khtml-user-select': 'none' /* Konqueror HTML */,
    '-moz-user-select': 'none' /* Firefox */,
    '-ms-user-select': 'none' /* Internet Explorer/Edge */,
    'user-select': 'none',
  },
});

class SignatureCapture extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCapture: false,
      signatureImage: '',
      signatureCaptured: false,
    };
    this.sigPad = {};
  }

  componentDidMount() {
    // show the signature capture on mount
    const { autoShowSignatureCapture } = this.props;
    if (autoShowSignatureCapture) {
      this.setState({ showCapture: true });
    }
  }

  clearSignature = () => {
    this.sigPad.clear();
    this.setState({
      signatureCaptured: false,
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

    // png (default) or svg
    let save = '';
    if (saveAsType === 'svg') {
      save = 'image/svg+xml';
    }

    const signature = this.sigPad.toDataURL(save);

    // TBD need a redux action to store the sig object
    storeSignature(signature);

    this.setState({
      signatureImage: signature,
      signatureCaptured: true,
      showCapture: false,
    });
  };

  closeSignatureCapture = () => {
    const { signatureCaptured } = this.state;

    // clear signature object if not saved
    if (!signatureCaptured) {
      this.clearSignature();
    }

    this.setState({
      showCapture: false,
    });
  };

  render() {
    const { showCapture, signatureImage } = this.state;
    const { classes, watermark } = this.props;

    return (
      <React.Fragment>
        <Collapse in={!showCapture}>
          <Paper onClick={this.handleSignatureShow}>
            <div className={classes.selectBox}>
              {signatureImage ? (
                <img className={classes.signatureImg} alt="sig_preview" src={signatureImage} />
              ) : (
                <Typography
                  className={[classes.selectBoxText, classes.userDisabled].join(' ')}
                  variant="h6"
                  align="center"
                  color="textPrimary"
                  gutterBottom
                >
                  Sign here
                </Typography>
              )}
            </div>
          </Paper>
        </Collapse>
        <Zoom in={showCapture}>
          <div id="signature_container" className={classes.container}>
            <SignaturePad
              height={window.innerHeight}
              width={window.innerWidth}
              backgroundColor="rgba(0,0,0,0)"
              redrawOnResize
              ref={ref => {
                this.sigPad = ref;
              }}
            />
            <div
              key="signature_watermark"
              id="signature_watermark"
              className={[classes.watermark, classes.userDisabled].join(' ')}
            >
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
      </React.Fragment>
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
  saveAsType: PropTypes.string,
  storeSignature: PropTypes.func.isRequired,
  autoShowSignatureCapture: PropTypes.bool,
};

SignatureCapture.defaultProps = {
  watermark: '',
  saveAsType: '',
  autoShowSignatureCapture: false,
};

export default withStyles(styles)(SignatureCapture);
