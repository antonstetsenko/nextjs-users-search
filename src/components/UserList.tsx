import { User } from "@/lib/types";
import { FavoriteButton } from "./FavoriteButton";

interface UserListProps {
  users: User[];
}

export function UserList({ users }: UserListProps) {
  if (users.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-zinc-500 dark:text-zinc-400">
        No users found.
      </p>
    );
  }

  return (
    <ul className="divide-y divide-zinc-100 dark:divide-zinc-800">
      {users.map((user) => (
        <li
          key={user.id}
          className="flex items-center justify-between gap-4 py-4"
        >
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-zinc-900 dark:text-zinc-100">
              {user.name}
            </p>
            <p className="truncate text-sm text-zinc-500 dark:text-zinc-400">
              {user.email}
            </p>
          </div>
          <FavoriteButton userId={user.id} />
        </li>
      ))}
    </ul>
  );
}
