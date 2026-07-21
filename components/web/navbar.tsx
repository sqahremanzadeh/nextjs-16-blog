"use client";

import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { ThemeToggle, ThemeVariantToggle } from "./theme-toggle";
import { useConvexAuth } from "convex/react";
import { Button } from "@base-ui/react/button";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { SearchInput } from "./SearchInput";

export function Navbar() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useConvexAuth();
  return (
    <nav className="w-full py-5 flex items-center justify-between">
      <div className="flex items-center gap-8">
        <Link href="/">
          <h1 className="text-3xl font-bold">
            Next<span className="text-primary">Pro</span>
          </h1>
        </Link>
        <div className="flex items-center gap-2">
          <Link
            className={buttonVariants({
              variant: "ghost",
            })}
            href="/"
          >
            Home
          </Link>
          <Link
            className={buttonVariants({
              variant: "ghost",
            })}
            href="/blogs"
          >
            Blogs
          </Link>
          <Link
            className={buttonVariants({
              variant: "ghost",
            })}
            href="/create"
          >
            Create
          </Link>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="hidden md:block mr-2">
          <SearchInput />
        </div>
        {isLoading ? null : isAuthenticated ? (
          <Button
            className={buttonVariants({
              variant: "secondary",
              className: "cursor-pointer",
            })}
            onClick={() => {
              authClient.signOut({
                fetchOptions: {
                  onSuccess: () => {
                    toast.success("Logged out successfully");
                    router.push("/");
                  },
                  onError: (error: { error: { message?: string } }) => {
                    toast.error(
                      error.error.message ?? "An unexpected error occurred",
                    );
                  },
                },
              });
            }}
          >
            Logout
          </Button>
        ) : (
          <>
            <Link className={buttonVariants()} href="/auth/sign-up">
              Sign up
            </Link>
            <Link
              className={buttonVariants({
                variant: "outline",
              })}
              href="/auth/log-in"
            >
              Log in
            </Link>
          </>
        )}
        <ThemeVariantToggle />
        <ThemeToggle />
      </div>
    </nav>
  );
}
