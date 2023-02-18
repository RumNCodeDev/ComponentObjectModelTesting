import Head from "next/head";

import { SignUpForm } from "@/components/BasicForm/sign-up-form";
import { FormType, MuiRhfForm } from "@/components/MuiRhfForm";
import styles from "@/pages/index.module.css";
import { SignUpData } from "types/formTypes";

export default function Home() {
  const handleSubmit = (data: SignUpData | FormType) => {
    console.log(data);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Component Object Model Testing</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {/* <SignUpForm onSubmit={handleSubmit} /> */}
        <MuiRhfForm onSubmit={handleSubmit} />
      </main>
    </div>
  );
}
