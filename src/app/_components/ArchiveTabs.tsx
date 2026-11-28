import type { ReactNode } from 'react'
import { ARCHIVE_TABS } from '@/lib/archive'

interface ArchiveTabsProps {
  /** Content of the BCZ YapZ tab, the only one live today. */
  children: ReactNode
}

export function ArchiveTabs({ children }: ArchiveTabsProps) {
  return (
    <section className="bg-[#0a1628]">
      <div className="mx-auto max-w-4xl px-4 pt-12 sm:px-6 lg:px-0">
        <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f5a623]">
          The archive
        </h2>
        <div
          role="tablist"
          aria-label="Archive"
          className="-mx-4 mt-3 flex gap-1 overflow-x-auto border-b border-white/10 px-4 sm:mx-0 sm:px-0"
        >
          {ARCHIVE_TABS.map((tab) =>
            tab.ready ? (
              <span
                key={tab.id}
                role="tab"
                aria-selected="true"
                className="-mb-px whitespace-nowrap border-b-2 border-[#f5a623] px-4 py-2.5 text-sm font-semibold text-white"
              >
                {tab.label}
              </span>
            ) : (
              <span
                key={tab.id}
                role="tab"
                aria-selected="false"
                aria-disabled="true"
                title="Coming soon"
                className="-mb-px inline-flex items-center gap-1.5 whitespace-nowrap border-b-2 border-transparent px-4 py-2.5 text-sm text-white/40"
              >
                {tab.label}
                <span className="rounded-full border border-white/15 px-1.5 py-px text-[10px] uppercase tracking-wider text-white/40">
                  Soon
                </span>
              </span>
            )
          )}
        </div>
      </div>
      <div role="tabpanel" aria-label="BCZ YapZ">
        {children}
      </div>
    </section>
  )
}
