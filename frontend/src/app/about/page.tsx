import { Metadata } from "next";
import AboutPage from "./about-client";

export const metadata: Metadata = {
  title: "About Us | Get2Act",
  description: "Learn about Get2Act, our mission, vision, and the team of expert actuaries and data scientists driving innovation in the insurance industry.",
};

export default function Page() {
  return <AboutPage />;
}
