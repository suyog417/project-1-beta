import { render } from "@react-email/components";
import { Resend } from "resend";
import { EmailTemplate } from "@/components/email-template";
import { AdminEmailTemplate } from "@/components/admin-mail-template";

const resend = new Resend("re_JfqbH75Q_28bh3817xzT5kapYTo23owpW");

export async function POST(req: Request, res:Response) {
  try {
    const { companyName, email, message, name, phone, profession } =
      await req.json();

    // const { data, error } = await resend.emails.send({
    //   from: "Get2Act <noreply@updates.get2act.in>",
    //   to: [email],
    //   subject: "Thanks for choosing Get2Act.",
    //   html: await render(
    //     EmailTemplate({ companyName, email, message, name, phone, profession })
    //   ),
    // });
    const { data, error } = await resend.emails.send({
      from: "Get2Act <noreply@get2act.in>",
      to: [email],
      subject: "New Contact Form Submission.",
      html: await render(
        AdminEmailTemplate({ companyName, email, message, name, phone, profession})
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
