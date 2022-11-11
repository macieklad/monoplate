import * as React from 'react';

export interface ButtonProps {
  children: React.ReactNode;
}

export function Button(props: ButtonProps) {
  return (
    <button className="text-red-400">
      {props.children} this changes fast as heck
    </button>
  );
}

Button.displayName = 'Button';
