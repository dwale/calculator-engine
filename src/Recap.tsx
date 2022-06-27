import Table from "react-bootstrap/Table";

type RecapData = {
  monthlySalary: number;
  territory: string;
  variables: Record<string, number>[];
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
      <div className="row">
        <div className="col">
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>Salary</th>
                <th>Territory</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  {data.monthlySalary.toLocaleString("en-US", {
                    style: "currency",
                    currency: "EUR",
                    maximumFractionDigits: 2,
                  })}
                </td>
                <td>{data.territory}</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <h3>Variables</h3>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>#</th>
                <th>Variable Name</th>
                <th>Variable Type</th>
                <th>Variable Value</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {data.variables?.map((variable: any, index: number) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{variable.variableName}</td>
                  <td>{variable.variableType}</td>
                  <td>€{Number(variable.variableValue).toFixed(2)}</td>
                  <td>{variable.notes}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <h3>Calculated costs</h3>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>#</th>
                <th>Calculation Name</th>
                <th>Formula</th>
                <th>Calculation Value</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {data.calculations?.map((calculation: any, index: number) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{calculation.calculationName}</td>
                  <td>{calculation.formula}</td>
                  <td>
                    {calculation.testResult.toLocaleString("en-US", {
                      style: "currency",
                      currency: "EUR",
                      maximumFractionDigits: 2,
                    })}
                  </td>
                  <td>{calculation.notes}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}
