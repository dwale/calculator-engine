import Table from "react-bootstrap/Table";

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
      <div className="row">
        <div className="col">
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>salary</th>
                <th>territory</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{data.monthlySalary}</td>
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
                <th>variable name</th>
                <th>variable type</th>
                <th>variable value</th>
                <th>notes</th>
              </tr>
            </thead>
            <tbody>
              {data.variables?.map((variable: any, index: number) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{variable.variableName}</td>
                  <td>{variable.variableType}</td>
                  <td>{variable.variableValue}</td>
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
                <th>calculation name</th>
                <th>calculation type</th>
                <th>calculation value</th>
                <th>notes</th>
              </tr>
            </thead>
            <tbody>
              {data.calculations?.map((calculation: any, index: number) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{calculation.calculationName}</td>
                  <td>{calculation.formula}</td>
                  <td>{calculation.testResult}</td>
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
