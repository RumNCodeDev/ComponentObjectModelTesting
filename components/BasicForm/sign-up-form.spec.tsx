import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { setupSignUpForm, SignUpFormCOM } from "./sign-up-form.com";
import { SignUpForm } from "./sign-up-form";

import userEvent from "@testing-library/user-event";

type Mock = typeof jest.fn;

const email = "RumNCode@gmail.com";
const password = "abc123ThisMyPassword";

describe("SignUpForm the OLD way", () => {
  it("Submits as normal", async () => {
    const user = userEvent.setup();
    const onSubmit = jest.fn();
    render(<SignUpForm onSubmit={onSubmit} />);

    const emailInput = screen.getByLabelText("Email:");
    await user.type(emailInput, email);

    const passwordInput = screen.getByLabelText("Password:");
    await user.type(passwordInput, password);

    const submitButton = screen.getByRole("button", { name: "Submit" });

    await user.click(submitButton);
    expect(onSubmit).toHaveBeenCalledWith({ email, password });
  });

  it("Does not submit with no values as normal", async () => {
    const user = userEvent.setup();
    const onSubmit = jest.fn();
    render(<SignUpForm onSubmit={onSubmit} />);

    const submitButton = screen.getByRole("button", { name: "Submit" });

    await user.click(submitButton);
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("Errors with no Email", async () => {
    const password = "abc123ThisMyPassword";

    const user = userEvent.setup();
    const onSubmit = jest.fn();
    render(<SignUpForm onSubmit={onSubmit} />);

    const passwordInput = screen.getByLabelText("Password:");
    await user.type(passwordInput, password);

    const submitButton = screen.getByRole("button", { name: "Submit" });

    await user.click(submitButton);
    expect(screen.getByText("Email is required")).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("Errors with no password", async () => {
    const email = "RumNCode@gmail.com";

    const user = userEvent.setup();
    const onSubmit = jest.fn();
    render(<SignUpForm onSubmit={onSubmit} />);

    const emailInput = screen.getByLabelText("Email:");
    await user.type(emailInput, email);

    const submitButton = screen.getByRole("button", { name: "Submit" });

    await user.click(submitButton);
    expect(
      screen.getByText("Password must be at least 8 characters")
    ).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });
});

describe("SignUpForm COM", () => {
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
    const formData = { email, password };

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

describe("SignUpForm Functional", () => {
  let onSubmit: Mock;
  let form: ReturnType<typeof setupSignUpForm>;

  beforeEach(() => {
    onSubmit = jest.fn();
    form = setupSignUpForm({ onSubmit });
  });

  afterEach(() => {
    cleanup();
  });

  it("calls onSubmit with values when the form is valid", async () => {
    const formData = { email, password };

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
    await form.fillForm({ password });
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
