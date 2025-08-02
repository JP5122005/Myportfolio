import React from "react";
import { createClient } from "@/utils/static-client";
import Link from "next/link";
import { PrismicNextLink } from "@/components/StaticComponents";
import NavBar from "./NavBar";

export default async function Header() {
  const client = createClient();
  const settings = await client.getSingle("settings");
  return (
    <header className="top-0 mx-auto z-50 max-w-7xl md:sticky md:top-4">
      <NavBar settings={settings} />
    </header>
  );
}
