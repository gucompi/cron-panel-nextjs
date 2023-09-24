import Main from "@/components/Dashboard/Main";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CronAdmin | Next.js ",
  description: "",
  // other metadata
};

export default function Home() {
  return (
    <>
      <Main />
    </>
  );
}
