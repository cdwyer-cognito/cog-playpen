import { configure } from '@storybook/react';

// we take all the component stories
const reqComponents = require.context('../src/components/', true, /\.stories\.jsx$/);

// and all the pages stories
const reqPages = require.context('../src/pages', true, /\.stories\.jsx$/);

function loadStories() {
  reqComponents.keys().forEach(filename => reqComponents(filename));
  reqPages.keys().forEach(filename => reqPages(filename));
}

configure(loadStories, module);
