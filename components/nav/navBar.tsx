import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./navBar.module.css";
import { MouseEvent, useEffect, useState } from "react";
import Image from "next/image";
import { magic } from "../../lib/magic-client";
import { Magic } from "magic-sdk";


const NavBar = () => {

  const router = useRouter();

  const [showDropdown, setShowDropdown] = useState(false);
  const [userName, setUserName] = useState("")
  const [didToken, setDidToken] = useState("")

  useEffect(() => {
    async function getUsername() {
      try {
        if (magic instanceof Magic){
          const { email} = await magic.user.getMetadata();
          const didToken = await magic.user.getIdToken();
         
          
          if (email) {
            setUserName(email);
          }
        }   
     
      } catch (error) {
        console.log("Error retrieving email:", error);
      }
    }
    getUsername();
  }, []);


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

  const handleSignOut = async() =>{
try {
  if (magic instanceof Magic){
    await magic.user.logout();
    router.push("/login")
  }
 
} catch (error) {
  console.error("Error retrievong email", error);
  router.push("/login")
  
}
  }

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
            <p className={styles.username}>{userName}</p>
            <Image
                src="/static/expand_more.svg"
                alt="Expand more"
                width={24}
                height={24}
              />
          </button>
          {showDropdown && (<div className={styles.navDropdown}>
            <div>
            <button  className={styles.linkName} onClick={handleSignOut}>Sign Out</button>
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
