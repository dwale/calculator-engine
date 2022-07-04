import { useFieldArray } from "react-hook-form";
import { useFormStepNumber } from "../hooks";
import { CalculationFields } from "./calculationsFormArray";
import { VariablesFields } from "./variablesFormArray";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export const FieldArray = ({ control, register }: any) => {
  const { fields } = useFieldArray({
    control,
    name: "formDetails",
  });

  const { stepNumber } = useFormStepNumber();

  return (
    <Container>
      {fields.map((item, index) => {
        return (
          <Row key={item.id}>
            {(stepNumber === 1 || stepNumber === 4) && (
              <Col>
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
                  <option>United Kingdom</option>
                  <option>Spain</option>
                </select>

                <label>Monthly Salary</label>

                <input
                  type={"number"}
                  step={"any"}
                  required
                  min={1}
                  {...register(`formDetails.${index}.monthlySalary`)}
                />
              </Col>
            )}

            {(stepNumber === 2 || stepNumber === 4) && (
              <VariablesFields nestIndex={index} {...{ control, register }} />
            )}

            {(stepNumber === 3 || stepNumber === 4) && (
              <CalculationFields nestIndex={index} {...{ control, register }} />
            )}
          </Row>
        );
      })}
    </Container>
  );
};
