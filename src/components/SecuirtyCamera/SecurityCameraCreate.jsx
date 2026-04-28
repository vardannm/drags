import { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { BsPencil } from "react-icons/bs";
import { useLocation } from "react-router-dom";

function SecurityCameraCreate() {
  const location = useLocation();
  const securityCamera = location.state?.securityCamera;
  const [validated, setValidated] = useState(false);
  const [isReadOnly, setIsReadOnly] = useState(Boolean(location.state?.readOnly));
  const [formValues, setFormValues] = useState({
    section: securityCamera?.section ?? "",
    scale: securityCamera?.scale ?? "",
    manufacturer: securityCamera?.manufacturer ?? "",
    model: securityCamera?.model ?? "",
    username: securityCamera?.createdBy ?? "",
    password: "",
    active: securityCamera?.active === "Այո",
    plateRecognition: securityCamera?.plateRecognition === "Այո",
    liveStream: securityCamera?.liveStream === "Այո",
    ipAddress: securityCamera?.address ?? "",
    streamUrl: securityCamera?.liveStream === "Այո" ? "http://camera/live" : "",
    imageUrl: securityCamera?.plateRecognition === "Այո" ? "http://camera/snapshot" : "",
  });

  const handleFieldChange = (fieldName) => (event) => {
    const nextValue = event.target.type === "checkbox" ? event.target.checked : event.target.value;
    setFormValues((prev) => ({ ...prev, [fieldName]: nextValue }));
  };

  const handleSubmit = (event) => {
    if (isReadOnly) {
      return;
    }

    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();

    if (form.checkValidity()) {
      // TODO: connect submit API call here once endpoint is ready.
    }

    setValidated(true);
  };

  return (
    <div>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <div className="page-card">
          <div className="page-actions">
            {isReadOnly && (
              <Button variant="outline-cs-blue" onClick={() => setIsReadOnly(false)}>
                <BsPencil className="me-1" />
                Խմբագրել
              </Button>
            )}
            <Button variant="cs-blue" type="submit" disabled={isReadOnly}>
              Ավելացնել
            </Button>
          </div>
        </div>
        <div className="form-card">
          <p className="header-name">Ստեղծել սեսախցիկ</p>
          <fieldset disabled={isReadOnly}>
            <Row>
            <Col md={3}>
         <Form.Group>
                    <Form.Label>Մաքսային տեղամասեր<span className="mandatory-symbol">*</span></Form.Label>
                    <Form.Select required value={formValues.section} onChange={handleFieldChange("section")}>
                      {!formValues.section && <option value="" disabled>Ընտրել</option>}
                      {formValues.section && <option value={formValues.section}>{formValues.section}</option>}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">Պարտադիր դաշտ է</Form.Control.Feedback>
                  </Form.Group>
                     </Col>
                     <Col md={3}>
                  <Form.Group>
                    <Form.Label>Կշեռք <span className="mandatory-symbol">*</span></Form.Label>
                    <Form.Select required value={formValues.scale} onChange={handleFieldChange("scale")}>
                      {!formValues.scale && <option value="" disabled>Ընտրել</option>}
                      {formValues.scale && <option value={formValues.scale}>{formValues.scale}</option>}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">Պարտադիր դաշտ է</Form.Control.Feedback>
                  </Form.Group>
                  </Col>
                    <Col md={3}>
                  <Form.Group>
                    <Form.Label>Տեսախցիկի արտադրող <span className="mandatory-symbol">*</span></Form.Label>
                    <Form.Select required value={formValues.manufacturer} onChange={handleFieldChange("manufacturer")}>
                      {!formValues.manufacturer && <option value="" disabled>Ընտրել</option>}
                      {formValues.manufacturer && <option value={formValues.manufacturer}>{formValues.manufacturer}</option>}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">Պարտադիր դաշտ է</Form.Control.Feedback>
                  </Form.Group>
                    </Col>
                        <Col md={3}>
                  <Form.Group>
                    <Form.Label>Տեսախցիկի մոդել <span className="mandatory-symbol">*</span></Form.Label>
                    <Form.Select required value={formValues.model} onChange={handleFieldChange("model")}>
                      {!formValues.model && <option value="" disabled>Ընտրել</option>}
                      {formValues.model && <option value={formValues.model}>{formValues.model}</option>}
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
                      value={formValues.username}
                      onChange={handleFieldChange("username")}
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
                     value={formValues.password}
                     onChange={handleFieldChange("password")}
                    />
                  </Form.Group>
                    </Col>
                  </Row>
                  <Form.Group className="mt-3">
                    
                    <Form.Check
                      type="checkbox"
                      className="large-check"
                      label={`Ակտիվ`}
                      checked={formValues.active}
                      onChange={handleFieldChange("active")}
                    />
                    <Form.Text muted>Լինի ակտիվ թե ոչ</Form.Text>
                  </Form.Group>
                  <Form.Group className="mt-3">
                    <Form.Check
                      type="checkbox"
                      className="large-check"
                      label={`Պետհամարնիշերի ճանաչում`}
                      id="reverse-checkbox" 
                      checked={formValues.plateRecognition}
                      onChange={handleFieldChange("plateRecognition")}
                    />
                    <Form.Text muted>Կատարելու է համարների ճանաչում թե ոչ</Form.Text>
                  </Form.Group>
                  <Form.Group className="mt-3">
                    <Form.Check
                      type="checkbox"
                      className=" large-check"
                      label={`Առցանց հեռարձակում`}
                      checked={formValues.liveStream}
                      onChange={handleFieldChange("liveStream")}
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
                      value={formValues.ipAddress}
                      onChange={handleFieldChange("ipAddress")}
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
                      value={formValues.streamUrl}
                      onChange={handleFieldChange("streamUrl")}
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
                      value={formValues.imageUrl}
                      onChange={handleFieldChange("imageUrl")}
                    />
                    <Form.Text muted>
                      Կարող է լինել դատարկ կամ կարող է պարունակել մինչև 350 նիշ:
                    </Form.Text>
                  </Form.Group>
                    </Col>
                    </Row>
          </fieldset>
        </div>
      </Form>
    </div>
  );
}

export default SecurityCameraCreate;
