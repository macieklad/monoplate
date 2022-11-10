import * as React from "react";

export interface ButtonProps {
  children: React.ReactNode;
}

export function Button(props: ButtonProps) {
  return <button className="text-blue-400">{props.children} this changes fast</button>;
}

Button.displayName = "Button";
