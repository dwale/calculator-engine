import { useForm } from "react-hook-form";
import { FieldArray } from "./formArrayEngine/fieldArray";

import { useFormStepNumber } from "./hooks/useFormStepNumber";

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
        },
      ],
    },
  ],
};

function App() {
  const { control, register, handleSubmit, getValues, reset, setValue } =
    useForm({
      defaultValues,
    });

  const { stepNumber, setStepNumber } = useFormStepNumber();
  const onSubmit = (data: any) => {
    console.log("data", data);
    if (stepNumber < 3) setStepNumber(stepNumber + 1);

    console.log("data", data, "step", stepNumber);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>OmniAtlas Calculator Engine</h1>

        <FieldArray
          {...{
            control,
            register,
            defaultValues,
            getValues,
            setValue,
          }}
        />

        <input type="submit" value={"Continue"} />
      </form>
    </div>
  );
}

export default App;
