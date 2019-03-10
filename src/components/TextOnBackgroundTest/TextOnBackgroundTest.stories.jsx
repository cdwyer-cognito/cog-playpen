/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, select, boolean } from '@storybook/addon-knobs';
import { withViewport } from '@storybook/addon-viewport';

import TextOnBackgroundTest from './TextOnBackgroundTest';

storiesOf('components/TextOnBackgroundTest', module)
  .addDecorator(withKnobs)
  .addDecorator(withViewport())
  .add('Signature Capture configurable', () => <TextOnBackgroundTest />);
