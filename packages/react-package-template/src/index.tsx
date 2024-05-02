import type { PropsWithChildren } from 'react';

export function Component(props: PropsWithChildren) {
  return <div>{props.children}</div>;
}
