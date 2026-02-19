import { Suspense } from "react";
import { getUsers } from "@/lib/users";
import { SearchInput } from "@/components/SearchInput";
import { UserList } from "@/components/UserList";

interface PageProps {
  searchParams: Promise<{ search?: string }>;
}

async function UsersSection({ search }: { search?: string }) {
  const users = await getUsers(search);
  return <UserList users={users} />;
}

export default async function Home({ searchParams }: PageProps) {
  const { search } = await searchParams;

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-10">
      <h1 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
        Users
      </h1>

      <Suspense fallback={null}>
        <SearchInput />
      </Suspense>

      <div className="mt-4">
        <Suspense
          key={search}
          fallback={
            <div className="flex justify-center py-12">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-zinc-300 border-t-zinc-600 dark:border-zinc-600 dark:border-t-zinc-300" />
            </div>
          }
        >
          <UsersSection search={search} />
        </Suspense>
      </div>
    </div>
  );
}
