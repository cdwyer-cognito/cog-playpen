/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, select, boolean } from '@storybook/addon-knobs';
import { withViewport } from '@storybook/addon-viewport';

import TextOnBackgroundTast from './TextOnBackgroundTast';

storiesOf('components/TextOnBackgroundTast', module)
  .addDecorator(withKnobs)
  .addDecorator(withViewport())
  .add('Signature Capture configurable', () => <TextOnBackgroundTast />);
