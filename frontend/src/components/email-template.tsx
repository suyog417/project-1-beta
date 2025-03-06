import * as React from 'react';

interface EmailTemplateProps {
  name: string;
  email: string;
  phone: string;
  profession: string;
  companyName: string;
  message: string;
}

export const EmailTemplate = ({
  name,
  email,
  phone,
  profession,
  companyName,
  message,
} : EmailTemplateProps) => (
  <div>
    <h1>Welcome, {name}!</h1>
    <section>
      <h2>Contact Form</h2>
      <div style={dataFields}>
        Name : {name}
      </div>
      <div style={dataFields}>
        Email : {email}
      </div>
      <div style={dataFields}>
        Phone : {phone}
      </div>
      <div style={dataFields}>
        Profession : {profession}
      </div>
      <div style={dataFields}>
        Company Name : {companyName}
      </div>
      <div style={dataFields}>
        Message : {message}
      </div>
    </section>
  </div>
);

const dataFields = {
  padding: '0.5rem 0.5rem',
  border: '1px solid #000',
  borderRadius: '0.3rem',
  margin: "1rem 0"
}
