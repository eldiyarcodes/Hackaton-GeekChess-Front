import { RegisterForm } from '@/features/auth/view/register-form';
import { ROUTES } from '@/shared/utils/consts/consts';
import { AuthLayout } from '@/widgets/auth-layout';
import type { FC } from 'react';
import { Link } from 'react-router-dom';

const Register: FC = () => {
  return (
    <AuthLayout
      title='Registration'
      form={<RegisterForm />}
      footerText={
        <>
          Already have an account? <Link to={ROUTES.LOGIN}>Log in</Link>
        </>
      }
    />
  );
};

export const Component = Register;
