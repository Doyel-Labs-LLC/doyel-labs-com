import Link from "next/link";
import { Eyebrow, GhostLink, H1, Lead, Page } from "@/components/chrome";

export default function NotFound() {
  return (
    <Page narrow>
      <section className="pt-24 md:pt-32">
        <Eyebrow>404</Eyebrow>
        <H1>That page is not on this site.</H1>
        <Lead>
          The BAI-only pages that used to live at{" "}
          <code className="font-mono text-[15px]">/download</code> and{" "}
          <code className="font-mono text-[15px]">/pricing</code> now live under
          the BAI program at{" "}
          <Link href="/programs/bai/" className="underline">
            /programs/bai
          </Link>
          . If a link brought you here that should not have, tell us.
        </Lead>
        <div className="mt-8 flex flex-wrap gap-3">
          <GhostLink href="/">Company home</GhostLink>
          <GhostLink href="/support/" small>
            Contact support
          </GhostLink>
        </div>
      </section>
    </Page>
  );
}
