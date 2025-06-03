import { Outlet } from "react-router";
import { Link } from "react-router";
import style from "./mainLayout.module.scss";

const MainLayout = () => (<>
  <div className={style.layout}>
    <header className={style.header}>
      <h1 className={style.title}>My Todo App</h1>
      <nav className={style.nav}>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="details/testID">Details</Link>
          </li>
        </ul>
      </nav>
    </header>
    <main className={style.container}>
      <Outlet />
    </main>
    <footer className={style.footer}>Junia - WEB - 2425</footer>
  </div>
</>
)

export default MainLayout;