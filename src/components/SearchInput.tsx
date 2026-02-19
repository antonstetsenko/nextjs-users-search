"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useRef } from "react";

const DEBOUNCE_MS = 300;

export function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function updateSearch(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }
    router.replace(`?${params.toString()}`);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => updateSearch(value), DEBOUNCE_MS);
  }

  return (
    <input
      type="text"
      defaultValue={searchParams.get("search") ?? ""}
      onChange={handleChange}
      placeholder="Search by name or email..."
      className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 placeholder-zinc-400 shadow-sm transition-colors focus:border-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-200 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder-zinc-500 dark:focus:border-zinc-500 dark:focus:ring-zinc-800"
    />
  );
}
