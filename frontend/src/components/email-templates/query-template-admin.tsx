import * as React from "react";

interface AdminQueryFormTemplateProps {
  name: string;
  email: string;
  query: string;
}

export const AdminQueryFormTemplate = ({
  name,
  email,
  query,
}: AdminQueryFormTemplateProps) => {
  const now = new Date();
  const formattedDate = now.toLocaleString();

  return (
    <div style={container}>
      <p style={heading}>New Query Submission</p>

      <div style={submissionDetails}>
        <p>
          <strong>Name:</strong> {name}
        </p>
        <p>
          <strong>Email:</strong> {email}
        </p>
        <p>
          <strong>Query:</strong>
          <div style={messageStyle}>{query}</div>
        </p>
        <p>
          <strong>Submitted On:</strong> {formattedDate}
        </p>
      </div>
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

const submissionDetails = {
  borderTop: "1px solid #eee",
  paddingTop: "20px",
};

const messageStyle = {
  whiteSpace: "pre-wrap", // Preserve line breaks
  marginTop: "10px",
  padding: "10px",
  backgroundColor: "#fff",
  border: "1px solid #eee",
  borderRadius: "5px",
};