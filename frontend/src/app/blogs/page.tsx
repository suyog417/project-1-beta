import { Metadata } from "next";
import BlogListing from "./blogs-client";

export const metadata: Metadata = {
  title: "Blogs | Get2Act",
  description: "Stay updated with the latest insights, articles, and trends in actuarial science, insurance, and data analytics.",
};

export default function Page() {
  return <BlogListing />;
}
