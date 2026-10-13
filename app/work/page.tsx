import { PageIntro } from "@/components/page-intro";
import { RoleCard } from "@/components/role-card";
import { roles, workPage } from "@/content/work";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Work",
  description:
    "Four roles, one throughline: Naomi Ahmadu's account management and marketing work with Tilt Collective, DOS Clothing, Smartmark Limited and Rèfainì.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <>
      <PageIntro
        label={workPage.label}
        heading={workPage.heading}
        intro={workPage.intro}
      />
      <div className="container-site flex flex-col gap-16 pb-20 md:gap-24 md:pb-28">
        {roles.map((role, index) => (
          <RoleCard
            key={role.slug}
            role={role}
            flip={index % 2 === 1}
            preload={index === 0}
          />
        ))}
      </div>
    </>
  );
}
