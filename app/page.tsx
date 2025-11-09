"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import TextField from "../components/text-field/text-field";

export default function Home() {
  const [nama, setNama] = useState("");

  return (
    <div>
      <main>
        <div>
          <h1>
            To get started, edit the page.tsx file.
          </h1>
          <p>
            Looking for a starting point or more instructions? Head over to{" "}
            <a
              href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            >
              Templates
            </a>{" "}
            or the{" "}
            <a
              href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            >
              Learning
            </a>{" "}
            center.
          </p>
        </div>
        <div>
          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Deploy Now
          </a>
          <a
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
          <Link href="/admin">
            <button className="button button--neutral button--md">Primary Action</button>
          </Link>
          <button className="button button--secondary">Secondary Action</button>
          <div className="chip">Example Azza</div>
          <div>
            <TextField
              label="Nama Lengkap"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              helperText="Wajib diisi"
              maxLength={50}
              required
              mode="rest"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
