import classes from "./MainNavigation.module.css";
import Link from "next/link";
import I18N from "../../i18n/fr";
import Image from "next/image";

function MainNavigation() {
  return (
    <header className={classes.header}>
      <Link href="/">
        <Image
          className={classes.logo}
          src="/logo-bag.png"
          alt="Silo Diyata logo"
          width="220"
          height="50"
        />
      </Link>

      {/* <div className={classes.logo}>SiloDiyata</div> */}
      <nav>
        <ul>
          <li>
            <Link href="/">{I18N.layout.header.book}</Link>
          </li>
          <li>
            <Link href="/new-meetup">{I18N.layout.header.contact}</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
