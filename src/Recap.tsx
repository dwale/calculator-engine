import { arrayBuffer } from "stream/consumers";

type RecapData = {
  monthlySalary: string;
  territory: string;
  variables: Array<any>;
  calculations: Array<any>;
};
export default function Recap({ data }: { data: RecapData }) {
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h2>Recap</h2>
        </div>
      </div>
      <div className="row mb-4">
        <div className="col">
          <p>
            salary: {data.monthlySalary}
            {` (${data.territory})`}
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <h3>Variables</h3>
        </div>
      </div>
      {data.variables?.map((variable: any) => (
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
      {data.calculations?.map((calculation: any) => (
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
  );
}
