import { Button, Row, Form, Col, Card } from "react-bootstrap"
import MultiSelect from "../MultiSelect"

function ScheduleCreate() {
  const now = new Date()
  const currentYear = now.getFullYear()
  const currentMonth = now.getMonth()

  const weekdays = ["Երկուշաբթի", "Երեքշաբթի", "Չորեքշաբթի", "Հինգշաբթի", "Ուրբաթ", "Շաբաթ", "Կիրակի"]
  const monthLabel = now.toLocaleDateString("hy-AM", { month: "long", year: "numeric" })

  const jsDayOfWeek = new Date(currentYear, currentMonth, 1).getDay()
  const mondayFirstStart = jsDayOfWeek === 0 ? 6 : jsDayOfWeek - 1
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()

  const dayCells = Array.from({ length: mondayFirstStart }, () => null)
  for (let day = 1; day <= daysInMonth; day += 1) {
    dayCells.push(day)
  }

  while (dayCells.length % 7 !== 0) {
    dayCells.push(null)
  }

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
            <h5 className="mb-3">{monthLabel}</h5>

            <Row className="g-2 mb-2">
              {weekdays.map((weekday) => (
                <Col key={weekday}>
                  <Card bg="info" text="white" className="text-center py-2">
                    <small>{weekday}</small>
                  </Card>
                </Col>
              ))}
            </Row>

            {Array.from({ length: dayCells.length / 7 }).map((_, rowIdx) => (
              <Row className="g-2 mb-2" key={rowIdx}>
                {dayCells.slice(rowIdx * 7, rowIdx * 7 + 7).map((day, colIdx) => (
                  <Col key={`${rowIdx}-${colIdx}`}>
                    <Card className="h-100">
                      <Card.Body className="p-2" style={{ minHeight: "120px" }}>
                        {day && (
                          <div>
                            <Card.Title as="h6" className="mb-2">
                              {day}
                            </Card.Title>
                            <Card.Text className="small text-muted mb-1">09:00</Card.Text>
                            <Card.Text className="small text-muted mb-0">22:00</Card.Text>
                          </div>
                        )}
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            ))}
        </div>
    </div>
  )
}

export default ScheduleCreate
