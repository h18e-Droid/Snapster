import type { Preview } from '@storybook/react'
import '../src/shared/styles/_colors.scss'
import '../src/shared/styles/_typography.scss'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
    viewport: {
      viewports: {
        mobile360: {
          name: 'Mobile 360px',
          styles: {
            width: '360px',
            height: 'auto',
          },
        },
      },
      viewport: 'mobile360',
    },
  },
};



export default preview;