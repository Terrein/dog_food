import s from './index.module.css';
import cn from 'classnames';


function Header({ children, user }) {

  return (
    <header className={cn(s.header, 'cover')}>
      <div className="container">
        {user?.name && <span>{user?.name}</span>}
        <br />
        {user?.email && <span>{user?.email}</span>}
        <div className={s.wrapper}>
          {children}
        </div>
      </div>
    </header>
  )
}

export default Header;
