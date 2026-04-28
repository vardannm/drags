import React from "react";
import { Button, Form, Row, Col, Table } from "react-bootstrap";
import { BsChevronDoubleRight, BsChevronRight, BsGearWide, BsPencil } from "react-icons/bs";
import { IoTrashOutline } from "react-icons/io5";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

function ControlTypeSearch() {
  const navigate = useNavigate();
  const initialFilters = {
    code: "",
    descriptionAm: "",
    descriptionRu: "",
    descriptionEn: "",
    zone: "",
    dateFrom: "",
    dateTo: "",
    extra: "",
    position: "",
    direction: "",
    type: "",
  };
  const [filters, setFilters] = useState(initialFilters);
  const fakeData = useMemo(
    () => [
      {
        id: 1,
        ordinalNumber: "001",
        code: "28",
        descriptionAm: "Բեռնատար",
        descriptionRu: "Грузовой",
        descriptionEn: "Truck",
        validStart: "01/01/2024",
        validEnd: "31/12/2024",
      },
      {
        id: 2,
        ordinalNumber: "002",
        code: "28",
        descriptionAm: "Ավտոբուս",
        descriptionRu: "Автобус",
        descriptionEn: "Bus",
        validStart: "01/01/2024",
        validEnd: "31/12/2024",
      },
      {
        id: 3,
        ordinalNumber: "003",
        code: "28",
        descriptionAm: "Մինիվեն",
        descriptionRu: "Минивэн",
        descriptionEn: "Minivan",
        validStart: "01/01/2024",
        validEnd: "31/12/2024",
      },
      {
        id: 4,
        ordinalNumber: "004",
        code: "29",
        descriptionAm: "Մոտոցիկլետ",
        descriptionRu: "Мотоцикл",
        descriptionEn: "Motorcycle",
        validStart: "01/01/2024",
        validEnd: "31/12/2024",
      },
      {
        id: 5,
        ordinalNumber: "005",
        code: "29",
        descriptionAm: "Սկուտեր",
        descriptionRu: "Скутер",
        descriptionEn: "Scooter",
        validStart: "01/01/2024",
        validEnd: "31/12/2024",
      },
      {
        id: 6,
        ordinalNumber: "006",
        code: "30",
        descriptionAm: "Հեծանիվ",
        descriptionRu: "Велосипед",
        descriptionEn: "Bicycle",
        validStart: "01/01/2024",
        validEnd: "31/12/2024",
      },
      {
        id: 7,
        ordinalNumber: "007",
        code: "30",
        descriptionAm: "Տրակտոր",
        descriptionRu: "Трактор",
        descriptionEn: "Tractor",
        validStart: "01/01/2024",
        validEnd: "31/12/2024",
      },
      {
        id: 8,
        ordinalNumber: "008",
        code: "31",
        descriptionAm: "Էքսկավատոր",
        descriptionRu: "Экскаватор",
        descriptionEn: "Excavator",
        validStart: "01/01/2024",
        validEnd: "31/12/2024",
      },
      {
        id: 9,
        ordinalNumber: "009",
        code: "31",
        descriptionAm: "Բուլդոզեր",
        descriptionRu: "Бульдозер",
        descriptionEn: "Bulldozer",
        validStart: "01/01/2024",
        validEnd: "31/12/2024",
      },
      {
        id: 10,
        ordinalNumber: "010",
        code: "32",
        descriptionAm: "Կռունկ",
        descriptionRu: "Кран",
        descriptionEn: "Crane",
        validStart: "01/01/2024",
        validEnd: "31/12/2024",
      },
      {
        id: 11,
        ordinalNumber: "011",
        code: "32",
        descriptionAm: "Բետոնախառնիչ",
        descriptionRu: "Бетономешалка",
        descriptionEn: "Concrete Mixer",
        validStart: "01/01/2024",
        validEnd: "31/12/2024",
      },
      {
        id: 12,
        ordinalNumber: "012",
        code: "33",
        descriptionAm: "Սառնարան",
        descriptionRu: "Рефрижератор",
        descriptionEn: "Refrigerator Truck",
        validStart: "01/01/2024",
        validEnd: "31/12/2024",
      },
      {
        id: 13,
        ordinalNumber: "013",
        code: "33",
        descriptionAm: "Ցիստեռն",
        descriptionRu: "Цистерна",
        descriptionEn: "Tanker",
        validStart: "01/01/2024",
        validEnd: "31/12/2024",
      },
      {
        id: 14,
        ordinalNumber: "014",
        code: "34",
        descriptionAm: "Ինքնաթափ",
        descriptionRu: "Самосвал",
        descriptionEn: "Dump Truck",
        validStart: "01/01/2024",
        validEnd: "31/12/2024",
      },
      {
        id: 15,
        ordinalNumber: "015",
        code: "34",
        descriptionAm: "Էվակուատոր",
        descriptionRu: "Эвакуатор",
        descriptionEn: "Tow Truck",
        validStart: "01/01/2024",
        validEnd: "31/12/2024",
      },
      {
        id: 16,
        ordinalNumber: "016",
        code: "35",
        descriptionAm: "Հրշեջ մեքենա",
        descriptionRu: "Пожарная машина",
        descriptionEn: "Fire Truck",
        validStart: "01/01/2024",
        validEnd: "31/12/2024",
      },
      {
        id: 17,
        ordinalNumber: "017",
        code: "35",
        descriptionAm: "Շտապօգնություն",
        descriptionRu: "Скорая помощь",
        descriptionEn: "Ambulance",
        validStart: "01/01/2024",
        validEnd: "31/12/2024",
      },
      {
        id: 18,
        ordinalNumber: "018",
        code: "36",
        descriptionAm: "Ոստիկանություն",
        descriptionRu: "Полицейская машина",
        descriptionEn: "Police Car",
        validStart: "01/01/2024",
        validEnd: "31/12/2024",
      },
      {
        id: 19,
        ordinalNumber: "019",
        code: "36",
        descriptionAm: "Ռազմական մեքենա",
        descriptionRu: "Военная машина",
        descriptionEn: "Military Vehicle",
        validStart: "01/01/2024",
        validEnd: "31/12/2024",
      },
      {
        id: 20,
        ordinalNumber: "020",
        code: "37",
        descriptionAm: "Գյուղատնտեսական",
        descriptionRu: "Сельскохозяйственная",
        descriptionEn: "Agricultural Vehicle",
        validStart: "01/01/2024",
        validEnd: "31/12/2024",
      },
    ],
    [],
  );

  const rowsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(fakeData.length / rowsPerPage);

  const currentRows = fakeData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage,
  );
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleFilterChange = (fieldName) => (event) => {
    setFilters((prev) => ({
      ...prev,
      [fieldName]: event.target.value,
    }));
  };

  const openControlTypeDetails = (item, readOnly) => {
    navigate("/control-type-create", {
      state: { controlType: item, readOnly },
    });
  };

  const handleClearFilters = () => {
    setFilters(initialFilters);
  };

  const renderPageNumbers = () => {
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <Button
          key={i}
          onClick={() => handlePageChange(i)}
          style={{
            borderColor: "#087990",
            backgroundColor: currentPage === i ? "#087990" : "white",
            color: currentPage === i ? "white" : "#087990",
          }}
        >
          {i}
        </Button>,
      );
    }

    return pages;
  };

  const emptyRows = rowsPerPage - currentRows.length;
  return (
    <div>
        <div className="page-card">
        <div className="page-actions">
          <Button variant="outline-cs-blue" onClick={handleClearFilters}>
            Մաքրել
          </Button>
          <Button variant="cs-blue">Որոնել</Button>
        </div>
      </div>
      <div className="form-card">
        <p className="header-name">Որոնել հսկողության տեսակ</p>
        <Row className="mt-2">
          <Col md={3}>
              <Form.Group>
              <Form.Label>Ծածկագիր</Form.Label>
              <Form.Control type="text" value={filters.code} onChange={handleFilterChange("code")} />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group>
              <Form.Label>Նկարագրություն (հայ.)</Form.Label>
              <Form.Control
                type="text"
                value={filters.descriptionAm}
                onChange={handleFilterChange("descriptionAm")}
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group>
              <Form.Label>Նկարագրություն (ռուս.)</Form.Label>
              <Form.Control
                type="text"
                value={filters.descriptionRu}
                onChange={handleFilterChange("descriptionRu")}
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group>
              <Form.Label>Նկարագրություն (անգլ.)</Form.Label>
              <Form.Control
                type="text"
                value={filters.descriptionEn}
                onChange={handleFilterChange("descriptionEn")}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mt-2">
          <Col md={3}>
              <Form.Group>
              <Form.Label>Մաքսային հսկողության տարածք</Form.Label>
              <Form.Control type="text" value={filters.zone} onChange={handleFilterChange("zone")} />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group>
              <Form.Label>Ամսաթիվ</Form.Label>
              <Form.Control type="text" value={filters.dateFrom} onChange={handleFilterChange("dateFrom")} />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group>
              <Form.Label></Form.Label>
              <Form.Control type="text" value={filters.dateTo} onChange={handleFilterChange("dateTo")} />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group>
              <Form.Label></Form.Label>
              <Form.Control type="text" value={filters.extra} onChange={handleFilterChange("extra")} />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mt-2">
          <Col md={3}>
              <Form.Group>
              <Form.Label>Պաշտոն</Form.Label>
              <Form.Control type="text" value={filters.position} onChange={handleFilterChange("position")} />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group>
              <Form.Label>Ուղղություն</Form.Label>
              <Form.Control type="text" value={filters.direction} onChange={handleFilterChange("direction")} />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group>
              <Form.Label>Տեսակ</Form.Label>
              <Form.Select required value={filters.type} onChange={handleFilterChange("type")}>
                <option value="" disabled>
                  Ընտրել
                </option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
      </div>
      <div className="form-card my-4">
        <p className="header-name">Գտնված տվյալներ</p>
        <Table
          className="mb-4 text-center transport-rich-table margin-90"
          responsive
          size="md"
          striped
          bordered
          hover
        >
          <thead>
            <tr>
              <th>
                <BsGearWide className="text-white" size={20} />
              </th>
              <th>Հերթական համար</th>
              <th>Ծածկագիր</th>
              <th>Նկարագրություն (հայ.)</th>
              <th>Նկարագրություն (ռուս.)</th>
              <th>Նկարագրություն (անգլ.)</th>
              <th>Վավ. սկիզբ</th>
              <th>Վավ. է մինչև</th>
            </tr>
          </thead>

          <tbody>
            {currentRows.map((item) => (
              <tr key={item.id}>
                <td>
                  <div className="table-actions">
                    <button
                      className="table-button"
                      title="Դիտել"
                      onClick={() => openControlTypeDetails(item, true)}
                    >
                      <MdOutlineRemoveRedEye />
                    </button>
                    <button
                      className="table-button"
                      title="Խմբագրել"
                      onClick={() => openControlTypeDetails(item, false)}
                    >
                      <BsPencil />
                    </button>
                  </div>
                </td>
                <td>{item.ordinalNumber}</td>
                <td>{item.code}</td>
                <td>{item.descriptionAm}</td>
                <td>{item.descriptionRu}</td>
                <td>{item.descriptionEn}</td>
                <td>{item.validStart}</td>
                <td>{item.validEnd}</td>
              </tr>
            ))}

            {Array.from({ length: emptyRows }).map((_, index) => (
              <tr key={`empty-${index}`}>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div className="security-footer">
          <div className="d-flex justify-content-start my-3 flex-wrap gap-2 ">
            {" "}
            {currentPage > 1 && (
              <Button
                style={{ borderColor: "#087990", backgroundColor: "white" }}
                onClick={() => handlePageChange(1)}
              >
                <BsChevronDoubleLeft />
              </Button>
            )}
            {currentPage > 1 && (
              <Button
                style={{ borderColor: "#087990", backgroundColor: "white" }}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                <BsChevronLeft />
              </Button>
            )}
            {renderPageNumbers()}
            {currentPage < totalPages && (
              <Button
                style={{ borderColor: "#087990", backgroundColor: "white" }}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                <BsChevronRight />
              </Button>
            )}
            {currentPage < totalPages && (
              <Button
                style={{ borderColor: "#087990", backgroundColor: "white" }}
                onClick={() => handlePageChange(totalPages)}
              >
                <BsChevronDoubleRight />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ControlTypeSearch;
