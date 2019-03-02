/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, select, boolean } from '@storybook/addon-knobs';
import { withViewport } from '@storybook/addon-viewport';

import SignatureCapture from './SignatureCapture';

storiesOf('components/SignatureCapture', module)
  .addDecorator(withKnobs)
  .addDecorator(withViewport())
  .add('Signature Capture configurable', () => (
    <SignatureCapture
      watermark="In signing this box you are agreeing to everything we want"
      saveAsType={select('Signature output', { png: 'png', svg: 'svg' }, '')}
      storeSignature={signature => window.alert(signature)}
      autoShowSignatureCapture={boolean('Show Capture on render', false)}
    />
  ));
