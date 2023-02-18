import { Box, TextField, TextFieldProps, Typography } from "@mui/material";
import {
  useController,
  UseControllerProps,
  useFormContext,
} from "react-hook-form";

export const TextInput = ({
  name,
  label,
  ...rest
}: UseControllerProps & TextFieldProps) => {
  const { control } = useFormContext();
  const {
    field,
    fieldState: { error },
  } = useController({
    control,
    name,
    rules: { required: true },
  });
  return (
    <Box>
      <TextField
        {...field}
        {...rest}
        label={label}
        error={Boolean(error?.message)}
      />
      {error?.message ? (
        <Typography color="error">{error.message}</Typography>
      ) : null}
    </Box>
  );
};
