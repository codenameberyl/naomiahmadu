import { CopyButton } from "@/components/copy-button";
import { ArrowUpRightIcon } from "@/components/icons";
import { PageIntro } from "@/components/page-intro";
import { contact } from "@/content/contact";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Contact",
  description:
    "Contact Naomi Ahmadu. Currently open to remote and hybrid roles in account management, client services, and brand marketing.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageIntro
        label={contact.label}
        heading={contact.heading}
        intro={contact.intro}
      />

      <div className="container-site pb-20 md:pb-28">
        <ul className="border-b border-line">
          {contact.links.map((link) => (
            <li
              key={link.label}
              className="grid gap-3 border-t border-line py-6 sm:grid-cols-[10rem_1fr_auto] sm:items-center sm:gap-6 md:py-8"
            >
              <span className="label text-muted">{link.label}</span>
              <a
                href={link.href}
                {...(link.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="group inline-flex min-h-11 items-center gap-3 self-start font-display text-[clamp(1.35rem,1.1rem+1.4vw,2.25rem)] leading-tight break-all decoration-accent decoration-2 underline-offset-[6px] hover:underline sm:self-auto sm:break-normal"
              >
                {link.display}
                {link.external ? (
                  <>
                    <ArrowUpRightIcon className="shrink-0 text-accent transition-transform duration-300 ease-out-soft group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    <span className="sr-only">(opens in a new tab)</span>
                  </>
                ) : null}
              </a>
              {link.copyValue ? (
                <div className="sm:justify-self-end">
                  <CopyButton
                    value={link.copyValue}
                    what={
                      link.label === "Email" ? "email address" : "phone number"
                    }
                  />
                </div>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
