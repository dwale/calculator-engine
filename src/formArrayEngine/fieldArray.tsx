import { useFieldArray } from "react-hook-form";
import { useFormStepNumber } from "../hooks";
import { CalculationFields } from "./calculationsFormArray";
import { VariablesFields } from "./variablesFormArray";

export const FieldArray = ({ control, register }: any) => {
  const { fields } = useFieldArray({
    control,
    name: "formDetails",
  });

  const { stepNumber } = useFormStepNumber();

  return (
    <>
      <ul>
        {fields.map((item, index) => {
          return (
            <li key={item.id}>
              {(stepNumber === 1 || stepNumber === 4) && (
                <>
                  <label>Territory</label>
                  <select
                    {...register(`formDetails.${index}.territory`)}
                    required
                  >
                    <option disabled value={"default"}>
                      Choose Territory...
                    </option>
                    <option>Brazil</option>
                    <option>France</option>
                    <option>Nigeria</option>
                    <option>Spain</option>
                  </select>

                  <label>Monthly Salary</label>

                  <input
                    type={"number"}
                    required
                    min={1}
                    {...register(`formDetails.${index}.monthlySalary`)}
                  />
                </>
              )}

              {(stepNumber === 2 || stepNumber === 4) && (
                <VariablesFields nestIndex={index} {...{ control, register }} />
              )}

              {(stepNumber === 3 || stepNumber === 4) && (
                <CalculationFields
                  nestIndex={index}
                  {...{ control, register }}
                />
              )}
            </li>
          );
        })}
      </ul>
    </>
  );
};
