import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { globals } from "~/globals";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

export const links = () => {
  return [{ rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" }];
};

export default function App() {
  return (
    <html lang="en" style={{ height: "100%" }}>
      <head>
        <Meta />
        <Links />
      </head>
      <body
        style={{ backgroundColor: globals.theme.colors.sand2, fontFamily: "Inter", height: "100%" }}
      >
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
