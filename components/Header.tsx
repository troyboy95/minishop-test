import Link from "next/link";
import { CartSheet } from "./CartSheet";

export function Header() {
  return (
    <header className="flex justify-between items-center p-4 border-b bg-amber-300">
      <Link href="/" className="text-xl font-bold">Mini Shop</Link>
      <CartSheet />
    </header>
  );
}
