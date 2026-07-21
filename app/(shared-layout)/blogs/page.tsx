import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import { Metadata } from "next";
import { cacheLife, cacheTag } from "next/cache";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

// export const dynamic = "force-static";
// export const revalidate = 30;

export const metadata: Metadata = {
  title: "Blog | Next.js 16 Project",
  description: "Read our latest articles and insights",
  category: "Blog",
  authors: [{ name: "Saeed Ghahremanzadeh" }],
};

export default function blogsPage() {
  return (
    <div className="py-12">
      <div className="text-center pb-12">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          Our Blog
        </h1>
        <p className="pt-4 max-w-2xl mx-auto text-xl text-muted-foreground">
          Insights, thoughts and trends from our team!
        </p>
      </div>
      {/* <Suspense fallback={<SekeletonLoadingUi />}> */}
      <LoadBlogsList />
      {/* </Suspense> */}
    </div>
  );
}

async function LoadBlogsList() {
  "use cache";
  cacheLife("hours");
  cacheTag("blogs");
  const data = await fetchQuery(api.posts.getPosts);
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {data?.map((post) => (
        <Card key={post._id} className="pt-0">
          <div className="relative h-48 w-full overflow-hidden">
            <Image
              src={
                post.imageUrl ??
                "https://honorable-grasshopper-84.convex.cloud/api/storage/9dcaa517-9ad7-4df3-8ed8-39f1b025df3b"
              }
              alt="Lana Rhoades"
              fill
              className="rounded-t-lg object-cover object-top transition-[object-position] duration-700 ease-in-out
         hover:object-bottom"
            />
          </div>
          <CardContent>
            <Link href={`/blogs/${post._id}`}>
              <h1 className="text-2xl font-bold hover:text-primary">
                {post.title}
              </h1>
            </Link>
            <p className="text-muted-foreground line-clamp-3">{post.body}</p>
          </CardContent>
          <CardFooter>
            <Link
              href={`/blogs/${post._id}`}
              className={buttonVariants({
                className: "w-full",
              })}
            >
              Read more
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

function SekeletonLoadingUi() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="flex flex-col space-y-3">
          <Skeleton className="h-48 w-full rounded-xl" />
          <div className="space-y-2 flex flex-col">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
      ))}
    </div>
  );
}
