import { useState } from "react";

export type SignUpData = {
  email: string;
  password: string;
};

export type SignUpProps = {
  onSubmit: (data: SignUpData) => void;
};

export const SignUpForm = ({ onSubmit }: SignUpProps) => {
  const [email, setEmail] = useState("");
  const [emailMsg, setEmailMsg] = useState("");
  const [password, setPassword] = useState("");
  const [passwordMsg, setPasswordMsg] = useState("");

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setEmailMsg("");
    setPasswordMsg("");

    let hasError = false;
    if (email === "") {
      setEmailMsg("Email is required");
      hasError = true;
    }
    if (password.length < 8) {
      setPasswordMsg("Password must be at least 8 characters");
      hasError = true;
    }

    if (hasError) return;

    onSubmit({ email, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <p>{emailMsg}</p>
      <label>
        Email:
        <input
          type="text"
          name="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <p>{passwordMsg}</p>
      <label>
        Password:
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};
