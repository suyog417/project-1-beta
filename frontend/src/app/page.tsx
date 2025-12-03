import { Metadata } from "next";
import HomeClient from "./home-client";

export const metadata: Metadata = {
  title: "Home | Get2Act",
  description: "Empowering insurers with cutting-edge actuarial services and data analytics to navigate the evolving insurance landscape.",
};

export default function Page() {
  return <HomeClient />;
}
