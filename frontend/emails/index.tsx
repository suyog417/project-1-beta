import {
    Body,
    Button,
    Container,
    Head,
    Hr,
    Html,
    Img,
    Preview,
    Section,
    Text,
  } from '@react-email/components';
  import * as React from 'react';
  
  interface FormCopyTemplateProps {
    name: string
    email : string
    phone : string
    profession : string
    companyName : string
    message : string
  }
  
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : '';
  
  export const FormCopyTemplate = ({
    companyName, email, message, name, phone, profession
  }: FormCopyTemplateProps) => (
    <Html>
      <Head />
      <Body style={main}>
        <Preview>
          Here is a copy of the reponse you just submitted.
        </Preview>
        <Container style={container}>
          {/* <Img
            src={`${baseUrl}/static/koala-logo.png`}
            width="170"
            height="50"
            alt="Koala"
            style={logo}
          /> */}
          <Text style={paragraph}>Hi {name},</Text>
          <Text style={paragraph}>
            Thanks for choosing Get2Act.
          </Text>
          <Section style={btnContainer}>
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
          </Section>
          <Text style={paragraph}>
            Best,
            <br />
            The Get2Act team
          </Text>
          <Hr style={hr} />
          <Text style={footer}>
            470 Noor Ave STE B #1148, South San Francisco, CA 94080
          </Text>
        </Container>
      </Body>
    </Html>
  );
  
  FormCopyTemplate.PreviewProps = {
    name: 'Alan',
    email : "test@gmail.com",
    phone : "+11234567",
    profession : "Student",
    companyName : "NA",
    message : "This is a test"
  } as FormCopyTemplateProps;
  
  export default FormCopyTemplate;
  
  const main = {
    backgroundColor: '#ffffff',
    fontFamily:
      '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
  };
  
  const container = {
    margin: '0 auto',
    padding: '20px 0 48px',
  };
  
  const logo = {
    margin: '0 auto',
  };
  
  const paragraph = {
    fontSize: '16px',
    lineHeight: '26px',
  };

  const dataFields = {
    padding : '0.5rem 0.5rem',
    border : '1px solid #000',
    borderRadius : '0.3rem',
    margin : "1rem 0"
  }
  
  const btnContainer = {
    textAlign : 'left' as const,
    backgroundColor : "gray",
    padding : "0.5rem 1rem",
    borderRadius : '0.5rem'
  };
  
  const button = {
    backgroundColor: '#5F51E8',
    borderRadius: '3px',
    color: '#fff',
    fontSize: '16px',
    textDecoration: 'none',
    textAlign: 'center' as const,
    display: 'block',
    padding: '12px',
  };
  
  const hr = {
    borderColor: '#cccccc',
    margin: '20px 0',
  };
  
  const footer = {
    color: '#8898aa',
    fontSize: '12px',
  };
  