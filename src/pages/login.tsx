import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Login.module.css";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";
import { magic } from "../../lib/magic-client";
import { Magic } from "magic-sdk";

const Login = () => {
  const router = useRouter();

  const [userMsg, setUserMsg] = useState("");
  const [email, setEmail] = useState("");

  const handleOnChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    setUserMsg("");
    setEmail(value);
  };

  const handleLoginWithEmail = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (email) {
      if (email === "joseluy123@gmail.com") {
        //show the dashboard
        // router.push("/")
        try {
          if (magic instanceof Magic) {
           const didToken = await magic.auth.loginWithMagicLink({
              email,
            });
            console.log({didToken});
            
          } else {
            console.log("magic setup failed");
          }
        } catch (err) {
          console.error("Something went wrong logging in",err);
          
        }
      } else {
        //show user message
        setUserMsg("Something went wrong logging In");
      }
    } else {
      setUserMsg("Enter a valid email address");
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Netflix SignIn</title>
      </Head>

      <header className={styles.header}>
        <div className={styles.headerWrapper}>
          <Link className={styles.logoLink} href="/">
            <div className={styles.logoWrapper}>
              <Image
                src="/static/netflix.svg"
                alt="Netflix logo"
                width={128}
                height={34}
              />
            </div>
          </Link>
        </div>
      </header>
      <main className={styles.main}>
        <div className={styles.mainWrapper}>
          <h1 className={styles.signinHeader}>Sign In</h1>
          <input
            type="text"
            placeholder="Email address"
            className={styles.emailInput}
            onChange={handleOnChangeEmail}
          />
          <p className={styles.userMsg}>{userMsg}</p>
          <button onClick={handleLoginWithEmail} className={styles.loginBtn}>
            Sign In
          </button>
        </div>
      </main>
    </div>
  );
};

export default Login;
