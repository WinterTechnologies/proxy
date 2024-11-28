"use client";

import React, { useEffect, useState } from "react";
import { cn } from "~/lib/cn";

export default function HomePage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [domain, setDomain] = useState("");

  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    setDomain(window.location.hostname);
  }, []);

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInput(e.target.value);
    setOutput(e.target.value.replace("discord.com", domain));
  }

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-4 py-8">
      <h1 className="text-center text-4xl font-semibold">
        Winter Webhook Proxy
      </h1>
      <div className="flex flex-col gap-2">
        <div className="flex flex-row gap-2">
          <div className="w-full">
            <label htmlFor="input" className="font-medium">
              Input URL
            </label>
            <Input
              type="text"
              defaultValue={input}
              onChange={onChange}
              id="input"
              placeholder="Input url"
            />
          </div>
          <div className="w-full">
            <label htmlFor="output" className="font-medium">
              Output URL
            </label>
            <Input
              type="text"
              value={output}
              readOnly
              placeholder="Output url"
              id="output"
            />
          </div>
        </div>
        <button
          onClick={() => {
            setClicked(true);
            window.navigator.clipboard.writeText(output);
            setTimeout(() => {
              setClicked(false);
            }, 2000);
          }}
          className="w-full rounded-md border border-white px-4 py-2 duration-200 hover:bg-white hover:text-black"
        >
          {clicked === false && <>Copy</>}
          {clicked === true && <>Copied!</>}
        </button>
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-semibold">What is this tool?</h2>
        <p>
          This is a webhook proxy for Roblox games to use, as Discord blocks all
          webhooks from Roblox. It&apos;s free and open-source, and also has
          authentication features so that only you can use it. For more info,
          please look at the{" "}
          <a
            href="https://github.com/wintertechnologies/proxy"
            className="underline duration-100 hover:text-neutral-300"
          >
            github repo
          </a>
          .
        </p>
      </div>
    </div>
  );
}

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "border-input placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";
