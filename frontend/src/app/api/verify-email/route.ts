import { VerificationEmailTemplate } from "@/components/email-templates/verification-email-template";
import { render } from "@react-email/components";
import crypto from "crypto";
import { resend } from "../sendMail/route";

const tokenStore = new Map<string, string>();
const verificationStatus = new Map<string, boolean>();


export async function POST(req: Request, res: Response) {
  try {
    const { email } = await req.json();
    const token = crypto.randomBytes(20).toString("hex");

    console.log(token)


    const {data , error} = await resend.emails.send({
      from: "Get2Act <noreply@updates.get2act.in>",
      to: [email],
      subject: "Verify Your Email",
      html: await render(VerificationEmailTemplate({ email, token })),
    });
    
    if(error){
        return Response.json({ error: "Failed to send verification email." });
    }
    tokenStore.set(email, token);
    verificationStatus.set(email, false);
    setTimeout(() => tokenStore.delete(email), 24 * 60 * 60 * 1000);
    return Response.json({ message: "Verification email sent." });

  } catch (error) {
    console.error(error);
    return Response.json({ error: "Failed to send verification email." });
  }
}

export async function GET(req: Request, res: Response) {
  return new Response(null, {
    status: 405,
    statusText: "Method Not Allowed",
    }
  );
}
export { tokenStore, verificationStatus };
