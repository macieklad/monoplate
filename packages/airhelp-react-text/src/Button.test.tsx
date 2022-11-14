import React from 'react';
import { Button } from './Button';
import { render } from '@testing-library/react';

describe('Button tests', () => {
  it('should render correctly', () => {
    render(<Button>Text</Button>);
  });
});
