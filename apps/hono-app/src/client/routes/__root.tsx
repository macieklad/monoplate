import {
  createRootRoute,
  HeadContent,
  Link,
  Outlet,
  Scripts,
  type NotFoundRouteProps,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { preamble } from "../hmr";

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  head: () => ({
    scripts: [
      ...(import.meta.env.PROD
        ? [
            {
              type: "module",
              src: "/static/client.js",
            },
          ]
        : [
            preamble,
            {
              type: "module",
              src: "/src/entry.client.tsx",
            },
          ]),
    ],
  }),
});

function RootComponent() {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <div className="p-2 flex gap-2 text-lg">
          <Link
            to="/"
            activeProps={{
              className: "font-bold",
            }}
            activeOptions={{ exact: true }}
          >
            Home
          </Link>{" "}
        </div>
        <hr />
        <Outlet />
        <TanStackRouterDevtools position="bottom-right" />
        <Scripts />
      </body>
    </html>
  );
}

function NotFoundComponent(props: NotFoundRouteProps) {
  return (
    <div>
      <h1>404 - Not Found</h1>
    </div>
  );
}
