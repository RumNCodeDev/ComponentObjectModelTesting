import { MuiRhfFormType, SignUpProps } from "@/types/formTypes";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MuiRhfForm } from "./MuiRhfForm";

export const setupMuiRhfForm = (props: SignUpProps) => {
  const user = userEvent.setup();
  const utils = render(<MuiRhfForm {...props} />);

  const firstNameInput = utils.getByLabelText("First Name");
  const lastNameInput = utils.getByLabelText("Last Name");

  const emailInput = utils.getByLabelText("Email");
  const ageInput = utils.getByLabelText("Age");
  const favoriteColorInput = utils.getByLabelText("Favorite Color");

  const submitButton = utils.getByText("Submit");

  const fillForm = async ({
    firstName,
    lastName,
    emailAddress,
    age,
    favoriteColor,
  }: Partial<MuiRhfFormType>) => {
    if (firstName) {
      await userEvent.type(firstNameInput, firstName);
    }
    if (lastName) {
      await userEvent.type(lastNameInput, lastName);
    }
    if (age) {
      await userEvent.type(ageInput, age);
    }
    if (emailAddress) {
      await userEvent.type(emailInput, emailAddress);
    }
    if (favoriteColor) {
      await userEvent.click(favoriteColorInput);
      const colorOption = await utils.findByText(favoriteColor, {
        exact: false,
      });
      await userEvent.click(colorOption);
    }
  };

  const submit = async () => {
    await user.click(submitButton);
  };

  const getValidationMessage = async (errorMessage: string) => {
    return await utils.findByText(errorMessage);
  };

  const getFirstRequiredErrorMessage = () => {
    return getValidationMessage("First Name is required");
  };
  const getFirstTooLongErrorMessage = () => {
    return getValidationMessage("Maybe a nickname instead?");
  };

  const getLastRequiredErrorMessage = () => {
    return getValidationMessage("Please enter a last name");
  };

  const getEmailValidMessage = () => {
    return getValidationMessage("Invalid email");
  };
  const getFavoriteColorRequiredMessage = () => {
    return getValidationMessage("I MUST KNOW!!!");
  };

  return {
    fillForm,
    getEmailValidMessage,
    getFirstTooLongErrorMessage,
    getFirstRequiredErrorMessage,
    getFavoriteColorRequiredMessage,
    getLastRequiredErrorMessage,
    submit,
  };
};
