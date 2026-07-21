"use client";

import * as React from "react";
import { Moon, Palette, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useThemeVariant } from "@/components/ui/theme-provider";

const themeVariantOptions = [
  { value: "default", label: "Default" },
  { value: "sage", label: "Sage" },
  { value: "sunset", label: "Sunset" },
] as const;

export function ThemeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={buttonVariants({
          variant: "outline",
          size: "icon",
          className: "cursor-pointer",
        })}
      >
        <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
        <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
        <span className="sr-only">Toggle theme mode</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => setTheme("light")}
        >
          Light
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => setTheme("dark")}
        >
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => setTheme("system")}
        >
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function ThemeVariantToggle() {
  const { variant, setVariant } = useThemeVariant();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={buttonVariants({
          variant: "outline",
          size: "icon",
          className: "cursor-pointer",
        })}
      >
        <Palette className="h-[1.2rem] w-[1.2rem]" />
        <span className="sr-only">Select theme variant</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {themeVariantOptions.map((option) => (
          <DropdownMenuItem
            key={option.value}
            className="cursor-pointer"
            onClick={() => setVariant(option.value)}
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
