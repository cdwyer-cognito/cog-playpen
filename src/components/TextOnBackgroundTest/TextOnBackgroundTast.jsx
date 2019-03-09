import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/lab/Slider';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';

import StylingHelper, { cssColor2Hex } from '../../utils/StylingHelper/StylingHelper';

const stylingHelper = new StylingHelper();

const styles = {
  sliderContainer: {
    width: 300,
  },
  slider: {
    padding: '22px 0px',
  },
  demoBox: {
    textAlign: 'center',
    width: '80%',
    backgroundColor: 'black',
    color: 'white',
    paddingTop: '40px',
    paddingBottom: '40px',
    margin: 'auto',
  },
  selectorLabel: {
    paddingRight: '10px',
  },
};
class TextOnBackgroundTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      red: 0,
      green: 0,
      blue: 0,
      cssColor: '',
      query: '',
    };
  }

  redOnChange = (event, value) => {
    const { green, blue } = this.state;
    const red = Math.floor(value);
    const rgb = `rgb(${red},${green},${blue})`;
    this.setState({ red, query: rgb });
  };

  greenOnChange = (event, value) => {
    const { red, blue } = this.state;
    const green = Math.floor(value);
    const rgb = `rgb(${red},${green},${blue})`;
    this.setState({ green, query: rgb });
  };

  blueOnChange = (event, value) => {
    const { red, green } = this.state;
    const blue = Math.floor(value);
    const rgb = `rgb(${red},${green},${blue})`;
    this.setState({ blue, query: rgb });
  };

  handleCssSelect = event => {
    const cssColor = event.target.value;
    const hex = cssColor2Hex[cssColor];
    const rgbObj = stylingHelper.hex2rgbObj(hex);

    this.setState({
      cssColor,
      query: cssColor,
      red: rgbObj.r,
      green: rgbObj.g,
      blue: rgbObj.b,
    });
  };

  render() {
    const { classes } = this.props;
    const { red, green, blue, query, cssColor } = this.state;

    const stylingObj = stylingHelper.textOnBackground(query);
    return (
      <div>
        <div className={classes.demoBox} style={stylingObj ? { ...stylingObj } : null}>
          <h3>The quick brown fox jumps over the lazy dog</h3>
        </div>
        <div>
          <div className={classes.sliderContainer}>
            <Typography id="r_label">Red</Typography>
            <Slider
              classes={{ container: classes.slider }}
              max={255}
              min={0}
              value={red}
              aria-labelledby="label"
              onChange={this.redOnChange}
            />
          </div>
          <div className={classes.sliderContainer}>
            <Typography id="g_label">Green</Typography>
            <Slider
              classes={{ container: classes.slider }}
              max={255}
              min={0}
              value={green}
              aria-labelledby="label"
              onChange={this.greenOnChange}
            />
          </div>
          <div className={classes.sliderContainer}>
            <Typography id="b_label">Blue</Typography>
            <Slider
              classes={{ container: classes.slider }}
              max={255}
              min={0}
              value={blue}
              aria-labelledby="label"
              onChange={this.blueOnChange}
            />
          </div>
        </div>
        <div>
          <InputLabel className={classes.selectorLabel} htmlFor="css-native-simple">
            CSS Color
          </InputLabel>
          <Select
            native
            value={cssColor}
            onChange={this.handleCssSelect}
            inputProps={{
              name: 'CSS Color',
              id: 'css-native-simple',
            }}
          >
            <option value="" />
            {Object.keys(cssColor2Hex).map(color => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
          </Select>
        </div>
        <div>
          <h3>{`Query: ${query}`}</h3>
        </div>
        <div>
          <p>{`stylingObj: ${JSON.stringify(stylingObj)}`}</p>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(TextOnBackgroundTest);
