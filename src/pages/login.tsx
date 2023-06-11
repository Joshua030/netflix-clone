import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Login.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { magic } from "../../lib/magic-client";
import { Magic } from "magic-sdk";

const Login = () => {
  const router = useRouter();

  const [userMsg, setUserMsg] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const handleComplete = () => {
      setIsLoading(false);
    };
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);

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
    if(email.length<1){
      setUserMsg("Provide a valid email");
      return;
    }
    if (email) {
        //show the dashboard
        // router.push("/")
        try {
          if (magic instanceof Magic) {
            setIsLoading(true)
           const didToken = await magic.auth.loginWithMagicLink({
              email,
            });
          
            if(didToken){ 
              // setIsLoading(false)
              const response = await fetch('api/login', {
                method: 'POST',
                headers: {
                  'Authorization': `Bearer ${didToken}`,
                  'Content-type': 'application/json'
                }
              })

              const loggedInResponse :{done: boolean}= await response.json();
              if(loggedInResponse.done){
             
                router.push('/');}   
              } else {
                setIsLoading(false);
                setUserMsg("Something went wrong logging in")
              }
            
          } else {
            console.log("magic setup failed");
          }
        } catch (err) {
          console.error("Something went wrong logging in",err);
          setIsLoading(false)
        }
      } else {
        //show user message
        setIsLoading(false)
        setUserMsg("Something went wrong logging In");
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
            {isLoading ? 'Loading...':'Sign In'}
          </button>
        </div>
      </main>
    </div>
  );
};

export default Login;
