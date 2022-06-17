import { useCallback, useState } from "react";
import { Control, FieldValues, useFieldArray } from "react-hook-form";
import { formularParser } from "../formularParser";
import { useFormStepNumber } from "../hooks/useFormStepNumber";
const FormulaParser = require("hot-formula-parser").Parser;

const parser = new FormulaParser();

type NestedFieldProps = {
  control: Control<FieldValues, any>;
  register: any;
} & { nestIndex: number };

export const CalculationFields = ({
  nestIndex,
  control,
  register,
}: NestedFieldProps) => {
  const { fields, remove, append } = useFieldArray({
    control: control,
    name: `formDetails.${nestIndex}.calculations`,
  });

  const formDetails = control._formValues.formDetails[0];

  const { stepNumber } = useFormStepNumber();

  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({} as any), []);

  const testCalculation = (calculatonIndex: number) => {
    console.log(calculatonIndex, "selected Calculation", control._formValues);
    formDetails.calculations[calculatonIndex].testResult = formularParser(
      control._formValues,
      calculatonIndex,
      parser
    );
    parser.setVariable(
      formDetails.calculations[calculatonIndex].calculationName,
      formDetails.calculations[calculatonIndex].testResult
    );
    forceUpdate();
  };

  return (
    <div>
      {stepNumber === 3 &&
        fields.map((item, calculatonIndex) => {
          return (
            <div key={item.id} style={{ marginLeft: 20 }}>
              <label>Calculation Name</label>

              <input
                {...register(
                  `formDetails.${nestIndex}.calculations.${calculatonIndex}.calculationName`,
                  {
                    required: true,
                  }
                )}
                style={{ marginRight: "25px" }}
              />

              <label>Formula</label>

              <div>
                <span>
                  <div className="simple_row">
                    <input
                      type={"text"}
                      {...register(
                        `formDetails.${nestIndex}.calculations.${calculatonIndex}.formula`
                      )}
                    />
                    <button
                      type="button"
                      style={{ marginLeft: "10px" }}
                      onClick={() => testCalculation(calculatonIndex)}
                    >
                      Test
                    </button>
                  </div>

                  {formDetails.calculations[calculatonIndex] && (
                    <p>
                      Result:{" "}
                      {formDetails.calculations[
                        calculatonIndex
<<<<<<< HEAD
                      ]?.testResult?.toLocaleString()}
=======
                      ].testResult?.toLocaleString()}
>>>>>>> 800d40fd866224e578b2a9774dea1cb384bf0ecc
                    </p>
                  )}
                </span>
              </div>

              <label>Notes</label>

              <input
                {...register(
                  `formDetails.${nestIndex}.calculations.${calculatonIndex}.notes`
                )}
              />

              <button
                type="button"
                onClick={() => remove(calculatonIndex)}
                className="mt-4"
              >
                Delete
              </button>
            </div>
          );
        })}

      {stepNumber === 3 && (
        <button
          type="button"
          onClick={() => append({})}
          style={{ marginTop: "3rem" }}
        >
          Add More Calculations
        </button>
      )}

      <hr />
    </div>
  );
};
