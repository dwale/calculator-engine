import { Control, FieldValues, useFieldArray } from "react-hook-form";
import { useFormStepNumber } from "../hooks/useFormStepNumber";

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

  const { stepNumber } = useFormStepNumber();

  const testCalculation = (k: number) => {
    console.log(k, "selected Calculation", control.getFieldState);
  };

  return (
    <div>
      {stepNumber === 3 &&
        fields.map((item, k) => {
          return (
            <div key={item.id} style={{ marginLeft: 20 }}>
              <label>Calculation Name</label>

              <input
                {...register(
                  `formDetails.${nestIndex}.calculations.${k}.calculationName`,
                  {
                    required: true,
                  }
                )}
                style={{ marginRight: "25px" }}
              />

              <label>Formula</label>

              <input
                type={"text"}
                {...register(
                  `formDetails.${nestIndex}.calculations.${k}.formula`
                )}
              />

              <label>Notes</label>

              <input
                {...register(
                  `formDetails.${nestIndex}.calculations.${k}.notes`
                )}
              />

              <button type="button" onClick={() => remove(k)}>
                Delete
              </button>

              <button type="button" onClick={() => testCalculation(k)}>
                Test
              </button>
            </div>
          );
        })}

      {stepNumber === 3 && (
        <button type="button" onClick={() => append({})}>
          Add More Calculations
        </button>
      )}

      <hr />
    </div>
  );
};
