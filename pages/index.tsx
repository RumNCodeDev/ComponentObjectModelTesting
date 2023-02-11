import Head from "next/head";

import { SignUpData, SignUpForm } from "@/components/sign-up-form";
import styles from "@/pages/index.module.css";

export default function Home() {
  const handleSubmit = (data: SignUpData) => {
    console.log(data);
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>Component Object Model Testing</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <SignUpForm onSubmit={handleSubmit} />
      </main>
    </div>
  );
}
