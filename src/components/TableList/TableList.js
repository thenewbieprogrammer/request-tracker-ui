/*!


*/
import React from "react";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
} from "reactstrap";

function Tables() {
  return (
    <>
      <div className="content">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Reports</CardTitle>
              </CardHeader>
              <CardBody>
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Reported By</th>
                      <th>Assigned To</th>
                      <th>Date Reported</th>
                      <th>Date Completed</th>
                      <th>Urgency</th>
                      <th>Summary</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>bilaal</td>
                      <td>bob</td>
                      <td>2012-10-16T17:57:28.556094Z</td>
                      <td>2013-10-16T17:57:28.556094Z</td>
                      <td>High</td>
                      <td>this is a report that requires xyz jobs...</td>
                    </tr>
                    <tr>
                      <td>john</td>
                      <td>bob</td>
                      <td>2017-10-16T17:57:28.556094Z</td>
                      <td>2018-10-16T17:57:28.556094Z</td>
                      <td>High</td>
                      <td>this is a report that requires xyz jobs...</td>
                    </tr>
                    <tr>
                      <td>bob</td>
                      <td>john</td>
                      <td>2021-10-16T17:57:28.556094Z</td>
                      <td>2022-10-16T17:57:28.556094Z</td>
                      <td>High</td>
                      <td>this is a report that requires xyz jobs...</td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
          {/* <Col md="12">
            <Card className="card-plain">
              <CardHeader>
                <CardTitle tag="h4">Table on Plain Background</CardTitle>
                <p className="category">Here is a subtitle for this table</p>
              </CardHeader>
              <CardBody>
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Name</th>
                      <th>Country</th>
                      <th>City</th>
                      <th className="text-center">Salary</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Dakota Rice</td>
                      <td>Niger</td>
                      <td>Oud-Turnhout</td>
                      <td className="text-center">$36,738</td>
                    </tr>
                    <tr>
                      <td>Minerva Hooper</td>
                      <td>Cura??ao</td>
                      <td>Sinaai-Waas</td>
                      <td className="text-center">$23,789</td>
                    </tr>
                    <tr>
                      <td>Sage Rodriguez</td>
                      <td>Netherlands</td>
                      <td>Baileux</td>
                      <td className="text-center">$56,142</td>
                    </tr>
                    <tr>
                      <td>Philip Chaney</td>
                      <td>Korea, South</td>
                      <td>Overland Park</td>
                      <td className="text-center">$38,735</td>
                    </tr>
                    <tr>
                      <td>Doris Greene</td>
                      <td>Malawi</td>
                      <td>Feldkirchen in K??rnten</td>
                      <td className="text-center">$63,542</td>
                    </tr>
                    <tr>
                      <td>Mason Porter</td>
                      <td>Chile</td>
                      <td>Gloucester</td>
                      <td className="text-center">$78,615</td>
                    </tr>
                    <tr>
                      <td>Jon Porter</td>
                      <td>Portugal</td>
                      <td>Gloucester</td>
                      <td className="text-center">$98,615</td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col> */}
        </Row>
      </div>
    </>
  );
}

export default Tables;
