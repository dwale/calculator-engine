import { createContext, Dispatch, SetStateAction, useState } from "react";

type FormStepState = {
  stepNumber: number;
  setStepNumber: Dispatch<SetStateAction<number>>;
};
const FormStepContext = createContext<FormStepState | null>(null);

const FormStepProvider = ({ children }: { children: any }) => {
  const [stepNumber, setStepNumber] = useState<number>(1);

  return (
    <FormStepContext.Provider value={{ stepNumber, setStepNumber }}>
      {children}
    </FormStepContext.Provider>
  );
};

export { FormStepProvider, FormStepContext };
