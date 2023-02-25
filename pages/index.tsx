import Head from "next/head";

import { MuiRhfForm } from "@/components/MuiRhfForm";
import styles from "@/pages/index.module.css";
import { MuiRhfFormType, SignUpData } from "types/formTypes";

export default function Home() {
  const handleSubmit = (data: SignUpData | MuiRhfFormType) => {
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
