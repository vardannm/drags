import { Button , Row , Form , Col } from "react-bootstrap"
import MultiSelect from "../MultiSelect"

function ScheduleCreate() {
  return (
    <div>
        <div className="page-card">
        <div className="page-actions">
          <Button variant="cs-blue">
            Ավելացնել
          </Button>
        </div>
        </div>
        <div className="form-card">
            <p className="header-name">Հիմնական</p>
            <Row className="mt-2">
                      <Col md={3}>
                          <Form.Group>
                          <Form.Label>Օգտանուն</Form.Label>
                          <Form.Control type="text"  />
                        </Form.Group>
                      </Col>
                      <Col md={3}>
                        <Form.Group>
                          <Form.Label>Անուն / Ազգանում</Form.Label>
                          <Form.Control
                            type="text"
                            disabled
                          />
                        </Form.Group>
                      </Col>
                      <Col md={3}>
                        <Form.Group>
                          <Form.Label>Պաշտոն</Form.Label>
                          <MultiSelect
                            type="text"
                            
                          />
                        </Form.Group>
                      </Col>
                    </Row>
            <Row className="mt-2">
                      <Col md={3}>
                          <Form.Group>
                          <Form.Label>Օգտանուն</Form.Label>
                          <Form.Control type="text"  />
                        </Form.Group>
                      </Col>
                      <Col md={3}>
                        <Form.Group>
                          <Form.Label>Անուն / Ազգանում</Form.Label>
                          <Form.Control
                            type="text"
                            disabled
                          />
                        </Form.Group>
                      </Col>
                      <Col md={3}>
                        <Form.Group>
                          <Form.Label>Պաշտոն</Form.Label>
                         <Form.Control
                            type="text"
                            
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <div className="d-flex align-items-center gap-2 mt-2">
            <p className="pt-2">Ուժի մեջ է այս պահից </p>
            <Form.Check type="checkbox" className="large-check"  />
          </div>
          <p>Աշխատանքային ժամեր</p>
        </div>
        <div className="form-card my-4">
            <p className="header-name">Օրացույց</p>
            </div>
    </div>
  )
}

export default ScheduleCreate