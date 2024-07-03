"use client";
import React, { useState } from "react";
import Logo, { LogoMobile } from "./Logo";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "./ui/button";
import { UserButton } from "@clerk/nextjs";
import ThemeSwitcherBtn from "./ThemeSwitcherBtn";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

const Navbar = () => {
  return (
    <>
      <DesktopNavbar />
      <MobileNavbar />
    </>
  );
};

const MobileNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="block border-separate bg-background md:hidden">
      <nav className="container flex items-center justify-between px-8">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant={"ghost"} size={"icon"}>
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent className="w-[400px] sm:w-[540px]" side="left">
            <Logo />
            <div className="flex flex-col gap-1 pt-4">
              {items.map((item) => (
                <NavbarItem
                  key={item.label}
                  link={item.link}
                  label={item.label}
                />
              ))}
            </div>
          </SheetContent>
        </Sheet>
        <div className="flex h-[80px] min-h-[60px] items-center gap-x-4">
            <LogoMobile/>
        </div>
        <div className="flex items-center gap-2">
            <ThemeSwitcherBtn />
            <UserButton afterSwitchSessionUrl="/sign-in"/>
        </div>
      </nav>
    </div>
  );
};

const items = [
  { label: "Dashboard", link: "/" },
  { label: "Transactions", link: "/transactions" },
  { label: "Manage", link: "/manage" },
];

const DesktopNavbar = () => {
  return (
    <div className="hidden border-separate border-b bg-background md:block">
      <nav className="container flex items-center justify-between px-8">
        <div className="flex h-[80px] min-h-[60px] items-center gap-x-4">
          <Logo />
          <div className="flex h-full">
            {items.map((item) => (
              <NavbarItem
                key={item.label}
                link={item.link}
                label={item.label}
              />
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <ThemeSwitcherBtn />
          <UserButton afterSwitchSessionUrl="/sing-in" />
        </div>
      </nav>
    </div>
  );
};

const NavbarItem = ({ link, label }: { link: string; label: string }) => {
  const pathname = usePathname();
  const isActive = pathname === link;

  return (
    <div className="relative flex items-center">
      <Link
        href={link}
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "h-full justify-start text-lg text-muted-foreground hover:text-foreground",
          isActive && "text-foreground"
        )}
      >
        {" "}
        {label}{" "}
      </Link>
      {isActive && (
        <div className="absolute -bottom-[2px] left-1/2 hidden h-[2px] w-[80%] -translate-x-1/2 rounded-xl md:block" />
      )}
    </div>
  );
};

export default Navbar;
