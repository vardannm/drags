import { useState } from "react"
import { Form, Row, Col, Button } from "react-bootstrap"

function SecurityCameraCreate() {
  const [validated, setValidated] = useState(false)

  const handleSubmit = (event) => {
    const form = event.currentTarget
    event.preventDefault()
    event.stopPropagation()

    if (form.checkValidity()) {
      // TODO: connect submit API call here once endpoint is ready.
    }

    setValidated(true)
  }

  return (
    <div>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <div className="page-card">
          <div className="page-actions">
            <Button variant="cs-blue" type="submit">
              Ավելացնել
            </Button>
          </div>
        </div>
        <div className="form-card">
        <p className="header-name">Ստեղծել սեսախցիկ</p>
        <Row>
            <Col md={3}>
         <Form.Group>
                    <Form.Label>Մաքսային տեղամասեր<span className="mandatory-symbol">*</span></Form.Label>
                    <Form.Select required defaultValue="">
                      <option value="" disabled>Ընտրել</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">Պարտադիր դաշտ է</Form.Control.Feedback>
                  </Form.Group>
                     </Col>
                     <Col md={3}>
                  <Form.Group>
                    <Form.Label>Կշեռք <span className="mandatory-symbol">*</span></Form.Label>
                    <Form.Select required defaultValue="">
                      <option value="" disabled>Ընտրել</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">Պարտադիր դաշտ է</Form.Control.Feedback>
                  </Form.Group>
                  </Col>
                    <Col md={3}>
                  <Form.Group>
                    <Form.Label>Տեսախցիկի արտադրող <span className="mandatory-symbol">*</span></Form.Label>
                    <Form.Select required defaultValue="">
                      <option value="" disabled>Ընտրել</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">Պարտադիր դաշտ է</Form.Control.Feedback>
                  </Form.Group>
                    </Col>
                        <Col md={3}>
                  <Form.Group>
                    <Form.Label>Տեսախցիկի մոդել <span className="mandatory-symbol">*</span></Form.Label>
                    <Form.Select required defaultValue="">
                      <option value="" disabled>Ընտրել</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">Պարտադիր դաշտ է</Form.Control.Feedback>
                  </Form.Group>
                    </Col>
                  </Row>
                  <Row  className="mt-3">
                     <Col md={3}>
                  <Form.Group>
                    <Form.Label>Ծածկանուն</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Մուտքագրել մոդելը"
                      autoComplete="off"
                    />
                  </Form.Group>
                  </Col>
                   <Col md={3}>
                  <Form.Group>
                    <Form.Label>Գաղտնաբառ</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Մուտքագրել մոդելը"
                     autoComplete="new-password"
                    />
                  </Form.Group>
                    </Col>
                  </Row>
                  <Form.Group className="mt-3">
                    
                    <Form.Check type="checkbox" className="large-check" label={`Ակտիվ`} />
                    <Form.Text muted>Լինի ակտիվ թե ոչ</Form.Text>
                  </Form.Group>
                  <Form.Group className="mt-3">
                    <Form.Check
                      type="checkbox"
                      className="large-check"
                      label={`Պետհամարնիշերի ճանաչում`}
                      id="reverse-checkbox" 
                    />
                    <Form.Text muted>Կատարելու է համարների ճանաչում թե ոչ</Form.Text>
                  </Form.Group>
                  <Form.Group className="mt-3">
                    <Form.Check
                      type="checkbox"
                      className=" large-check"
                      label={`Առցանց հեռարձակում`}
                    />
                    <Form.Text muted>Կատարելու է առցանց հեռարձակում թե ոչ</Form.Text>
                  </Form.Group>
                  <Row className="mt-3">
                    <Col md={3}>
                  <Form.Group className="mt-3">
                    <Form.Label>IP հասցե <span className="mandatory-symbol">*</span></Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Մուտքագրել հասցեն"
                      autoComplete="off"
                      required
                    />
                    <Form.Control.Feedback type="invalid">Պարտադիր դաշտ է</Form.Control.Feedback>
                    <Form.Text muted>Կատարելու է առցանց հեռարձակում թե ոչ</Form.Text>
                  </Form.Group>
                    </Col>
                        <Col md={3}>
                  <Form.Group className="mt-3">
                    <Form.Label>Առցանց հեռարձակման հղում</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Առցանց հեռարձակման հղում"
                      autoComplete="off"
                    />
                    <Form.Text muted>
                      Կարող է լինել դատարկ կամ կարող է պարունակել մինչև 350 նիշ:
                    </Form.Text>
                  </Form.Group>
                    </Col>
                     <Col md={3}>
                  <Form.Group className="mt-3">
                    <Form.Label>Նկարի հարցման հղում</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Նկարի հարցման հղում"
                      autoComplete="off"
                    />
                    <Form.Text muted>
                      Կարող է լինել դատարկ կամ կարող է պարունակել մինչև 350 նիշ:
                    </Form.Text>
                  </Form.Group>
                    </Col>
                    </Row>
    </div>
    </Form>
    </div>
  )
}

export default SecurityCameraCreate
