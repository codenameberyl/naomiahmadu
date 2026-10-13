import { CopyrightYear } from "@/components/copyright-year";
import { footer } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="container-site flex flex-col gap-3 py-10 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1">
          <p>{footer.line}</p>
          <p>
            © <CopyrightYear /> {footer.copyrightHolder}
          </p>
        </div>
        <a
          href={`mailto:${footer.email}`}
          className="inline-flex min-h-11 items-center self-start text-text underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-accent sm:self-auto"
        >
          {footer.email}
        </a>
      </div>
    </footer>
  );
}
