import { hydrateRoot } from "react-dom/client";
import { RouterClient } from "@tanstack/react-router/ssr/client";
import { createRouter } from "./client/router";

const router = createRouter();

hydrateRoot(document, <RouterClient router={router} />);
