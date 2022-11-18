import React from 'react';
import { render, screen } from '@testing-library/react';
import { UnstyledText, Text } from './Text';

describe('Text component', async () => {
  it('renders unstyled component correctly', () => {
    render(<UnstyledText>Text</UnstyledText>);
  });

  it('renders component with correct element', () => {
    render(<UnstyledText as="h1">Text</UnstyledText>);
    expect(screen.getByText('Text').tagName).toEqual('H1');
  });

  it('renders styled component correctly', () => {
    render(
      <Text size="md" weight="bold">
        Text
      </Text>,
    );
  });

  it('renders styled component with correct element', () => {
    render(
      <Text size="md" weight="bold" as="h1">
        Text
      </Text>,
    );
    expect(screen.getByText('Text').tagName).toEqual('H1');
  });
}, 1000);
