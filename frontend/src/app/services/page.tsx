import { Metadata } from "next";
import ServicesPage from "./services-client";

export const metadata: Metadata = {
  title: "Our Services | Get2Act",
  description: "Explore our comprehensive suite of actuarial services including Product Pricing, Reserving, RBC, Embedded Value, and Data Analytics.",
};

export default function Page() {
  return <ServicesPage />;
}
