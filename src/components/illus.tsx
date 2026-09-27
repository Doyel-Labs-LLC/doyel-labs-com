/**
 * Illustration system (PROMPT.md §7). One style across the site: off-white
 * 1.5px linework, a single flat cyan fill at low opacity, no faces, no
 * gradients. Inline SVG so it inherits theme tokens and costs no request.
 *
 * Usage: <Illus name="call" className="max-w-md" />
 */
import type { SVGProps } from "react";

export type IllusName =
  | "call"
  | "answer"
  | "three-days"
  | "keys"
  | "care"
  | "scope"
  | "flow"
  | "casper"
  | "lock"
  | "lost";

const TITLES: Record<IllusName, string> = {
  call: "A person at a desk, on the phone, seen from behind",
  answer: "A hand picking up a telephone handset",
  "three-days": "A three-day calendar strip with the third day marked",
  keys: "A key beside a folder of files",
  care: "A shield with a wrench across it",
  scope: "A one-page document with a signature line",
  flow: "Boxes connected by arrows, a simple workflow",
  casper: "A line drawing of plains and a mountain ridge",
  lock: "A padlock over a web page",
  lost: "An empty road sign at a fork",
};

export function Illus({
  name,
  className = "",
  decorative = false,
  ...rest
}: { name: IllusName; className?: string; decorative?: boolean } & Omit<SVGProps<SVGSVGElement>, "name">) {
  const Body = ART[name];
  return (
    <svg
      viewBox="0 0 400 300"
      className={`illus ${className}`}
      role={decorative ? undefined : "img"}
      aria-hidden={decorative ? "true" : undefined}
      aria-label={decorative ? undefined : TITLES[name]}
      focusable="false"
      {...rest}
    >
      {!decorative ? <title>{TITLES[name]}</title> : null}
      <Body />
    </svg>
  );
}

