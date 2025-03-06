import { tokenStore } from "../verify-email/route";
import { verificationStatus } from "../verify-email/route";


export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const token = url.searchParams.get("token");
    const email = url.searchParams.get("email");
    const storedToken = tokenStore.get(email as string);

    if (token !== storedToken) {
      return Response.json({ error: "Invalid verification token." }, { status: 400 });
    }
    tokenStore.delete(email as string);
    verificationStatus.set(email as string, true)
    return Response.json({ message: "Email verified successfully." });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Failed to verify email." }, { status: 500 });
  }
}
