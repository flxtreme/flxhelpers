export enum TValidation {
  default = 'default',
  name = 'name', 
  email = 'email',
  date = 'date',
  arrayDefault = 'arrayDefault',
  arrayString = 'arrayString',
  arrayNumber = 'arrayNumber',
}

export type TValidationRules = {
  field: string;
  required: boolean;
  validation?: TValidation;
  customValidate?: (value: any) => boolean;
  customValidateAsync?: (value: any) => Promise<boolean>;
};

export type ValidateInputOptions = {
  body: Record<string, any>;
  rules: TValidationRules[];
};
