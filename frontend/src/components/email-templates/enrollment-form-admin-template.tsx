import * as React from "react";

interface AdminEnrollmentFormTemplateProps {
  name: string;
  email: string;
  phone: string;
  city: string;
  courseType: string;
}

export const AdminEnrollmentFormTemplate = ({
  name,
  email,
  phone,
  city,
  courseType,
}: AdminEnrollmentFormTemplateProps) => {
  const now = new Date();
  const formattedDate = now.toLocaleString();

  return (
    <div style={container}>
      <p style={heading}>New Enrollment Form Submission</p>

      <div style={submissionDetails}>
        <p>
          <strong>Name:</strong> {name}
        </p>
        <p>
          <strong>Email:</strong> {email}
        </p>
        <p>
          <strong>Phone:</strong> {phone || "Not provided"}
        </p>
        <p>
          <strong>Profession:</strong> {city || "Not provided"}
        </p>
        <p>
          <strong>Company Name:</strong> {courseType || "Not provided"}
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
