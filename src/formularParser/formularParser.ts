import { FieldValues } from "react-hook-form";

type VariableData = {
  variableName: string;
  variableType: string;
  variableValue: number;
  notes: string;
};
export const formularParser = (
  formDetails: FieldValues,
  calculationIndex: number,
  parser: any
): number => {
  parser.setVariable("salary", formDetails.formDetails[0].monthlySalary);
  formDetails.formDetails[0]?.variables?.forEach((variables: VariableData) => {
    const sanitizedVariableNames = variables.variableName.replaceAll(" ", "_"); //white space not supported in variable names
    if (variables.variableType === "percentage") {
      variables.variableValue = variables.variableValue / 100;
    }
    parser.setVariable(sanitizedVariableNames, variables.variableValue);
  });

  return parser.parse(
    formDetails.formDetails[0].calculations[calculationIndex].formula
  ).result;
};
