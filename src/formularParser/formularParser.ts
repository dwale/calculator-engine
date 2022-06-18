import { FieldValues } from "react-hook-form";

type VariableData = {
  variableName: string;
  variableType: string;
  variableValue: number;
  parsedVariableValue: number;
  notes: string;
};
export const formularParser = (
  formDetails: FieldValues,
  calculationIndex: number,
  parser: any
): number => {
  parser.setVariable("salary", formDetails.formDetails[0].monthlySalary);
  console.log(formDetails);
  formDetails.formDetails[0]?.variables?.forEach((variables: VariableData) => {
    const sanitizedVariableNames = variables.variableName.replaceAll(" ", "_"); //white space not supported in variable names
    console.log(variables);

    if (variables.variableType === "percentage") {
      variables.parsedVariableValue = Number(variables.variableValue) / 100;
      console.log("Im a percent");
    }
    parser.setVariable(
      sanitizedVariableNames,
      variables.variableType === "percentage"
        ? variables.parsedVariableValue
        : variables.variableValue
    );
  });

  console.log(
    parser.parse(
      formDetails.formDetails[0].calculations[calculationIndex].formula
    )
  );
  return parser.parse(
    formDetails.formDetails[0].calculations[calculationIndex].formula
  ).result;
};
