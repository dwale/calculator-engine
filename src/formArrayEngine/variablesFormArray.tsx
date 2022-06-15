import { Control, FieldValues, useFieldArray } from "react-hook-form";
import { useFormStepNumber } from "../hooks/useFormStepNumber";

type NestedFieldProps = {
  control: Control<FieldValues, any>;
  register: any;
} & { nestIndex: number };

export const VariablesFields = ({
  nestIndex,
  control,
  register,
}: NestedFieldProps) => {
  const { fields, remove, append } = useFieldArray({
    control: control,
    name: `formDetails.${nestIndex}.variables`,
  });

  const { stepNumber } = useFormStepNumber();

  return (
    <div>
      {stepNumber === 2 &&
        fields.map((item, k) => {
          return (
            <div key={item.id} style={{ marginLeft: 20 }}>
              <label>Variable Name</label>

              <input
                {...register(
                  `formDetails.${nestIndex}.variables.${k}.variableName`
                )}
                style={{ marginRight: "25px" }}
              />

              <label>Variable Value</label>

              <input
                type={"number"}
                {...register(
                  `formDetails.${nestIndex}.variables.${k}.variableValue`
                )}
              />
              <label>Variable Type</label>

              <select
                {...register(
                  `formDetails.${nestIndex}.variables.${k}.variableType`
                )}
              >
                <option value="default" disabled>
                  Choose variable type...
                </option>
                <option value={"amount"}>Amount</option>
                <option value={"percentage"}>Percentage (%)</option>
              </select>

              <label>Notes</label>

              <input
                {...register(`formDetails.${nestIndex}.variables.${k}.notes`)}
              />

              <button type="button" onClick={() => remove(k)}>
                Delete variable
              </button>
            </div>
          );
        })}

      {stepNumber === 2 && (
        <button type="button" onClick={() => append({})}>
          Add More Variables
        </button>
      )}

      <hr />
    </div>
  );
};
