import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { SelectInput, TextInput } from "./components";
import { Option } from "@/types/formTypes";

export const zodSchema = z
  .object({
    firstName: z.string().min(3, "First Name is required"),
    lastName: z.string().min(3),
    emailAddress: z.string().email(),
    age: z.string(),
    favoriteColor: z.string().min(1, "I MUST KNOW!!!"),
  })
  .refine(({ age }) => parseInt(age) >= 18, {
    message: "Must be 18 or older",
    path: ["age"],
  });
export type FormType = z.infer<typeof zodSchema>;

interface Props {
  onSubmit: (data: FormType) => void;
}

const colorOptions: Array<Option> = [
  { label: "red", value: "Red" },
  { label: "green", value: "Green" },
  { label: "blue", value: "Blue" },
];

export const MuiRhfForm = ({ onSubmit }: Props) => {
  const methods = useForm<FormType>({
    defaultValues: {
      firstName: "",
      lastName: "",
      emailAddress: "",
      age: "",
      favoriteColor: "",
    },
    resolver: zodResolver(zodSchema),
  });
  const { control, handleSubmit } = methods;

  return (
    <FormProvider {...methods}>
      <DevTool control={control} />
      <form onSubmit={handleSubmit(onSubmit)}>
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
