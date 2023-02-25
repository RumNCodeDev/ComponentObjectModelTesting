import { muiRhfFormZodSchema } from "schemas";
import { z } from "zod";

export type SignUpData = {
  email: string;
  password: string;
};

export type SignUpProps = {
  onSubmit: (data: SignUpData | MuiRhfFormType) => void;
};

export interface Option {
  value: string | number;
  label: string;
}

export type MuiRhfFormType = z.infer<typeof muiRhfFormZodSchema>;
