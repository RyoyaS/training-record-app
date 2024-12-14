
import { Dumbbell, User } from 'lucide-react';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-[#2a2a2a] p-4 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Link href="/">
            <Dumbbell className="w-8 h-8 text-orange-500" />
            <h1 className="text-2xl font-bold">FitFusion</h1>
          </Link>
        </div>
        <button className="p-2 rounded-full bg-[#333] hover:bg-[#444]">
          <User className="w-6 h-6" />
        </button>
      </div>
    </header>
  )
}