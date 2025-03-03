import React from 'react';

interface EmailTemplateProps {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  profession: string;
}

const EmailTemplate: React.FC<EmailTemplateProps> = ({ name, email, phone, company, message, profession }) => {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', lineHeight: '1.6', color: '#333' }}>
      <h2 style={{ color: '#0056b3', borderBottom: '2px solid #0056b3', paddingBottom: '5px' }}>Contact Form Submission</h2>
      <div style={{ marginTop: '20px' }}>
        <p style={{ marginBottom: '10px' }}><strong>Name:</strong> {name}</p>
        <p style={{ marginBottom: '10px' }}><strong>Email:</strong> {email}</p>
        <p style={{ marginBottom: '10px' }}><strong>Phone:</strong> {phone}</p>
        <p style={{ marginBottom: '10px' }}><strong>Profession:</strong> {profession}</p>
        <p style={{ marginBottom: '10px' }}><strong>Company:</strong> {company}</p>
        <p style={{ marginBottom: '10px' }}><strong>Message:</strong> {message}</p>
      </div>
      <div style={{ marginTop: '30px', fontSize: '0.8em', color: '#777' }}>
        This is an automatically generated email. Please do not reply.
      </div>
    </div>
  );
};

export default EmailTemplate;
