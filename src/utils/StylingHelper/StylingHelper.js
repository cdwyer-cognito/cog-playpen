export const cssColor2Hex = {
  // reds
  IndianRed: '#CD5C5C',
  LightCoral: '#F08080',
  Salmon: '#FA8072',
  DarkSalmon: '#E9967A',
  LightSalmon: '#FFA07A',
  Crimson: '#DC143C',
  Red: '#FF0000',
  FireBrick: '#B22222',
  DarkRed: '#8B0000',
  // pinks
  Pink: '#FFC0CB',
  LightPink: '#FFB6C1',
  HotPink: '#FF69B4',
  DeepPink: '#FF1493',
  MediumVioletRed: '#C71585',
  PaleVioletRed: '#DB7093',
  // oranges
  Coral: '#FF7F50',
  Tomato: '#FF6347',
  OrangeRed: '#FF4500',
  DarkOrange: '#FF8C00',
  Orange: '#FFA500',
  // yellows
  Gold: '#FFD700',
  Yellow: '#FFFF00',
  LightYellow: '#FFFFE0',
  LemonChiffon: '#FFFACD',
  LightGoldenrodYellow: '#FAFAD2',
  PapayaWhip: '#FFEFD5',
  Moccasin: '#FFE4B5',
  PeachPuff: '#FFDAB9',
  PaleGoldenrod: '#EEE8AA',
  Khaki: '#F0E68C',
  DarkKhaki: '#BDB76B',
  // purples
  Lavender: '#E6E6FA',
  Thistle: '#D8BFD8',
  Plum: '#DDA0DD',
  Violet: '#EE82EE',
  Orchid: '#DA70D6',
  Fuchsia: '#FF00FF',
  Magenta: '#FF00FF',
  MediumOrchid: '#BA55D3',
  MediumPurple: '#9370DB',
  BlueViolet: '#8A2BE2',
  DarkViolet: '#9400D3',
  DarkOrchid: '#9932CC',
  DarkMagenta: '#8B008B',
  Purple: '#800080',
  RebeccaPurple: '#663399',
  Indigo: '#4B0082',
  MediumSlateBlue: '#7B68EE',
  SlateBlue: '#6A5ACD',
  DarkSlateBlue: '#483D8B',
  // greens
  GreenYellow: '#ADFF2F',
  Chartreuse: '#7FFF00',
  LawnGreen: '#7CFC00',
  Lime: '#00FF00',
  LimeGreen: '#32CD32',
  PaleGreen: '#98FB98',
  LightGreen: '#90EE90',
  MediumSpringGreen: '#00FA9A',
  SpringGreen: '#00FF7F',
  MediumSeaGreen: '#3CB371',
  SeaGreen: '#2E8B57',
  ForestGreen: '#228B22',
  Green: '#008000',
  DarkGreen: '#006400',
  YellowGreen: '#9ACD32',
  OliveDrab: '#6B8E23',
  Olive: '#808000',
  DarkOliveGreen: '#556B2F',
  MediumAquamarine: '#66CDAA',
  DarkSeaGreen: '#8FBC8F',
  LightSeaGreen: '#20B2AA',
  DarkCyan: '#008B8B',
  Teal: '#008080',
  // blues/cyans
  Aqua: '#00FFFF',
  Cyan: '#00FFFF',
  LightCyan: '#E0FFFF',
  PaleTurquoise: '#AFEEEE',
  Aquamarine: '#7FFFD4',
  Turquoise: '#40E0D0',
  MediumTurquoise: '#48D1CC',
  DarkTurquoise: '#00CED1',
  CadetBlue: '#5F9EA0',
  SteelBlue: '#4682B4',
  LightSteelBlue: '#B0C4DE',
  PowderBlue: '#>B0E0E6',
  LightBlue: '#ADD8E6',
  SkyBlue: '#87CEEB',
  LightSkyBlue: '#87CEFA',
  DeepSkyBlue: '#00BFFF',
  DodgerBlue: '#1E90FF',
  CornflowerBlue: '#6495ED',
  RoyalBlue: '#4169E1',
  Blue: '#0000FF',
  MediumBlue: '#0000CD',
  DarkBlue: '#00008B',
  Navy: '#000080',
  MidnightBlue: '#191970',
  // browns
  Cornsilk: '#FFF8DC',
  BlanchedAlmond: '#FFEBCD',
  Bisque: '#FFE4C4',
  NavajoWhite: '#FFDEAD',
  Wheat: '#F5DEB3',
  BurlyWood: '#DEB887',
  Tan: '#D2B48C',
  RosyBrown: '#BC8F8F',
  SandyBrown: '#F4A460',
  Goldenrod: '#DAA520',
  DarkGoldenrod: '#B8860B',
  Peru: '#CD853F',
  Chocolate: '#D2691E',
  SaddleBrown: '#8B4513',
  Sienna: '#A0522D',
  Brown: '#A52A2A',
  Maroon: '#800000',
  // whites
  White: '#FFFFFF',
  Snow: '#FFFAFA',
  Honeydew: '#F0FFF0',
  MintCream: '#F5FFFA',
  Azure: '#F0FFFF',
  AliceBlue: '#F0F8FF',
  GhostWhite: '#F8F8FF',
  WhiteSmoke: '#F5F5F5',
  Seashell: '#FFF5EE',
  Beige: '#F5F5DC',
  OldLace: '#FDF5E6',
  FloralWhite: '#FFFAF0',
  Ivory: '#FFFFF0',
  AntiqueWhite: '#FAEBD7',
  Linen: '#FAF0E6',
  LavenderBlush: '#FFF0F5',
  MistyRose: '#FFE4E1',
  // greys
  Gainsboro: '#DCDCDC',
  LightGray: '#D3D3D3',
  LightGrey: '#D3D3D3',
  Silver: '#C0C0C0',
  DarkGray: '#>A9A9A9',
  DarkGrey: '#>A9A9A9',
  Gray: '#808080',
  DimGray: '#696969',
  LightSlateGray: '#778899',
  SlateGray: '#708090',
  DarkSlateGray: '#2F4F4F',
  Black: '#000000',
};

