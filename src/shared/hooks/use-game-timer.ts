import { useEffect, useState } from 'react'

export function useGameTimer(duration: number, onEnd: () => void) {
	const [timeLeft, setTimeLeft] = useState(duration)

	useEffect(() => {
		const timer = setInterval(() => {
			setTimeLeft(prev => {
				if (prev <= 1) {
					clearInterval(timer)
					onEnd()
					return 0
				}
				return prev - 1
			})
		}, 1000)

		return () => clearInterval(timer)
	}, [])

	return timeLeft
}
