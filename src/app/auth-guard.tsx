import { useSession } from '@/shared/model/use-session';
import { ROUTES } from '@/shared/utils/consts/consts';
import type { FC } from 'react';
import { Navigate, Outlet, redirect } from 'react-router-dom';

export const AuthorizationGuard: FC = () => {
  const session = useSession((s) => s.session);

  return session ? <Outlet /> : <Navigate to={ROUTES.HOME} replace />;
};

export const protectedLoader = async () => {
  const token = await useSession.getState().refresh();

  if (!token) {
    return redirect(ROUTES.LOGIN);
  }

  return null;
};
