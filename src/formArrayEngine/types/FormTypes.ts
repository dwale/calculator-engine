import {
  ChangeHandler,
  Control,
  FieldValues,
  Message,
  ValidationRule,
} from "react-hook-form";

export type RegisterOptions = Partial<{
  required: Message | ValidationRule<boolean>;
  min: ValidationRule<number | string>;
  max: ValidationRule<number | string>;
  maxLength: ValidationRule<number | string>;
  minLength: ValidationRule<number | string>;
  pattern: ValidationRule<RegExp>;
  validate: any | Record<string, any>;
}>;

export type FieldArrayProps = {
  control: Control<FieldValues, any>;
  register: (
    name: string,
    RegisterOptions?: RegisterOptions
  ) => {
    onChange: ChangeHandler;
    onBlur: ChangeHandler;
    name: string;
    ref: React.Ref<any>;
  };
  setValue: (name: string, value: any, config?: Object) => void;
  getValues: (payload?: string | string[]) => Object;
};
