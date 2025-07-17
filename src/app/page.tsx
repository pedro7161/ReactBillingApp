import { redirect } from "next/navigation";

/**
 * Home component
 *
 * Redirects the user immediately from the root "/" route to "/dashboard".
 *
 * This is a server component that performs a server-side redirect
 * using Next.js's `redirect` function from the app router.
 *
 * @returns {void} Does not render UI; redirects instead.
 */
export default function Home() {
  redirect("/dashboard");
}
