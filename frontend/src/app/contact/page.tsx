import { Metadata } from "next";
import ContactPage from "./contact-client";

export const metadata: Metadata = {
  title: "Contact Us | Get2Act",
  description: "Get in touch with Get2Act for expert actuarial advice, risk modelling, and financial valuations.",
};

export default function Page() {
  return <ContactPage />;
}
