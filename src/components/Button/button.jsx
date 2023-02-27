import s from './index.module.css';
import cn from 'classnames';

function Button({ type, className, onClick, children }) {

  return (
    <button onClick={onClick} className={cn(className, s.button, {
      [s.primary]: type === 'primary',
      [s.secondary]: type === 'secondary',
    })}>
      {children}
    </button>
  )
}

export default Button;
