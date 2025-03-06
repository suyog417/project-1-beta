import * as React from 'react';

interface VerificationEmailTemplateProps {
  email: string;
  token: string
}

export const VerificationEmailTemplate = ({
  email,token
} : VerificationEmailTemplateProps) => (
  <div>
    <h1>Welcome, {email}!</h1>
    <section>
      <h2>Verification</h2>
      <p>Click on the link below to verify your email address</p>
      <p>Click <a href={"http://localhost:3000/api/verify?token=" + token +"&email=" + email}>here</a> to verify.</p>
    </section>
  </div>
);
