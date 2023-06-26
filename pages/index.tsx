import Head from "next/head";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    require("@passageidentity/passage-elements/passage-auth");
  }, []);

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex h-screen items-center justify-center">
        <div className="w-full min-w-[200px] p-4 md:min-w-[400px]">
          <passage-auth app-id="nm4zri7qFiiBaLI69reG8Y8b"></passage-auth>
        </div>
      </div>
    </div>
  );
}