export default class {
  constructor() {
    this.processedTextOnBackground = {};
  }

  rgb2hex = rgbString => {
    // expecting string 'rgb(255,255,255)'
    const rgbArray = rgbString
      .substring(rgbString.lastIndexOf('(') + 1, rgbString.lastIndexOf(')'))
      .split(',');
    const r = parseInt(rgbArray[0], 10)
      .toString(16)
      .padStart(2, '0');
    const g = parseInt(rgbArray[1], 10)
      .toString(16)
      .padStart(2, '0');
    const b = parseInt(rgbArray[2], 10)
      .toString(16)
      .padStart(2, '0');

    const hex = `#${r}${g}${b}`;

    return hex;
  };

  hex2rgbObj = hexString => {
    // expecting string '#000000'
    const r = parseInt(hexString.substring(1, 3), 16);
    const g = parseInt(hexString.substring(3, 5), 16);
    const b = parseInt(hexString.substring(5, 7), 16);
    return { r, g, b };
  };

  textOnBackground = colorString => {
    // has this already been calculated?
    if (colorString in this.processedTextOnBackground) {
      return this.processedTextOnBackground[colorString];
    }

    const textOnBackground = {};
    let hexValue;
    if (colorString.substring(0, 1) === '#') {
      hexValue = colorString;
    } else if (colorString.substring(0, 3) === 'rgb') {
      hexValue = this.rgb2hex(colorString);
    } else if (colorString in cssColor2Hex) {
      hexValue = cssColor2Hex[colorString];
    } else {
      // color not recognised unable to convert
      return {};
    }

    const { r, g, b } = this.hex2rgbObj(hexValue);
    let textColor = '#ffffff';

    const colourIsLight = (red, green, blue) => {
      const a = 1 - (0.299 * red + 0.587 * green + 0.114 * blue) / 255;
      return a < 0.5;
    };

    if (colourIsLight(r, g, b)) {
      textColor = '#000000';
    }

    // add colours to array
    textOnBackground.backgroundColor = hexValue;
    textOnBackground.color = textColor;

    // store for next query
    this.processedTextOnBackground[colorString] = textOnBackground;

    return textOnBackground;
  };
}
