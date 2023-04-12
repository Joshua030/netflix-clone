import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./navBar.module.css";
import { MouseEvent, useState } from "react";
import Image from "next/image";
interface props {
  username: string;
}

const NavBar = ({ username }: props) => {

  const router = useRouter();

  const [showDropdown, setShowDropdown] = useState(false);

  const handleOnClickHome = (e: MouseEvent<HTMLLIElement>):void => {
    e.preventDefault();
    router.push("/");
  };

  const handleShowDropdown = (e: MouseEvent<HTMLButtonElement>):void => {
    e.preventDefault();
    setShowDropdown(!showDropdown)
  };

  const handleOnClickMyList = (e: MouseEvent<HTMLLIElement>):void  => {
    e.preventDefault();
    router.push("/browse/my-list");
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
      <Link href="/" className={styles.logoLink}>
        <div className={styles.logoWrapper}>
        <Image
              src="/static/netflix.svg"
              alt="Netflix logo"
              width={128}
              height={34}
            />
        </div>
      </Link>
      <ul className={styles.navItems}>
        <li className={styles.navItem} onClick={handleOnClickHome}>Home</li>
        <li className={styles.navItem2} onClick={handleOnClickMyList}>My List</li>
      </ul>
      <nav className={styles.navContainer}>
        <div>
          <button className={styles.usernameBtn} onClick={handleShowDropdown}>
            <p className={styles.username}>{username}</p>
            <Image
                src="/static/expand_more.svg"
                alt="Expand more"
                width={24}
                height={24}
              />
          </button>
          {showDropdown && (<div className={styles.navDropdown}>
            <div>
            <Link href="" className={styles.linkName}>Sign Out</Link>
            <div className={styles.lineWrapper}></div>

            </div>
          </div>
          )}
        </div>
      </nav>
      </div>
    </div>
  );
};

export default NavBar;
