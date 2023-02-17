import { fetchTokens } from "../lib/prisma";

export default async function Page() {
  const tokens = await fetchTokens();

  return <>
    <h1 className="text-blue-500 font-bold text-xl">Hello acme!</h1>
    <p>Your token list:</p>
    {tokens.map((token, idx) => <p key={idx}>Prefixed: {token.title}</p>)}
  </>;
}
