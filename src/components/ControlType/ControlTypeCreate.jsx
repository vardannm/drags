import { Button, Col, Form, Row } from "react-bootstrap";
import { useState } from "react";
import MultiSelect from "../MultiSelect";
import { BsPencil } from "react-icons/bs";
import { useLocation } from "react-router-dom";
function ControlTypeCreate() {
  const location = useLocation();
  const controlType = location.state?.controlType;
  const isViewMode = Boolean(location.state?.readOnly);
  const [validated, setValidated] = useState(false);
  const options = [
    { label: "Armenia", value: "am" },
    { label: "Georgia", value: "ge" },
    { label: "Russia", value: "ru" },
    { label: "USA", value: "us" },
  ];
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [isReadOnly, setIsReadOnly] = useState(isViewMode);
  const [formValues, setFormValues] = useState({
    code: controlType?.code ?? "",
    descriptionAm: controlType?.descriptionAm ?? "",
    descriptionRu: controlType?.descriptionRu ?? "",
    descriptionEn: controlType?.descriptionEn ?? "",
    validStart: controlType?.validStart ?? "",
    validEnd: controlType?.validEnd ?? "",
  });

  const handleFieldChange = (fieldName) => (event) => {
    setFormValues((prev) => ({
      ...prev,
      [fieldName]: event.target.value,
    }));
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
          <p className="header-name">Ստեղծել հսկողության տեսակ</p>
          <Row>
            <Col md={3}>
              <Form.Group>
                <Form.Label>
                  Ծածկագիր <span className="mandatory-symbol">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  autoComplete="off"
                  required
                  disabled={isReadOnly}
                  value={formValues.code}
                  onChange={handleFieldChange("code")}
                />
                <Form.Control.Feedback type="invalid">
                  Պարտադիր դաշտ է
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label>
                  Նկարագրություն (հայ.){" "}
                  <span className="mandatory-symbol">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  autoComplete="off"
                  required
                  disabled={isReadOnly}
                  value={formValues.descriptionAm}
                  onChange={handleFieldChange("descriptionAm")}
                />
                <Form.Control.Feedback type="invalid">
                  Պարտադիր դաշտ է
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label>
                  Նկարագրություն (ռուս.){" "}
                  <span className="mandatory-symbol">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  autoComplete="off"
                  required
                  disabled={isReadOnly}
                  value={formValues.descriptionRu}
                  onChange={handleFieldChange("descriptionRu")}
                />
                <Form.Control.Feedback type="invalid">
                  Պարտադիր դաշտ է
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label>
                  Նկարագրություն (անգլ.){" "}
                  <span className="mandatory-symbol">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  autoComplete="off"
                  required
                  disabled={isReadOnly}
                  value={formValues.descriptionEn}
                  onChange={handleFieldChange("descriptionEn")}
                />
                <Form.Control.Feedback type="invalid">
                  Պարտադիր դաշտ է
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <p className="mt-3">
            Տեսակ <span className="mandatory-symbol">*</span>
          </p>
          <Row>
            <Col md={1}>
              <Form.Group>
                  <Form.Check
                    inline
                    type="checkbox"
                    className="large-check"
                    label={`Բեռնատար`}
                    id="reverse-checkbox"
                    disabled={isReadOnly}
                  />
              </Form.Group>
            </Col>
            <Col md={1}>
              <Form.Group>
                  <Form.Check
                    inline
                    type="checkbox"
                    className="large-check"
                    label={`Մարդատար`}
                    id="reverse-checkbox"
                    disabled={isReadOnly}
                  />
              </Form.Group>
            </Col>
            <Col md={1}>
              <Form.Group>
                  <Form.Check
                    inline
                    type="checkbox"
                    className="large-check"
                    label={`Ուղևորային`}
                    id="reverse-checkbox"
                    disabled={isReadOnly}
                  />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={3}>
              <Form.Group className="mt-3">
                <Form.Label>
                  Ուղղություն<span className="mandatory-symbol">*</span>
                </Form.Label>
                <Form.Select required defaultValue="" disabled={isReadOnly}>
                  <option value="" disabled>
                    Ընտրել
                  </option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  Պարտադիր դաշտ է
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={3}>
              <Form.Group className="mt-3">
                <Form.Label>
                  ՏՄ բեռնվածություն<span className="mandatory-symbol">*</span>
                </Form.Label>
                <Form.Select required defaultValue="" disabled={isReadOnly}>
                  <option value="" disabled>
                    Ընտրել
                  </option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  Պարտադիր դաշտ է
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group className="mt-3">
                <Form.Label>
                  Պարտադիր <span className="mandatory-symbol">*</span>
                </Form.Label>
                <Form.Select required defaultValue="" disabled={isReadOnly}>
                  <option value="" disabled>
                    Ընտրել
                  </option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  Պարտադիր դաշտ է
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <div className="d-flex align-items-center gap-2 mt-2">
            <p className="pt-2">Ուժի մեջ է այսօրվանից </p>
            <Form.Check type="checkbox" className="large-check" disabled={isReadOnly} />
          </div>
          <Row>
            <Col md={3}>
              <Form.Group>
                <Form.Label>
                  Վավերականության սկիզբ<span className="mandatory-symbol">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  autoComplete="off"
                  required
                  disabled={isReadOnly}
                  value={formValues.validStart}
                  onChange={handleFieldChange("validStart")}
                />
                <Form.Control.Feedback type="invalid">
                  Պարտադիր դաշտ է
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={3}>
              <Form.Group>
                <Form.Label>Վավերական է մինչև</Form.Label>
                <Form.Control
                  type="text"
                  autoComplete="off"
                  disabled={isReadOnly}
                  value={formValues.validEnd}
                  onChange={handleFieldChange("validEnd")}
                />
                <Form.Control.Feedback type="invalid">
                  Պարտադիր դաշտ է
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label>
                  Պաշտոն <span className="mandatory-symbol">*</span>
                </Form.Label>
                <MultiSelect
                  options={options}
                  value={selectedCountries}
                  onChange={setSelectedCountries}
                  placeholder="Choose countries"
                  disabled={isReadOnly}
                />
                <Form.Control.Feedback type="invalid">
                  Պարտադիր դաշտ է
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
        </div>
      </Form>
    </div>
  );
}

export default ControlTypeCreate;
