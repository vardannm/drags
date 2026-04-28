import { useState } from "react"
import { Button, Row, Form, Col, Card } from "react-bootstrap"
import MultiSelect from "../MultiSelect"

function ScheduleCreate() {
  const now = new Date()
  const [calendarScale, setCalendarScale] = useState(1)
  const weekdays = ["Երկուշաբթի", "Երեքշաբթի", "Չորեքշաբթի", "Հինգշաբթի", "Ուրբաթ", "Շաբաթ", "Կիրակի"]
  const months = Array.from({ length: 12 }, (_, index) => {
    const monthDate = new Date(now.getFullYear(), now.getMonth() + index, 1)
    const monthLabel = monthDate.toLocaleDateString("hy-AM", { month: "long", year: "numeric" })
    const jsDayOfWeek = monthDate.getDay()
    const mondayFirstStart = jsDayOfWeek === 0 ? 6 : jsDayOfWeek - 1
    const daysInMonth = new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 0).getDate()

    const dayCells = Array.from({ length: mondayFirstStart }, () => null)
    for (let day = 1; day <= daysInMonth; day += 1) {
      dayCells.push(day)
    }

    while (dayCells.length % 7 !== 0) {
      dayCells.push(null)
    }

    return { monthLabel, dayCells, key: `${monthDate.getFullYear()}-${monthDate.getMonth()}` }
  })
  const increaseScale = () => setCalendarScale((prev) => Math.min(1.4, Number((prev + 0.1).toFixed(2))))
  const decreaseScale = () => setCalendarScale((prev) => Math.max(0.8, Number((prev - 0.1).toFixed(2))))

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
            <div className="d-flex align-items-center justify-content-between mb-2">
              <p className="header-name mb-0">Օրացույց</p>
              <div className="d-flex gap-2">
                <Button variant="outline-secondary" size="sm" onClick={decreaseScale}>
                  -
                </Button>
                <Button variant="outline-secondary" size="sm" onClick={increaseScale}>
                  +
                </Button>
              </div>
            </div>
            <div className="d-flex gap-3 overflow-auto pb-2" style={{ scrollSnapType: "x mandatory" }}>
              {months.map(({ monthLabel, dayCells, key }) => (
                <Card
                  key={key}
                  className="flex-shrink-0"
                  style={{
                    minWidth: `${1100 * calendarScale}px`,
                    scrollSnapAlign: "start",
                    transform: `scale(${calendarScale})`,
                    transformOrigin: "top left",
                  }}
                >
                  <Card.Body>
                    <h5 className="mb-3" style={{ fontSize: `${1.25 * calendarScale}rem` }}>{monthLabel}</h5>

                    <Row className="g-2 mb-2">
                      {weekdays.map((weekday) => (
                        <Col key={`${key}-${weekday}`}>
                          <Card bg="cs-blue"  text="white" className="text-center py-2 custom-card">
                            <small style={{ fontSize: `${0.875 * calendarScale}rem` }}>{weekday}</small>
                          </Card>
                        </Col>
                      ))}
                    </Row>

                    {Array.from({ length: dayCells.length / 7 }).map((_, rowIdx) => (
                      <Row className="g-2 mb-2" key={`${key}-${rowIdx}`}>
                        {dayCells.slice(rowIdx * 7, rowIdx * 7 + 7).map((day, colIdx) => (
                          <Col key={`${key}-${rowIdx}-${colIdx}`}>
                            <Card className="h-100">
                              <Card.Body className="p-2" style={{ minHeight: `${120 * calendarScale}px` }}>
                                {day && (
                                  <div>
                                    <Card.Title as="h6" className="mb-2">
                                     
                                      <Col md={12}><Form.Control disabled value={day}/></Col>
                                    </Card.Title>
                                    <Card.Text className="small text-muted mb-1"><Col md={12}><Form.Control disabled placeholder="09:00"/></Col></Card.Text>
                                    <Card.Text className="small text-muted mb-0"><Col md={12}><Form.Control disabled placeholder="22:00"/></Col></Card.Text>
                                  </div>

                                )}
                              </Card.Body>
                            </Card>
                          </Col>
                        ))}
                      </Row>
                    ))}
                  </Card.Body>
                </Card>
              ))}
            </div>
        </div>
    </div>
  )
}

export default ScheduleCreate
