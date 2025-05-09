import clsx from 'clsx'
import { motion } from 'framer-motion'
import type { FC, ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { useDisableScroll } from '../../hooks/use-disable-scroll'
import classes from './modal.module.scss'

interface IModalProps {
	isOpen: boolean
	children?: ReactNode
	title: string
	className?: string
	onClick?: () => void
}

export const Modal: FC<IModalProps> = ({
	isOpen,
	children,
	title,
	className,
}) => {
	useDisableScroll(isOpen)

	if (!isOpen) {
		return null
	}

	return createPortal(
		<motion.div
			layout
			className={clsx(classes.modalBackdrop, classes.visible)}
			initial={{ opacity: 0 }}
			animate={{ opacity: isOpen ? 1 : 0 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.2 }}
			style={{ pointerEvents: 'auto' }}
		>
			<motion.div
				className={clsx(classes.modalContent, className)}
				initial={{ scale: 0.8 }}
				animate={{ scale: isOpen ? 1 : 0.8 }}
				exit={{ scale: 0.8 }}
				transition={{ duration: 0.2 }}
				onClick={e => e.stopPropagation()}
			>
				{title && (
					<div className={classes.title}>
						<p>{title}</p>
					</div>
				)}
				{children}
			</motion.div>
		</motion.div>,
		document.body
	)
}
