import { Metadata } from "next";
import Get2LearnPage from "./get2learn-client";

export const metadata: Metadata = {
  title: "Get2Learn | Actuarial Training",
  description: "Start your career with Get2Learn. Comprehensive training programs in Actuarial Modelling, Pricing, Valuation, and Data Analytics.",
};

export default function Page() {
  return <Get2LearnPage />;
}
