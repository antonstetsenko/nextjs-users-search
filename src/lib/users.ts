import { User } from "./types";

const users: User[] = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com" },
  { id: 2, name: "Bob Smith", email: "bob@example.com" },
  { id: 3, name: "Charlie Brown", email: "charlie@example.com" },
  { id: 4, name: "Diana Prince", email: "diana@example.com" },
  { id: 5, name: "Edward Norton", email: "edward@example.com" },
  { id: 6, name: "Fiona Apple", email: "fiona@example.com" },
  { id: 7, name: "George Lucas", email: "george@example.com" },
  { id: 8, name: "Hannah Montana", email: "hannah@example.com" },
  { id: 9, name: "Ivan Drago", email: "ivan@example.com" },
  { id: 10, name: "Julia Roberts", email: "julia@example.com" },
];

const SIMULATED_DELAY_MS = 1000;

export async function getUsers(search?: string): Promise<User[]> {
  await new Promise((resolve) => setTimeout(resolve, SIMULATED_DELAY_MS));

  if (!search) return users;

  const query = search.toLowerCase();
  return users.filter(
    (user) =>
      user.name.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query)
  );
}
