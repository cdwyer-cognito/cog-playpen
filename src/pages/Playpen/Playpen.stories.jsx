/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, select } from '@storybook/addon-knobs';
import { withViewport } from '@storybook/addon-viewport';

import Playpen from './Playpen';

storiesOf('Pages/Playpen', module)
  .addDecorator(withKnobs)
  .addDecorator(withViewport())
  .add('Logon with default component logo and video', () => (
    <Playpen />
  ));
