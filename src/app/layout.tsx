// Next requires a root layout above src/app/page.tsx (the /en redirect). It only passes children
// through: the real <html> and <body> come from [locale]/layout.tsx.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
