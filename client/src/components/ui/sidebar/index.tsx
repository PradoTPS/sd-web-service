import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Dices, Home, Notebook, PanelBottom, User } from "lucide-react";
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from "@radix-ui/react-tooltip";

export function Sidebar() {
  return (
    <div className="flex w-full flex-col bg-muted/40">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 border-r bg-background sm:flex">
        <nav className="flex flex-col item-center gap-4 px-2 py-5">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href="/" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground">
                  <Home className="h-5 w-5"/>
                  <span className="sr-only">Início</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Início</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Link href="/boardgames" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground">
                  <Dices className="h-5 w-5"/>
                  <span className="sr-only">Board Games</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Board Games</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Link href="/players" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground">
                  <User className="h-5 w-5"/>
                  <span className="sr-only">Jogadores</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Jogadores</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Link href="/lists" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground">
                  <Notebook className="h-5 w-5"/>
                  <span className="sr-only">Listas</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Listas</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
      </aside>
      <div className="sm:hidden flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center px-4 border-b bg-background gap-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <PanelBottom className="h-5 w-5" />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>

            <SheetContent side="left" className="sm:max-w-x py-6">
              <nav className="grid gap-6 text-lg font-medium pl-4">
                <Link href="/" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground" prefetch={false}>
                  <Home className="h-5 w-5 transition-all"/>
                  Início
                </Link>

                <Link href="/boardgames" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground" prefetch={false}>
                  <Dices className="h-5 w-5 transition-all"/>
                  Board Games
                </Link>

                <Link href="/players" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground" prefetch={false}>
                  <User className="h-5 w-5 transition-all"/>
                  Jogadores
                </Link>

                <Link href="/lists" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground" prefetch={false}>
                  <Notebook className="h-5 w-5 transition-all"/>
                  Listas
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <h2>Menu</h2>
        </header>
      </div>
    </div>
  );
}