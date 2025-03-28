import * as React from "react";

interface UserQueryConfirmationTemplateProps {
  name: string;
  query: string;
}

export const UserQueryConfirmationTemplate = ({
  name,
  query,
}: UserQueryConfirmationTemplateProps) => {
  const now = new Date();
  const formattedDate = now.toLocaleString();

  return (
    <div style={container}>
      <p style={heading}>Query Received</p>

      <div style={confirmationDetails}>
        <p>
          Dear <strong>{name}</strong>,
        </p>
        <p>
          Thank you for submitting your query. We have received the following:
        </p>
        <p>
          <strong>Your Query:</strong>
          <div style={messageStyle}>{query}</div>
        </p>
        <p>
          <strong>Received On:</strong> {formattedDate}
        </p>
        <p>
          We will review your query and get back to you as soon as possible.
        </p>
      </div>

      <p style={{...disclaimer, textAlign: "center"}}>
        This is an automated email. Please do not reply directly.
      </p>
    </div>
  );
};

const container = {
  fontFamily: "sans-serif",
  maxWidth: "600px",
  margin: "20px auto",
  padding: "20px",
  backgroundColor: "#f8f8f8",
  border: "1px solid #ddd",
  borderRadius: "5px",
};

const heading = {
  fontSize: "24px",
  fontWeight: "bold",
  marginBottom: "20px",
};

const confirmationDetails = {
  borderTop: "1px solid #eee",
  paddingTop: "20px",
};

const messageStyle = {
  whiteSpace: "pre-wrap",
  marginTop: "10px",
  padding: "10px",
  backgroundColor: "#fff",
  border: "1px solid #eee",
  borderRadius: "5px",
};

const disclaimer = {
  marginTop: "20px",
  fontSize: "12px",
  color: "#888",
  textAlign: "center",
};