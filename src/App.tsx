import { useForm } from "react-hook-form";
import { FieldArray } from "./formArrayEngine/fieldArray";
import { useFormStepNumber } from "./hooks/useFormStepNumber";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Recap from "./Recap";

const defaultValues = {
  formDetails: [
    {
      territory: "default",
      monthlySalary: "",

      variables: [
        {
          variableName: "",
          variableValue: "",
          variableType: "default",
          notes: "",
          parsedVariableValue: 0,
        },
      ],
      calculations: [
        {
          calculationName: "",
          formula: "",
          notes: "",
          testResult: 0,
        },
      ],
    },
  ],
};

function App() {
  const {
    control,
    register,
    handleSubmit,
    getValues,
    // reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues,
  });
  const { stepNumber, setStepNumber } = useFormStepNumber();
  const [data, setData] = useState<any>();

  const onSubmit = (formData: any) => {
    if (stepNumber < 5) {
      setStepNumber(stepNumber + 1);
      setData(formData);
    }
    console.log(formData);
  };

  console.log("data", data, "step", stepNumber);
  return (
    <Container
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Row>
        <Col>
          <form onSubmit={handleSubmit(onSubmit)}>
            <h1>OmniAtlas Calculator Engine</h1>
            {errors && Array.isArray(errors.formDetails) && (
              <p className="text-danger">
                {errors.formDetails[0].variables?.map(
                  (variable) => variable?.variableName?.message
                )}
              </p>
            )}
            {stepNumber < 4 && (
              <FieldArray
                {...{
                  control,
                  register,
                  defaultValues,
                  getValues,
                  setValue,
                }}
              />
            )}
            {(stepNumber === 4 || stepNumber === 5) && (
              <Recap data={data?.formDetails[0]} />
            )}

            <Modal show={Boolean(stepNumber === 5)} centered size="lg">
              {/* onHide={handleClose} */}
              <Modal.Body>
                <p className="text-center" style={{ color: "black" }}>
                  By saving this data it will be available on the
                  OmniCalculator, so can other use it. If you are sure about the
                  results of your calculations, you can proceed by saving.
                </p>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setStepNumber(4)}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={() => setStepNumber(6)}>
                  Save
                </Button>
              </Modal.Footer>
            </Modal>
            {stepNumber === 6 && (
              <p className="mt-5 text-center">
                Data has been saved on the OmniCalculator.
              </p>
            )}

            <div style={{ display: "flex", flexDirection: "row" }}>
              {stepNumber < 6 && (
                <input type="submit" style={{ flex: 1 }} value="Continue" />
              )}
              {stepNumber > 1 && stepNumber < 6 && (
                <Button
                  variant="secondary"
                  onClick={() => setStepNumber(stepNumber - 1)}
                  style={{ flex: 1, marginLeft: "2rem" }}
                >
                  back
                </Button>
              )}
            </div>
          </form>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
