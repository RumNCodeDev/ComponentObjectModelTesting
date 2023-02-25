import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { SelectInput, TextInput } from "./components";
import { MuiRhfFormType, Option, SignUpProps } from "@/types/formTypes";
import { muiRhfFormZodSchema } from "@/schemas/index";

export const colorOptions: Array<Option> = [
  { label: "red", value: "Red" },
  { label: "green", value: "Green" },
  { label: "blue", value: "Blue" },
];

export const MuiRhfForm = ({ onSubmit }: SignUpProps) => {
  const methods = useForm<MuiRhfFormType>({
    defaultValues: {
      firstName: "",
      lastName: "",
      emailAddress: "",
      age: "",
      favoriteColor: "",
    },
    resolver: zodResolver(muiRhfFormZodSchema),
  });
  const { control, handleSubmit } = methods;

  return (
    <FormProvider {...methods}>
      <DevTool control={control} />
      <form onSubmit={handleSubmit((data) => onSubmit(data))}>
        <Box display="flex" flexDirection="column" gap={3}>
          <TextInput name="firstName" label="First Name" />
          <TextInput name="lastName" label="Last Name" />
          <TextInput name="emailAddress" label="Email" />
          <TextInput name="age" label="Age" />
          <SelectInput
            name="favoriteColor"
            label="Favorite Color"
            options={colorOptions}
          />
          <Button type="submit">Submit</Button>
        </Box>
      </form>
    </FormProvider>
  );
};