const ART: Record<IllusName, () => React.JSX.Element> = {
  call: () => (
    <>
      {/* desk */}
      <path className="fill" d="M40 236h320v10H40z" />
      <path className="line" d="M40 236h320M60 246v30M340 246v30" />
      {/* monitor */}
      <rect className="paper" x="212" y="112" width="120" height="78" rx="4" /><rect className="fill" x="212" y="112" width="120" height="78" rx="4" />
      <path className="line" d="M212 112h120v78H212zM272 190v18M250 208h44M220 128h60M220 140h84M220 152h48" />
      {/* person from behind: head, shoulders, arm to ear */}
      <path className="line" d="M150 136a24 24 0 1 0 0.1 0" />
      <path className="line" d="M92 236c0-42 24-64 58-64s58 22 58 64" />
      <path className="line" d="M186 190c14 6 22 18 22 30" />
      {/* handset at ear */}
      <path className="line accent" d="M176 128c6-6 14-6 18 0l6 8c3 4 2 10-2 13l-4 3c-4 3-10 2-13-2l-8-9c-3-4-3-9 3-13z" />
      {/* notebook */}
      <path className="warm" d="M64 210h56l6 26H70z" />
      <path className="line" d="M64 210h56l6 26H70zM76 218h34M78 226h30" />
      {/* mug */}
      <path className="warm" d="M300 214h22v22h-22z" /><path className="line" d="M300 214h22v22h-22zM322 220h6a4 4 0 0 1 0 10h-6" />
      {/* signal arcs */}
      <path className="line accent" d="M214 92c8-8 20-8 28 0M222 100c4-4 10-4 14 0" />
    </>
  ),
  answer: () => (
    <>
      {/* handset */}
      <path className="fill" d="M120 96c30-30 60-30 84-6l14 14c8 8 8 18 0 26l-14 14-30-30 10-10-22-22-10 10-30-30z" />
      <path className="line" d="M118 98c30-30 62-30 86-6l14 14c8 8 8 18 0 26l-14 14-30-30 10-10-22-22-10 10-30-30 6-6z" />
      <path className="line" d="M112 104c-6 30 10 70 46 106s76 52 106 46" />
      <path className="line" d="M232 230l14-14c8-8 18-8 26 0l14 14c8 8 8 18 0 26l-6 6" />
      {/* hand */}
      <path className="line" d="M180 262c-20 0-36-10-42-26l-8-22c-3-8 6-14 12-8l14 16" />
      <path className="line" d="M156 214l-6-30c-2-8 8-12 12-4l10 26M172 206l-2-34c0-8 10-9 12-1l4 32M188 208l2-30c0-8 10-8 12 0l0 30" />
      {/* rings */}
      <circle className="warm" cx="280" cy="92" r="6" /><path className="line accent" d="M262 84c10-10 26-10 36 0M270 96c6-6 14-6 20 0M254 72c14-14 38-14 52 0" />
    </>
  ),
  "three-days": () => (
    <>
      {/* calendar */}
      <rect className="line" x="40" y="70" width="320" height="180" rx="6" />
      <path className="line" d="M40 110h320M100 70v-14M300 70v-14" />
      {/* three columns */}
      <path className="line" d="M146 110v140M254 110v140" />
      {/* day labels */}
      <path className="line" d="M78 92h30M186 92h30M292 92h30" />
      {/* day 1 content: content in */}
      <path className="line" d="M64 140h58M64 156h44M64 172h50" />
      {/* day 2: build */}
      <rect className="fill" x="166" y="134" width="70" height="46" rx="3" />
      <path className="line" d="M166 134h70v46h-70zM176 148h50M176 162h34" />
      {/* day 3: live */}
      <circle className="warm" cx="307" cy="166" r="30" />
      <path className="line accent" d="M291 166l11 11 22-24" />
      <circle className="line accent" cx="307" cy="166" r="30" />
      <path className="line" d="M280 226h54" />
    </>
  ),
  keys: () => (
    <>
      {/* folder */}
      <path className="warm" d="M60 110h70l16 16h134v104H60z" />
      <path className="line" d="M60 110h70l16 16h134v104H60zM60 150h220" />
      {/* documents peeking */}
      <path className="line" d="M90 176h100M90 192h140M90 208h80" />
      {/* key */}
      <circle className="line accent" cx="318" cy="96" r="26" />
      <circle className="line" cx="318" cy="96" r="9" />
      <path className="line accent" d="M300 114l-70 70M244 170l10 10M258 156l10 10" />
    </>
  ),
  care: () => (
    <>
      {/* shield */}
      <path className="paper" d="M200 40l100 30v70c0 60-44 104-100 124-56-20-100-64-100-124V70z" /><path className="fill" d="M200 40l100 30v70c0 60-44 104-100 124-56-20-100-64-100-124V70z" />
      <path className="line" d="M200 40l100 30v70c0 60-44 104-100 124-56-20-100-64-100-124V70z" />
      {/* wrench */}
      <path className="line accent" d="M244 106a22 22 0 0 0-30 24l-58 58a10 10 0 0 0 14 14l58-58a22 22 0 0 0 24-30l-14 14-12-2-2-12z" />
      {/* heartbeat line */}
      <path className="line" d="M124 214h30l10-20 14 40 12-26 8 6h28" />
    </>
  ),
  scope: () => (
    <>
      {/* page */}
      <path className="paper" d="M110 40h140l40 40v180H110z" />
      <path className="line" d="M110 40h140l40 40v180H110zM250 40v40h40" />
      {/* lines */}
      <path className="line" d="M134 100h96M134 120h132M134 140h110M134 160h132M134 180h80" />
      {/* price box */}
      <rect className="warm" x="134" y="196" width="72" height="24" rx="3" /><rect className="line accent" x="134" y="196" width="72" height="24" rx="3" />
      <path className="line accent" d="M146 208h48" />
      {/* signature */}
      <path className="line accent" d="M134 244c10-14 18-6 24 0s14 10 22-2 14-4 18 0 10 2 16-4" />
      <path className="line" d="M134 252h132" />
    </>
  ),
  flow: () => (
    <>
      <rect className="fill" x="40" y="60" width="96" height="52" rx="4" />
      <rect className="line" x="40" y="60" width="96" height="52" rx="4" />
      <rect className="line" x="152" y="60" width="96" height="52" rx="4" />
      <rect className="fill" x="264" y="60" width="96" height="52" rx="4" />
      <rect className="line" x="264" y="60" width="96" height="52" rx="4" />
      <path className="line" d="M136 86h16M248 86h16" />
      <path className="line" d="M88 112v40M200 112v40M312 112v40" />
      <rect className="line" x="100" y="152" width="200" height="60" rx="4" />
      <path className="line" d="M124 172h60M124 190h100M216 172h60" />
      <path className="line accent" d="M200 212v40" />
      <circle className="dot" cx="200" cy="260" r="6" />
      <path className="line" d="M56 78h60M56 94h40M168 78h60M168 94h44M280 78h60M280 94h30" />
    </>
  ),
  casper: () => (
    <>
      {/* sky line */}
      <path className="line" d="M20 178c40-32 70-56 110-56 34 0 50 20 76 20 34 0 62-44 104-44 30 0 50 16 70 30" />
      <path className="fill" d="M20 178c40-32 70-56 110-56 34 0 50 20 76 20 34 0 62-44 104-44 30 0 50 16 70 30v90H20z" />
      {/* plains */}
      <path className="line" d="M20 218h360M20 240c60-10 120-10 180 0s120 10 180 0" />
      {/* town marks */}
      <path className="line" d="M150 218v-26h14v26M170 218v-40h10v40M186 218v-20h12v20" />
      <path className="line accent" d="M176 178v-12" />
      {/* sun */}
      <circle className="warm" cx="318" cy="66" r="18" /><circle className="line accent" cx="318" cy="66" r="18" />
      {/* road */}
      <path className="line" d="M200 260c-10-10-20-24-40-42M200 260c10-10 20-24 40-42" />
    </>
  ),
  lock: () => (
    <>
      {/* browser page */}
      <rect className="paper" x="40" y="50" width="320" height="200" rx="6" /><rect className="line" x="40" y="50" width="320" height="200" rx="6" />
      <path className="line" d="M40 80h320" />
      <circle className="dot" cx="58" cy="65" r="3" />
      <circle className="dot" cx="72" cy="65" r="3" />
      <circle className="dot" cx="86" cy="65" r="3" />
      <path className="line" d="M64 116h120M64 136h180M64 156h140M64 176h100M64 196h160" />
      {/* padlock */}
      <path className="fill" d="M258 160h84v64h-84z" />
      <path className="line" d="M258 160h84v64h-84z" />
      <path className="line accent" d="M276 160v-22a24 24 0 0 1 48 0v22" />
      <circle className="line" cx="300" cy="188" r="7" />
      <path className="line" d="M300 195v12" />
    </>
  ),
  lost: () => (
    <>
      {/* road fork */}
      <path className="line" d="M200 270c0-60-40-100-100-130M200 270c0-60 40-100 100-130M200 270v-10" />
      {/* post */}
      <path className="line" d="M200 250V110" />
      <path className="warm" d="M200 118h84l16 14-16 14h-84zM200 158h-84l-16 14 16 14h84z" />
      <path className="line" d="M200 118h84l16 14-16 14h-84zM200 158h-84l-16 14 16 14h84z" />
      <path className="line" d="M216 132h44M124 172h44" />
      {/* horizon */}
      <path className="line" d="M20 210h60M320 210h60" />
      <circle className="line accent" cx="200" cy="72" r="14" />
      <path className="line accent" d="M200 92v10M196 64h8M200 60v8" />
    </>
  ),
};
