import { ButtonLink } from "@/components/button-link";
import { MobileMenu } from "@/components/mobile-menu";
import { DesktopNav } from "@/components/nav-links";
import { ThemeCycleButton } from "@/components/theme-toggle";
import { Wordmark } from "@/components/wordmark";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/85 backdrop-blur-md supports-[not(backdrop-filter:blur(0))]:bg-bg">
      <div className="container-site flex min-h-16 items-center justify-between gap-3">
        <Wordmark />
        <DesktopNav />
        <div className="flex items-center gap-2">
          <div className="hidden md:block">
            <ThemeCycleButton />
          </div>
          <ButtonLink href="/contact" size="sm">
            Get in touch
          </ButtonLink>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
