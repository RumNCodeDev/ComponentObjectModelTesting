import React from "react";
import { useController, UseControllerProps } from "react-hook-form";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { Option } from "@/types/formTypes";

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
}: FormSelectProps) => {
  const {
    field: { ref, ...inputProps },
    fieldState: { error, invalid },
  } = useController({
    name,
    control,
    defaultValue,
  });

  return (
    <FormControl variant="outlined" fullWidth>
      <InputLabel error={invalid}>{label}</InputLabel>
      <Select
        {...inputProps}
        label={label}
        inputRef={ref}
        error={Boolean(error?.message)}
      >
        <MenuItem value=""> </MenuItem>
        {options.map((option, index) => (
          <MenuItem key={index} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {error?.message ? (
        <Typography color="error">{error.message}</Typography>
      ) : null}
    </FormControl>
  );
};
