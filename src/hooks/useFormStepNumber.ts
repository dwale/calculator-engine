import { useContext } from "react";
import { FormStepContext } from "../FormStepContext";

export const useFormStepNumber = () => {
  const context = useContext(FormStepContext);

  if (!context) {
    throw new Error("cant find FormStepStateProvider");
  }

  return context;
};
