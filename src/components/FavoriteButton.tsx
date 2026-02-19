"use client";

import { useCallback, useSyncExternalStore } from "react";

const STORAGE_KEY = "favorites";

function getFavorites(): number[] {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

function subscribe(callback: () => void) {
  const handler = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) callback();
  };
  window.addEventListener("storage", handler);
  return () => window.removeEventListener("storage", handler);
}

interface FavoriteButtonProps {
  userId: number;
}

export function FavoriteButton({ userId }: FavoriteButtonProps) {
  const isFavorite = useSyncExternalStore(
    subscribe,
    () => getFavorites().includes(userId),
    () => false
  );

  const toggle = useCallback(() => {
    const favorites = getFavorites();
    const index = favorites.indexOf(userId);

    if (index !== -1) {
      favorites.splice(index, 1);
    } else {
      favorites.push(userId);
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    window.dispatchEvent(
      new StorageEvent("storage", { key: STORAGE_KEY })
    );
  }, [userId]);

  return (
    <button
      onClick={toggle}
      className="shrink-0 cursor-pointer rounded-md border border-zinc-200 px-3 py-1.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      {isFavorite ? "★ In favorites" : "☆ Add to favorites"}
    </button>
  );
}
