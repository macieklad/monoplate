import '@airhelp/react-styles/base.css';
import { Story, Meta } from '@storybook/react';
import { Text, TextProps, UnstyledText } from './Text';

export default {
  title: 'UI/Text',
  component: Text,
} as Meta;

const Template: Story<TextProps> = (args) => (
  <>
    <UnstyledText {...args}>Paragraph</UnstyledText>
    <UnstyledText as="h1" {...args}>
      Text as heading (check tag)
    </UnstyledText>

    <Text size="lg" weight="bold" {...args}>
      Styled text
    </Text>
  </>
);

export const Primary = Template.bind({});
Primary.args = {};
