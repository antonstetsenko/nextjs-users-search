"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition, useState, useDeferredValue, useRef, useCallback, useEffect } from "react";

const DEBOUNCE_MS = 300;

export function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const paramValue = searchParams.get("search") ?? "";
  const [value, setValue] = useState(paramValue);
  const deferredParam = useDeferredValue(paramValue);

  if (deferredParam !== value && !isPending) {
    setValue(deferredParam);
  }

  const navigate = useCallback(
    (newValue: string) => {
      startTransition(() => {
        const params = new URLSearchParams(searchParams.toString());
        if (newValue) {
          params.set("search", newValue);
        } else {
          params.delete("search");
        }
        router.replace(`?${params.toString()}`);
      });
    },
    [router, searchParams, startTransition]
  );

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newValue = e.target.value;
    setValue(newValue);

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => navigate(newValue), DEBOUNCE_MS);
  }

  return (
    <div className="relative w-full">
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="Search by name or email..."
        className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 placeholder-zinc-400 shadow-sm transition-colors focus:border-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-200 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder-zinc-500 dark:focus:border-zinc-500 dark:focus:ring-zinc-800"
      />
      {isPending && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-zinc-300 border-t-zinc-600 dark:border-zinc-600 dark:border-t-zinc-300" />
        </div>
      )}
    </div>
  );
}
