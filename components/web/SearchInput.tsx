import { api } from "@/convex/_generated/api";
import { Input } from "@base-ui/react/input";
import { useQuery } from "convex/react";
import { Loader2, Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function SearchInput() {
  const [term, setTerm] = useState("");
  const [open, setOpen] = useState(false);

  const results = useQuery(
    api.posts.searchPosts,
    term.length >= 2 ? { limit: 5, term: term } : "skip",
  );

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setTerm(event.target.value);
    setOpen(true);
  }
  return (
    <div className="relative w-full max-w-sm z-10">
      <div className="relative">
        <Search className="absolute left-1 top-1 size-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search Posts..."
          className="w-full pl-6 bg-background"
          value={term}
          onChange={handleInputChange}
        />
      </div>
      {open && term.length >= 2 && (
        <div className="absolute w-full top-full mt-2 rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in fade-in-0 zoom-in-95">
          {results === undefined ? (
            <div className="flex items-center justify-center p-4 text-sm text-muted-foreground">
              <Loader2 className="animate-spin mr-2 size-4" />
              Searching...
            </div>
          ) : results.length === 0 ? (
            <p className="p-4 text-sm text-muted-foreground text-center">
              No results found!
            </p>
          ) : (
            <div className="p-y-1 w-full rounded-md overflow-hidden">
              {results.map((result) => (
                <Link
                  onClick={() => {
                    setOpen(false);
                    setTerm("");
                  }}
                  className="flex flex-col px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground cursor-pointer"
                  href={`/blogs/${result._id}`}
                  key={result._id}
                >
                  <p className="font-medium truncate">{result.title}</p>
                  <p className="text-xs pt-1 text-muted-foreground text-wrap wrap-break-word">
                    {result.body.substring(0, 60)}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
