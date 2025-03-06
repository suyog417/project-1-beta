import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Verify() {
  const searchParams = new URLSearchParams(window.location.search);
  const token = searchParams.get('token');
  const [isLoading, setIsLoading] = useState(false)

  const [verificationStatus, setVerificationStatus] = useState<"Success" | "Failure" | null>(null);

  useEffect(() => {
    if (token ) {
      const verifyToken = async () => {
        try {
          const response = await fetch('/api/verify-token', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token }),
          });

          const data = await response.json();

          if (data.success) {
            setVerificationStatus('Success');
          } else {
            setVerificationStatus('Failure');
          }
        } catch (error) {
          console.error('Verification error:', error);
          setVerificationStatus('Failure');
        }
      };

      verifyToken();
    }
  }, [token]);

  return (
    <div>
      {verificationStatus === 'Success' && <p>Email verified successfully!</p>}
      {verificationStatus === 'Failure' && <p>Email verification failed.</p>}
      {verificationStatus === null && <p>Verifying...</p>}
    </div>
  );
}
