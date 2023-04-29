import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react';
import { magic } from '../../lib/magic-client';
import { useRouter } from 'next/router';
import { Magic } from 'magic-sdk';
import Loading from '../../components/loading/loading';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // const handleLoggedIn = async () => {
    //   if (magic instanceof Magic){
    //     const isLoggedIn = await magic.user.isLoggedIn();
    //     if (isLoggedIn) {
    //       // route to /
    //       router.push("/");
    //     } else {
    //       // route to /login
    //       router.push("/login");
    //     }
    //   }
    // };
    // handleLoggedIn();
  }, []);

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

  return isLoading ? <Loading /> : <Component {...pageProps} />;
}
