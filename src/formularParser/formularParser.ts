import { FieldValues } from "react-hook-form";
const FormulaParser = require("hot-formula-parser").Parser;
const SUPPORTED_FORMULAS = require("hot-formula-parser").SUPPORTED_FORMULAS;

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
  //   const parser = new FormulaParser();
  console.log(formDetails.formDetails);

  parser.setVariable("salary", formDetails.formDetails[0].monthlySalary);
  formDetails.formDetails[0]?.variables?.forEach((variables: VariableData) => {
    const sanitisedVariableName = variables.variableName.replaceAll(" ", "_"); //white space not supported in variable names
    console.log(sanitisedVariableName, "sanitisedVariableName");
    if (variables.variableType === "percentage") {
      variables.variableValue = variables.variableValue / 100;
    }
    parser.setVariable(sanitisedVariableName, Number(variables.variableValue));
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
