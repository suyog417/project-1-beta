import { render } from "@react-email/components";
import { Resend } from "resend";
import { AdminEmailTemplate } from "@/components/admin-mail-template";
import { EmailTemplate } from "@/components/email-template";

const resend = new Resend("re_JfqbH75Q_28bh3817xzT5kapYTo23owpW");
const adminEmail = "noreply@gettoact.onmicrosoft.com";

export async function POST(req: Request, res: Response) {
  try {
    const { companyName, email, message, name, phone, profession } =
      await req.json();

    // Send email to user
    const userEmailResponse = await resend.emails.send({
      from: "Get2Act <noreply@get2act.in>",
      to: [email],
      subject: "Thanks for choosing Get2Act.",
      html: await render(
        EmailTemplate({
          companyName,
          email,
          message,
          name,
          phone,
          profession,
        }),
      ),
    });

    // Send email to admin
    const adminEmailResponse = await resend.emails.send({
      from: "Get2Act <noreply@get2act.in>",
      to: [adminEmail],
      subject: "New Contact Form Submission.",
      html: await render(
        AdminEmailTemplate({
          companyName,
          email,
          message,
          name,
          phone,
          profession,
        }),
      ),
    });

    if (userEmailResponse.error || adminEmailResponse.error) {
      return Response.json({
        "something went wrong : ":
          userEmailResponse.error || adminEmailResponse.error,
      });
    }

    return Response.json({ message: "Emails sent successfully" });
  } catch (error) {
    return Response.json({ error });
  }
}

export { resend };
