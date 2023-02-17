'use client'

import { useState } from 'react';
import { enableLegendStateReact, useObservable } from '@legendapp/state/react';

enableLegendStateReact();

function Normal() {
  const [count, setCount] = useState(0);
  return (
    <>
      <div>Count: {count}</div>
      <button onClick={() => setCount(count + 1)}>Increase counter</button>
    </>
  );
}
function FineGrained() {
  const count = useObservable(0);
  return (
    <>
      <div>Count: {count}</div>
      <button onClick={() => count.set((count) => count + 1)}>
        Increase counter
      </button>
    </>
  );
}

export default function Page() {
  return (
    <>
      <Normal />
      <FineGrained />
    </>
  );
}
