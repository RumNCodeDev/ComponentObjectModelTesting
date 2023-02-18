export type SignUpData = {
  email: string;
  password: string;
};

export type SignUpProps = {
  onSubmit: (data: SignUpData) => void;
};

export interface Option {
  value: string | number;
  label: string;
}
