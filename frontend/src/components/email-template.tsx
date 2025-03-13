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
  <div style={container}>
        <p style={greeting}>Dear {name},</p>
        <p>Thank you for contacting us! We have received your message and will get back to you as soon as possible.</p>

        <div style={submissionDetails}>
        <h5><strong>Here is a copy of your submission:</strong></h5>
          <p><strong>Name:</strong></p>
          <input type="text" style={disabledField} value={name} disabled />
          <p><strong>Email:</strong></p>
          <input type="text" style={disabledField} value={email} disabled />
          <p><strong>Phone:</strong></p>
          <input type="text" style={disabledField} value={phone} disabled />
          <p><strong>Profession:</strong></p>
          <input type="text" style={disabledField} value={profession} disabled />
          <p><strong>Company Name:</strong></p>
          <input type="text" style={disabledField} value={companyName} disabled />
          <p><strong>Message:</strong></p>
          <textarea style={disabledField} rows={5} value={message} disabled />
        </div>

        <p>We appreciate your interest in Get2Act.</p>
        <p>Sincerely,<br></br>The Get2Act Team</p>
    </div>
);
const container = {
  maxWidth: '600px',
  margin: '20px auto',
  padding: '20px',
  backgroundColor: '#ffffff',
  border: '1px solid #ddd',
  borderRadius: '5px',
};

const greeting = {
  fontSize: '24px',
  fontWeight: 'bold',
  marginBottom: '20px',
};

const submissionDetails = {
  marginTop: '20px',
  borderTop: '1px solid #eee',
  paddingTop: '20px',
};

const internalNote = {
  marginTop: '30px',
  borderTop: '2px dashed #ccc',
  paddingTop: '20px',
  fontStyle: 'italic',
  color: '#555',
};

const disabledField = {
  backgroundColor: '#f9f9f9',
  border: '1px solid #ddd',
  padding: '8px',
  marginBottom: '10px',
  width: '100%',
  color: '#555',
};