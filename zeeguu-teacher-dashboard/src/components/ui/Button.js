import React from 'react'
import clsx from 'clsx'
import './button.scss'

const Button = (
  {
    className,
    rounded = false,
    secondary = false,
    Component = props => <button {...props} />,
    ...props
  },
  ref
) => (
  <Component
    ref={ref}
    className={clsx(className, 'ztd-btn', {
      'ztd-btn--secondary': secondary,
      'ztd-btn--rounded': rounded
    })}
    {...props}
  />
)

export default React.forwardRef(Button)
