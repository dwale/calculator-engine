import { useForm } from "react-hook-form";
import { FieldArray } from "./formArrayEngine/fieldArray";
import { useFormStepNumber } from "./hooks/useFormStepNumber";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";

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
    if (stepNumber < 4) {
      setStepNumber(stepNumber + 1);
      setData(formData);
    } else if (stepNumber === 4) {
      //show modal
    }
  };

  console.log("data", data, "step", stepNumber);
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>OmniAtlas Calculator Engine</h1>
        {errors && Array.isArray(errors.formDetails) && (
          <span style={{ color: "red" }}>
            {errors.formDetails[0].variables?.map(
              (variable) => variable?.variableName?.message
            )}
          </span>
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

        {stepNumber === 4 && (
          <div className="container">
            <div className="row">
              <div className="col">
                <h2>Recap</h2>
              </div>
            </div>
            <div className="row mb-4">
              <div className="col">
                <p>salary: {data?.formDetails[0].monthlySalary}</p>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <h3>Variables</h3>
              </div>
            </div>
            {data?.formDetails[0].variables?.map((variable: any) => (
              <div className="row mb-4">
                <div className="col">
                  <p>{variable.variableName}</p>
                </div>
                <div className="col">
                  <p>{variable.variableType}</p>
                </div>
                <div className="col">
                  <p>{variable.variableValue}</p>
                </div>
                <div className="col">
                  <p>{variable.notes}</p>
                </div>
              </div>
            ))}

            <div className="row">
              <div className="col">
                <h3>Calculated costs</h3>
              </div>
            </div>
            {data?.formDetails[0].calculations?.map((calculation: any) => (
              <div className="row">
                <div className="col">
                  <p>{calculation.calculationName}</p>
                </div>
                <div className="col">
                  <p>{calculation.formula}</p>
                </div>
                <div className="col">
                  <p>{calculation.testResult}</p>
                </div>
                <div className="col">
                  <p>{calculation.notes}</p>
                </div>
              </div>
            ))}
          </div>
        )}
        {stepNumber === 5 && (
          <Modal.Dialog>
            <Modal.Header closeButton>
              <Modal.Title>Modal title</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <p>
                By saving this data it will be available on the OmniCalculator,
                so can other use it. If you are sure about the results of your
                calculations, you can proceed by saving
              </p>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary">Cancel</Button>
              <Button variant="primary">Save</Button>
            </Modal.Footer>
          </Modal.Dialog>
        )}
        <input type="submit" value={"Continue"} />
      </form>
    </div>
  );
}

export default App;
