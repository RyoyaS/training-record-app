import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <Link href="/record/today/">
      <button className="flex justify-center items-center h-32 w-32 rounded-full bg-orange-500 hover:bg-opacity-80">
        <span className="text-xl">記録する</span>
      </button>
    </Link>
  );
}
