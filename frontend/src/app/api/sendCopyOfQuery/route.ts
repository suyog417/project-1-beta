import { render } from "@react-email/components";
import { Resend } from "resend";
import { AdminQueryFormTemplate } from "@/components/email-templates/query-template-admin";
import { UserQueryConfirmationTemplate } from "@/components/email-templates/query-template-user";

const resend = new Resend("re_JfqbH75Q_28bh3817xzT5kapYTo23owpW");
const adminEmail = "suyogbhoye1474@gmail.com";

export async function POST(req: Request, res: Response) {
  try {
    const { name,
      email,
      query } =
      await req.json();

    // Send email to user
    const userEmailResponse = await resend.emails.send({
      from: "Get2Act <noreply@get2act.in>",
      to: [email],
      subject: "Thanks for choosing Get2Act.",
      html: await render(
        UserQueryConfirmationTemplate({
          name,
          query
        }),
      ),
    });

    // Send email to admin
    const adminEmailResponse = await resend.emails.send({
      from: "Get2Act <noreply@get2act.in>",
      to: [adminEmail],
      subject: "New Query Form Submission.",
      html: await render(
        AdminQueryFormTemplate({
          name,email,query
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
