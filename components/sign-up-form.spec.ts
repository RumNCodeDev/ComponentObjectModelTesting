import { cleanup } from "@testing-library/react";
import { SignUpFormCOM } from "./sign-up-form.com";

type Mock = typeof jest.fn;

describe("SignUpForm", () => {
  let onSubmit: Mock;
  let form: SignUpFormCOM;

  beforeEach(() => {
    onSubmit = jest.fn();
    form = new SignUpFormCOM({ onSubmit });
  });

  afterEach(() => {
    cleanup();
  });

  it("calls onSubmit with values when the form is valid", async () => {
    const formData = {
      email: "fred@example.com",
      password: "password",
    };

    await form.fillForm(formData);
    await form.submit();

    expect(onSubmit).toBeCalledWith(formData);
  });

  it("does not call onSubmit when the form is invalid", async () => {
    await form.fillForm({});
    await form.submit();

    expect(onSubmit).toBeCalledTimes(0);
  });

  it("ensures that an email is provided", async () => {
    await form.fillForm({});
    await form.submit();

    const errorMessage = form.getEmailRequiredMessage();
    expect(errorMessage).toBeDefined();
  });

  it("ensures that the password is at least 8", async () => {
    await form.fillForm({ password: "short" });
    await form.submit();

    const errorMessage = form.getPasswordLengthMessage();
    expect(errorMessage).toBeDefined();
  });
});
