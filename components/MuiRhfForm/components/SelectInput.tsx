import { Option } from "@/types/formTypes";
import {
  Box,
  FormControl,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useController, UseControllerProps } from "react-hook-form";

interface FormSelectProps extends UseControllerProps {
  label: string;
  options: Array<Option>;
}

export const SelectInput = ({
  control,
  name,
  label,
  options,
  defaultValue,
  ...rest
}: FormSelectProps) => {
  const {
    field: { ref, ...inputProps },
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue,
  });

  return (
    <Box>
      <TextField
        {...rest}
        {...inputProps}
        error={Boolean(error?.message)}
        fullWidth
        inputRef={ref}
        role="combobox"
        label={label}
        select={true}
      >
        <MenuItem value="" />
        {options.map((option, index) => (
          <MenuItem key={index} value={option.value} role="menuitem">
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      {error?.message ? (
        <Typography color="error">{error.message}</Typography>
      ) : null}
    </Box>
  );
};
