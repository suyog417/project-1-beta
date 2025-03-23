import { render } from "@react-email/components";
import { Resend } from "resend";
import { AdminEnrollmentFormTemplate } from "@/components/email-templates/enrollment-form-admin-template";
import { EnrollmentFormTemplate } from "@/components/email-templates/enrollment-form-template";

const resend = new Resend("re_JfqbH75Q_28bh3817xzT5kapYTo23owpW");
const adminEmail = "noreply@gettoact.onmicrosoft.com";

export async function POST(req: Request, res: Response) {
  try {
    const { name,
      email,
      phone,
      city,
      courseType } =
      await req.json();

    // Send email to user
    const userEmailResponse = await resend.emails.send({
      from: "Get2Act <noreply@get2act.in>",
      to: [email],
      subject: "Thanks for choosing Get2Act.",
      html: await render(
        EnrollmentFormTemplate({
          name,
          email,
          phone,
          city,
          courseType,
        }),
      ),
    });

    // Send email to admin
    const adminEmailResponse = await resend.emails.send({
      from: "Get2Act <noreply@get2act.in>",
      to: [adminEmail],
      subject: "New Contact Form Submission.",
      html: await render(
        AdminEnrollmentFormTemplate({
          name,
          email,
          phone,
          city,
          courseType,
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
