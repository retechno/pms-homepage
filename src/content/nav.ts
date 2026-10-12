export interface NavLink {
  label: string
  href: string
  note?: string
}

export const productLinks: NavLink[] = [
  { label: 'Front office and reservations', href: '#front-office', note: 'Bookings, rates, check-in, folios' },
  { label: 'Housekeeping', href: '#housekeeping', note: 'Room status and tasks on the phone' },
  { label: 'Accounting and tax', href: '#accounting', note: 'Ledger, payables, bank, PPN, faktur pajak' },
  { label: 'Reports', href: '#reports', note: 'Daily figures, CSV and PDF' },
  { label: 'How the modules connect', href: '#connected', note: 'One charge, from folio to tax return' },
  { label: 'On the roadmap', href: '#roadmap', note: 'POS, inventory, banquet' },
]

export const mainLinks: NavLink[] = [
  { label: 'Who it’s for', href: '#who' },
  { label: 'Integrations', href: '#integrations' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
]

/** Sections that belong to the Product menu, for the active state of its button. */
export const productSectionIds = productLinks.map((l) => l.href.slice(1))
