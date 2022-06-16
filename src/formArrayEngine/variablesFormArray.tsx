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
    <div className="container-lg">
      {stepNumber === 2 &&
        fields.map((item, k) => {
          return (
            <>
              <div key={item.id} className="row ms-4">
                <div className="col">
                  <label className="form-label">Variable Name</label>
                  <input
                    {...register(
                      `formDetails.${nestIndex}.variables.${k}.variableName`,
                      {
                        pattern: {
                          value: /^[A-Za-z]+$/i,
                          message: "numbers are not allowed",
                        },
                      }
                    )}
                    style={{ marginRight: "25px" }}
                    className="form-control"
                  />
                </div>
                <div className="col">
                  <label className="form-label">Variable Value</label>

                  <input
                    type={"number"}
                    {...register(
                      `formDetails.${nestIndex}.variables.${k}.variableValue`
                    )}
                    className="form-control"
                  />
                </div>
                <div className="col">
                  <label className="form-label">Variable Type</label>

                  <select
                    {...register(
                      `formDetails.${nestIndex}.variables.${k}.variableType`
                    )}
                    class="form-select"
                  >
                    <option value="default" disabled>
                      Choose variable type...
                    </option>
                    <option value={"amount"}>Amount</option>
                    <option value={"percentage"}>Percentage (%)</option>
                  </select>
                </div>
                <div className="col">
                  <label className="form-label">Notes</label>

                  <input
                    {...register(
                      `formDetails.${nestIndex}.variables.${k}.notes`
                    )}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="row ms-4 mt-4">
                <div className="col">
                  <button
                    type="button"
                    onClick={() => remove(k)}
                    className="align-baseline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </>
          );
        })}

      {stepNumber === 2 && (
        <div className="row">
          <div className="col-6">
            <button className="mt-5" type="button" onClick={() => append({})}>
              Add More Variables
            </button>
          </div>
        </div>
      )}

      <hr />
    </div>
  );
};
