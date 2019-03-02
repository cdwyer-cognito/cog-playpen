/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, select } from '@storybook/addon-knobs';
import { withViewport } from '@storybook/addon-viewport';

import SignatureCapture from './SignatureCapture';

storiesOf('components/SignatureCapture', module)
  .addDecorator(withKnobs)
  .addDecorator(withViewport())
  .add('Signature Capture configurable', () => (
    <SignatureCapture
      watermark="In signing this box you are agreeing to everything we want"
      penColor={select(
        'Pen Colour',
        { black: 'black', red: 'red', green: 'green', blue: 'blue', yellow: 'yellow' },
        ''
      )}
      saveAsType={select('Signature output', { png: 'png', jpg: 'jpg', svg: 'svg' }, '')}
      signature=""
      storeSignature={signature => window.alert(signature)}
      clickedClose={() => window.alert('Clicked Close')}
    />
  ));
