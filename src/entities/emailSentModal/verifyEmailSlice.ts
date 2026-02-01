import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useVerifyEmailMutation } from '@/shared/api/authApi';
import { Button } from '@/shared/ui'

import { routes } from '@/shared';

export const VerifyEmailPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [verifyEmail, { isLoading, isSuccess, isError, error }] = useVerifyEmailMutation();

  useEffect(() => {
    const token = searchParams.get('token');
    
    if (token && !isLoading && !isSuccess && !isError) {
      verifyEmail(token)
        .unwrap()
        .then(() => {
          navigate(routes.confirmationSuccess);
        })
        .catch((error) => {
          const status = error.status || error.data?.status || 500;
          
          switch (status) {
            case 400:
              navigate(routes.linkExpired);
              break;
            case 409:
              break;
            case 500:
              break;
            default:
              navigate(routes.signIn);
          }
        });
    }
  }, [searchParams, verifyEmail, isLoading, isSuccess, isError, navigate]);

  if (isLoading) {
    return (
      <div>
       <Loader/>
      </div>
    );
  }

  if (isError && error) {
    const status = (error as any).status || (error as any).data?.status || 500;
    const message = (error as any).data?.message || 'Something went wrong';

    if (status === 409) {
      return (
        <div>
          <h1>Email already confirmed</h1>
          <p>{message}</p>
          <Button as="a" href={routes.signIn}>
            Sign In
          </Button>
        </div>
      );
    }

    if (status === 500) {
      return (
        <div >
          <h1>Something went wrong</h1>
          <p>Please try again later.</p>
          <Button as="a" href={routes.signIn}>
            Go to Sign In
          </Button>
        </div>
      );
    }
  }

  return null;
};