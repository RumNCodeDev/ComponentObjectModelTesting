import { cleanup, screen, waitFor } from "@testing-library/react";
import { setupMuiRhfForm } from "./MuiRhfForm.com";

type Mock = typeof jest.fn;

const firstName = "Matt";
const lastName = "RumNCode";
const emailAddress = "RumNCode@gmail.com";
const favoriteColor = "Red";
const age = "32";

// describe.skip("MuiRhfForm the OLD way", () => {
//   it("Submits as normal", async () => {
//     const user = userEvent.setup();
//     const onSubmit = jest.fn();
//     render(<MuiRhfForm onSubmit={onSubmit} />);

//     const emailInput = screen.getByLabelText("Email:");
//     await user.type(emailInput, email);

//     const passwordInput = screen.getByLabelText("Password:");
//     await user.type(passwordInput, password);

//     const submitButton = screen.getByRole("button", { name: "Submit" });

//     await user.click(submitButton);
//     expect(onSubmit).toHaveBeenCalledWith({ email, password });
//   });

//   it("Does not submit with no values as normal", async () => {
//     const user = userEvent.setup();
//     const onSubmit = jest.fn();
//     render(<MuiRhfForm onSubmit={onSubmit} />);

//     const submitButton = screen.getByRole("button", { name: "Submit" });

//     await user.click(submitButton);
//     expect(onSubmit).not.toHaveBeenCalled();
//   });

//   it("Errors with no Email", async () => {
//     const password = "abc123ThisMyPassword";

//     const user = userEvent.setup();
//     const onSubmit = jest.fn();
//     render(<MuiRhfForm onSubmit={onSubmit} />);

//     const passwordInput = screen.getByLabelText("Password:");
//     await user.type(passwordInput, password);

//     const submitButton = screen.getByRole("button", { name: "Submit" });

//     await user.click(submitButton);
//     expect(screen.getByText("Email is required")).toBeInTheDocument();
//     expect(onSubmit).not.toHaveBeenCalled();
//   });

//   it("Errors with no password", async () => {
//     const email = "RumNCode@gmail.com";

//     const user = userEvent.setup();
//     const onSubmit = jest.fn();
//     render(<MuiRhfForm onSubmit={onSubmit} />);

//     const emailInput = screen.getByLabelText("Email:");
//     await user.type(emailInput, email);

//     const submitButton = screen.getByRole("button", { name: "Submit" });

//     await user.click(submitButton);
//     expect(
//       screen.getByText("Password must be at least 8 characters")
//     ).toBeInTheDocument();
//     expect(onSubmit).not.toHaveBeenCalled();
//   });
// });

describe("MuiRhfForm COM Functional", () => {
  let onSubmit: Mock;
  let form: ReturnType<typeof setupMuiRhfForm>;

  beforeEach(() => {
    onSubmit = jest.fn();
    form = setupMuiRhfForm({ onSubmit });
  });

  afterEach(() => {
    cleanup();
  });

  it("calls onSubmit with values when the form is valid", async () => {
    const formData = { age, emailAddress, favoriteColor, firstName, lastName };

    await form.fillForm(formData);

    await form.submit();

    expect(onSubmit).toBeCalledWith(formData);
  });

  it("does not call onSubmit when the form is invalid", async () => {
    await form.fillForm({});
    await form.submit();

    expect(onSubmit).toBeCalledTimes(0);
  });

  it("ensures that a first name is correct length", async () => {
    await form.fillForm({ firstName: "" });
    await form.submit();
    const requiredErrorMessage = await form.getFirstRequiredErrorMessage();
    expect(requiredErrorMessage).toBeDefined();

    await form.fillForm({ firstName: "tooooooooLongFirstName" });
    await form.submit();
    const tooLongErrorMessage = await form.getFirstTooLongErrorMessage();
    expect(tooLongErrorMessage).toBeDefined();

    await form.fillForm({ firstName: "justRight" });
    await form.submit();
  });

  // it("ensures that the password is at least 8", async () => {
  //   await form.fillForm({ password: "short" });
  //   await form.submit();

  //   const errorMessage = form.getPasswordLengthMessage();
  //   expect(errorMessage).toBeDefined();
  // });
});
