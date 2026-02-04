import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>

      <div>Hello from the index page</div>
      <Link href="/test" > Go to test </Link>
    </>
  );
}
