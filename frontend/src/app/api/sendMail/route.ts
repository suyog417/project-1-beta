import { render } from "@react-email/components";
import { Resend } from "resend";
import { EmailTemplate } from "@/components/email-template";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request, res:Response) {
  try {
    const { companyName, email, message, name, phone, profession } =
      await req.json();

    const { data, error } = await resend.emails.send({
      from: "Get2Act <verifcation@resend.dev>",
      to: [email],
      subject: "New Contact Form Submission",
      html: await render(
        EmailTemplate({ companyName, email, message, name, phone, profession })
      ),
    });

    if (error) {
      return Response.json({ "something went wrong : ": error });
    }
    return Response.json({ message : "Email sent successfully" });
  } catch (error) {
    return Response.json({ error });
  }
}

export {resend}
