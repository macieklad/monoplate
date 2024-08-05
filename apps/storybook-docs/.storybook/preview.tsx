import './globals.css';
import type { Preview } from '@storybook/react';
import {
  Title,
  Subtitle,
  Description,
  Primary,
  Controls,
  Stories,
} from '@storybook/blocks';
import { Resources } from './blocks/Resources';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
          <Resources />
          <Primary />
          <Controls />
          <Stories />
        </>
      ),
    },
  },
};

export default preview;
