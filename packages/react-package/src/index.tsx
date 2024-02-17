import type { PropsWithChildren } from 'react';

export function MyComp(props: PropsWithChildren) {
  return <div>{props.children}</div>;
}
