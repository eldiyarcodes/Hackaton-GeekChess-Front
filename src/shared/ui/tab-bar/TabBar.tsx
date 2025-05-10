import clsx from 'clsx'
import { type FC, useState, type ReactElement, useEffect } from 'react'
import styles from './TabBar.module.scss'

export type ITabBarProps = {
  className: string;
  defaultActive: number;
  tabs: {label: string, content: ReactElement}[];
}
export const TabBar: FC<ITabBarProps> = ({
  className,
  defaultActive = 1,
  tabs,
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(defaultActive)

  useEffect(() => {
    setActiveIndex(defaultActive)
  }, [defaultActive])

  return (
    <div className={clsx(styles.tabsContainer, className)}>
      <div className={styles.tabsHeader}>
        {tabs.map((tab, index) => (
          <button
            type={'button'}
            key={index}
            className={clsx(
              styles.tabButton,
              activeIndex === index && styles.active,
            )}
            onClick={() => setActiveIndex(index)}
          >
            <p>{tab.label}</p>
          </button>
        ))}
      </div>
      <div className={styles.tabContent}>{tabs[activeIndex]?.content}</div>
    </div>
  )
}