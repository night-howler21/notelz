import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="bg-mercury-ink px-6 py-14 text-paper sm:px-14">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 sm:flex-row sm:justify-between">
        <div className="max-w-xs">
          <div className="mb-2 font-serif text-2xl">Notelz</div>
          <p className="text-sm text-paper/70">
            No one tells you what to study at the last minute, so we will.
          </p>
        </div>

        <div className="flex flex-wrap gap-12">
          <div>
            <p className="mb-3 text-xs uppercase tracking-widest text-paper/50">Product</p>
            <ul className="flex flex-col gap-2 text-sm text-paper/80">
              <li>
                <a href="#services" className="hover:text-paper">
                  Subject Notes
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-paper">
                  1-1 Video Sessions
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-paper">
                  Find Tutors
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-paper">
                  Last-Minute Revision
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="mb-3 text-xs uppercase tracking-widest text-paper/50">Account</p>
            <ul className="flex flex-col gap-2 text-sm text-paper/80">
              <li>
                <Link href="/login" className="hover:text-paper">
                  Log In
                </Link>
              </li>
              <li>
                <Link href="/signup" className="hover:text-paper">
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-6xl border-t border-paper/15 pt-6 text-xs text-paper/50">
        &copy; 2026 Notelz. All rights reserved.
      </div>
    </footer>
  );
}
