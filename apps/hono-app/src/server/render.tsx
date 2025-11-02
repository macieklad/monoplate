import {
  createRequestHandler,
  RouterServer,
  renderRouterToStream,
} from "@tanstack/react-router/ssr/server";
import { createRouter } from "../client/router";

export function render({ request }: { request: Request }) {
  const handler = createRequestHandler({ request, createRouter });

  return handler(({ request, responseHeaders, router }) =>
    renderRouterToStream({
      request,
      responseHeaders,
      router,
      children: <RouterServer router={router} />,
    })
  );
}
