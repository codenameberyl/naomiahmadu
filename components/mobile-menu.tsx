"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { ButtonLink } from "@/components/button-link";
import { isActive } from "@/components/nav-links";
import { ThemeSegmented } from "@/components/theme-toggle";
import { Wordmark } from "@/components/wordmark";
import { nav, site } from "@/content/site";

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Full-screen menu for small viewports, built on a modal <dialog>:
 * the rest of the page is inert while open, Esc closes it, focus is
 * trapped inside and returned to the Menu button on close, and page
 * scroll is locked.
 */
export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const dialogId = useId();

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const root = document.documentElement;

    if (open && !dialog.open) {
      dialog.showModal();
      root.style.overflow = "hidden";
    } else if (!open && dialog.open) {
      dialog.close();
    }

    return () => {
      root.style.overflow = "";
    };
  }, [open]);

  // Close if the viewport grows past the mobile breakpoint while open.
  useEffect(() => {
    const media = window.matchMedia("(min-width: 48rem)");
    const onChange = () => media.matches && setOpen(false);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  function onDialogClose() {
    setOpen(false);
    document.documentElement.style.overflow = "";
    triggerRef.current?.focus();
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLDialogElement>) {
    if (event.key !== "Tab") return;
    const items = Array.from(
      dialogRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? [],
    );
    if (items.length === 0) return;
    const first = items[0];
    const last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls={dialogId}
        aria-haspopup="dialog"
        onClick={() => setOpen(true)}
        className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-line-strong/70 px-4 text-sm font-semibold text-text transition-colors hover:border-text hover:bg-surface md:hidden"
      >
        Menu
      </button>

      <dialog
        ref={dialogRef}
        id={dialogId}
        aria-label="Site menu"
        onClose={onDialogClose}
        onKeyDown={onKeyDown}
        className="fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none bg-bg p-0 text-text opacity-100 transition-opacity duration-200 backdrop:bg-transparent md:hidden starting:open:opacity-0"
      >
        <div className="container-site flex min-h-full flex-col pb-8">
          <div className="flex min-h-16 items-center justify-between gap-4">
            <Wordmark onNavigate={close} />
            <button
              type="button"
              onClick={close}
              aria-expanded={open}
              aria-controls={dialogId}
              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-line-strong/70 px-4 text-sm font-semibold"
            >
              Close
            </button>
          </div>

          <nav aria-label="Primary" className="mt-6">
            <ul>
              {nav.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <li key={item.href} className="border-b border-line">
                    <Link
                      href={item.href}
                      onNavigate={close}
                      aria-current={pathname === item.href ? "page" : undefined}
                      className="flex min-h-16 items-center justify-between font-display-lg text-[2.25rem] leading-none tracking-[-0.02em]"
                    >
                      {item.label}
                      {active ? (
                        <span
                          aria-hidden="true"
                          className="size-2.5 rounded-full bg-accent"
                        />
                      ) : null}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="mt-auto flex flex-col gap-6 pt-10">
            <ThemeSegmented />
            <ButtonLink href="/contact" arrow onNavigate={close}>
              Get in touch
            </ButtonLink>
            <a
              href={`mailto:${site.email}`}
              className="inline-flex min-h-11 items-center justify-center text-sm text-muted underline underline-offset-4 hover:text-text"
            >
              {site.email}
            </a>
          </div>
        </div>
      </dialog>
    </>
  );
}
