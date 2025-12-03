import { Metadata } from "next";
import AskActuaryPage from "./ask-an-actuary-client";

export const metadata: Metadata = {
  title: "Ask an Actuary | Get2Act",
  description: "Pose your actuarial questions and explore insightful discussions with our experts.",
};

export default function Page() {
  return <AskActuaryPage />;
}
