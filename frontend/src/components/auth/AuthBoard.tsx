import Catistor from "@/components/brand/Catistor";

export default function AuthBoard() {
  return (
    <div className="hidden h-full flex-col items-center justify-center rounded-3xl border border-mercury-ink/10 bg-paper/60 p-10 lg:flex">
      <Catistor className="h-72 w-72" />
      <p className="mt-2 font-serif text-xl text-mercury-ink">Meet Catistor</p>
      <p className="mt-2 max-w-xs text-center font-hand text-xl text-ink-soft">
        Your cat-advocate for revision day. Get your notes in order — he&apos;ll be the judge of the
        rest.
      </p>
    </div>
  );
}
