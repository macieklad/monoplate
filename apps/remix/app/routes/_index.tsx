import type { MetaFunction } from '@remix-run/node';
import { Button } from '@acme/components';

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ];
};

export default function Index() {
  return (
    <div className="flex flex-col h-screen w-screen items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to Remix!</h1>
      <Button>It works with your buttons</Button>
    </div>
  );
}
