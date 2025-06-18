import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <div>
      <Link
        href="/"
        className="flex flex-row items-center justify-start gap-3 font-bold p-4 h-[50px]"
      >
        <Image
          src={"/systemly-icon-logo.svg"}
          alt="Systemly Logo"
          width={60}
          height={50}
          className="object-contain"
        />
        Systemly
      </Link>
    </div>
  );
}
