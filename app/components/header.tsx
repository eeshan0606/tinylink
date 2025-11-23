import Link from "next/link";

export default function Header() {
  return (
    <header className="p-4 border-b mb-6 flex justify-between">
      <Link href="/" className="text-2xl font-bold">TinyLink</Link>
      <span className="text-sm text-gray-500">URL Shortener</span>
    </header>
  );
}
