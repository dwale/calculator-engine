import { Control, FieldValues, useFieldArray } from "react-hook-form";
import { useFormStepNumber } from "../hooks/useFormStepNumber";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

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
    <>
      {stepNumber === 2 &&
        fields.map((item, k) => {
          return (
            <Container key={item.id}>
              <Row>
                <Col>
                  <label className="form-label">Variable Name</label>
                  <input
                    {...register(
                      `formDetails.${nestIndex}.variables.${k}.variableName`,
                      {
                        pattern: {
                          value: /^[A-Za-z]+$/i,
                          message: "Avoid spaces and numbers in variable names",
                        },
                      }
                    )}
                    style={{ marginRight: "25px" }}
                    className="form-control"
                  />
                </Col>
                <Col>
                  <label className="form-label">Variable Value</label>

                  <input
                    type={"number"}
                    step={"any"}
                    {...register(
                      `formDetails.${nestIndex}.variables.${k}.variableValue`
                    )}
                    className="form-control"
                  />
                </Col>
                <Col>
                  <label className="form-label">Variable Type</label>

                  <select
                    {...register(
                      `formDetails.${nestIndex}.variables.${k}.variableType`
                    )}
                    className="form-select"
                  >
                    <option value="default" disabled>
                      Choose variable type...
                    </option>
                    <option value={"amount"}>Amount</option>
                    <option value={"percentage"}>Percentage (%)</option>
                  </select>
                </Col>
                <Col>
                  <label className="form-label">Notes</label>

                  <input
                    {...register(
                      `formDetails.${nestIndex}.variables.${k}.notes`
                    )}
                    className="form-control"
                  />
                </Col>
                <Col>
                  <button
                    type="button"
                    onClick={() => remove(k)}
                    className="mt-5"
                  >
                    Delete
                  </button>
                </Col>
              </Row>
            </Container>
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
    </>
  );
};
