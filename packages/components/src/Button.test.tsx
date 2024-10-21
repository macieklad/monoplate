import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { default as userEvent } from '@testing-library/user-event';
import { useState } from 'react';
import { Button } from './Button';

function Clicker() {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <>
      <h1>{isClicked ? 'Clicked' : 'Not clicked'}</h1>
      <Button
        onPress={() => {
          setIsClicked(true);
        }}
      >
        Click me
      </Button>
    </>
  );
}

test('loads and displays greeting', async () => {
  // ARRANGE
  render(<Clicker />);

  // ACT
  await userEvent.click(screen.getByText('Click me'));

  // ASSERT
  expect(await screen.findByText('Clicked')).toBeTruthy();
});
