import { Button } from '#/components/client';

export default function Home() {
  return (
    <div className="flex flex-col h-screen w-screen items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to Next!</h1>
      <Button>It works with your buttons</Button>
    </div>
  );
}
