import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@acme/components';

/**
 * Primary UI component for user interaction
 */
const meta = {
  title: 'Example/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: '',
    },
    ariaPattern: 'https://www.w3.org/WAI/ARIA/apg/patterns/button',
    source: 'https://github.com/macieklad/monoplate',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      options: ['button', 'submit', 'reset'],
      control: { type: 'radio' },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Primary story description
 */
export const Primary: Story = {
  args: {
    type: 'button',
    children: 'Example button',
  },
};
