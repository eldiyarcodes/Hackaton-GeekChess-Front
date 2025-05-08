import type { FC, ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../features/auth/model/use-auth'
import { AppRoutes } from '../../shared/utils/consts/consts'

export const AuthorizationGuard: FC<{ children: ReactNode }> = ({
	children,
}) => {
	const isAuth = useAuth(s => s.isAuth)

	return isAuth ? children : <Navigate to={AppRoutes.HOME} />
}
