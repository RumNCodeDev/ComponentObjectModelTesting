// sign-up-form.com.tsx
import { render, RenderResult } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SignUpProps, SignUpData } from "types/formTypes";
import { SignUpForm } from "./sign-up-form";

export class SignUpFormCOM {
  #utils: RenderResult;
  #emailInput: HTMLElement;
  #passwordInput: HTMLElement;
  #submitButton: HTMLElement;

  constructor(props: SignUpProps) {
    this.#utils = render(<SignUpForm {...props} />);
    this.#emailInput = this.#utils.getByLabelText("Email:");
    this.#passwordInput = this.#utils.getByLabelText("Password:");
    this.#submitButton = this.#utils.getByText("Submit");
  }

  async fillForm({ email, password }: Partial<SignUpData>) {
    if (email) await userEvent.type(this.#emailInput, email);
    if (password) await userEvent.type(this.#passwordInput, password);
  }

  submit() {
    return userEvent.click(this.#submitButton);
  }

  #getValidationMessage(errorMessage: string) {
    return this.#utils.getByText(errorMessage);
  }

  getEmailRequiredMessage() {
    return this.#getValidationMessage("Email is required");
  }

  getPasswordLengthMessage() {
    return this.#getValidationMessage("Password must be at least 8 characters");
  }
}

export const setupSignUpForm = (props: SignUpProps) => {
  const utils = render(<SignUpForm {...props} />);

  const emailInput = utils.getByLabelText("Email:");
  const passwordInput = utils.getByLabelText("Password:");
  const submitButton = utils.getByText("Submit");

  const fillForm = async ({ email, password }: Partial<SignUpData>) => {
    if (email) await userEvent.type(emailInput, email);
    if (password) await userEvent.type(passwordInput, password);
  };

  const submit = () => userEvent.click(submitButton);

  const getValidationMessage = (errorMessage: string) =>
    utils.getByText(errorMessage);

  const getEmailRequiredMessage = () =>
    getValidationMessage("Email is required");

  const getPasswordLengthMessage = () =>
    getValidationMessage("Password must be at least 8 characters");

  return {
    fillForm,
    submit,
    getEmailRequiredMessage,
    getPasswordLengthMessage,
  };
};
