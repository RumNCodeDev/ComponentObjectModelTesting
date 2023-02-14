import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { TextInput } from "./components/TextInput";

export const zodSchema = z.object({
  firstName: z.string().min(3, "First Name is required"),
  lastName: z.string().min(3),
  emailAddress: z.string().email(),
  age: z
    .string()
    .transform((val) => parseInt(val) || 0)
    .pipe(z.coerce.number().min(18)),
});
export type FormType = z.infer<typeof zodSchema>;

interface Props {
  onSubmit: (data: FormType) => void;
}

export const MuiRhfForm = ({ onSubmit }: Props) => {
  const methods = useForm<FormType>({
    defaultValues: {
      firstName: "",
      lastName: "",
      emailAddress: "",
      age: "",
    },
    resolver: zodResolver(zodSchema),
  });
  const { control, handleSubmit } = methods;

  return (
    <FormProvider {...methods}>
      <DevTool control={control} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box display="flex" flexDirection="column" gap={3}>
          <TextInput name="firstName" />
          <TextInput name="lastName" />
          <TextInput name="emailAddress" />
          <TextInput name="age" />
          <Button type="submit">Submit</Button>
        </Box>
      </form>
    </FormProvider>
  );
};
