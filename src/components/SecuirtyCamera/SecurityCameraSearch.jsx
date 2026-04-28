import React, { useMemo, useState } from "react";
import { Table, Pagination, Form, Col } from "react-bootstrap";
import { BsGearWide, BsPencil } from "react-icons/bs";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { IoTrashOutline } from "react-icons/io5";
import { Button } from "react-bootstrap";
import {
  BsChevronLeft,
  BsChevronRight,
  BsChevronDoubleLeft,
  BsChevronDoubleRight,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";


function SecurityCameraSearch() {
  const navigate = useNavigate();
  const fakeData = useMemo(
    () => [
      {
        id: 1,
        section: "Տեղամաս 1",
        scale: "Կշեռք A1",
        manufacturer: "Hikvision",
        model: "DS-2CD1043G0-I",
        direction: "Մուտք",
        active: "Այո",
        plateRecognition: "Այո",
        liveStream: "Այո",
        address: "Երևան, Աբովյան 12",
        port: "8080",
        createdAt: "2026-04-01",
        createdBy: "admin",
        updatedBy: "operator1",
      },
      {
        id: 2,
        section: "Տեղամաս 2",
        scale: "Կշեռք A2",
        manufacturer: "Dahua",
        model: "IPC-HFW1230S",
        direction: "Ելք",
        active: "Ոչ",
        plateRecognition: "Այո",
        liveStream: "Ոչ",
        address: "Երևան, Մաշտոց 25",
        port: "8081",
        createdAt: "2026-04-02",
        createdBy: "admin",
        updatedBy: "operator2",
      },
      {
        id: 3,
        section: "Տեղամաս 3",
        scale: "Կշեռք B1",
        manufacturer: "Axis",
        model: "P1375",
        direction: "Մուտք",
        active: "Այո",
        plateRecognition: "Ոչ",
        liveStream: "Այո",
        address: "Գյումրի, Շիրազի 8",
        port: "8082",
        createdAt: "2026-04-03",
        createdBy: "superadmin",
        updatedBy: "operator1",
      },
      {
        id: 4,
        section: "Տեղամաս 4",
        scale: "Կշեռք B2",
        manufacturer: "Bosch",
        model: "DINION IP 3000",
        direction: "Ելք",
        active: "Այո",
        plateRecognition: "Այո",
        liveStream: "Այո",
        address: "Վանաձոր, Տիգրան Մեծ 15",
        port: "8083",
        createdAt: "2026-04-04",
        createdBy: "admin",
        updatedBy: "manager1",
      },
      {
        id: 5,
        section: "Տեղամաս 5",
        scale: "Կշեռք C1",
        manufacturer: "Uniview",
        model: "IPC2122LR3",
        direction: "Մուտք",
        active: "Ոչ",
        plateRecognition: "Ոչ",
        liveStream: "Այո",
        address: "Արմավիր, Հանրապետության 3",
        port: "8084",
        createdAt: "2026-04-05",
        createdBy: "operator1",
        updatedBy: "operator3",
      },
      {
        id: 6,
        section: "Տեղամաս 6",
        scale: "Կշեռք C2",
        manufacturer: "Hikvision",
        model: "DS-2DE4225IW-DE",
        direction: "Ելք",
        active: "Այո",
        plateRecognition: "Այո",
        liveStream: "Ոչ",
        address: "Արտաշատ, Երևանյան 10",
        port: "8085",
        createdAt: "2026-04-06",
        createdBy: "admin",
        updatedBy: "operator2",
      },
      {
        id: 7,
        section: "Տեղամաս 7",
        scale: "Կշեռք D1",
        manufacturer: "Dahua",
        model: "N52A",
        direction: "Մուտք",
        active: "Այո",
        plateRecognition: "Այո",
        liveStream: "Այո",
        address: "Հրազդան, Կենտրոն 18",
        port: "8086",
        createdAt: "2026-04-07",
        createdBy: "manager1",
        updatedBy: "manager1",
      },
      {
        id: 8,
        section: "Տեղամաս 8",
        scale: "Կշեռք D2",
        manufacturer: "Axis",
        model: "Q1615",
        direction: "Ելք",
        active: "Ոչ",
        plateRecognition: "Ոչ",
        liveStream: "Ոչ",
        address: "Աշտարակ, Նարեկացի 6",
        port: "8087",
        createdAt: "2026-04-08",
        createdBy: "admin",
        updatedBy: "operator4",
      },
      {
        id: 9,
        section: "Տեղամաս 9",
        scale: "Կշեռք E1",
        manufacturer: "Bosch",
        model: "FLEXIDOME IP",
        direction: "Մուտք",
        active: "Այո",
        plateRecognition: "Այո",
        liveStream: "Այո",
        address: "Սևան, Սայաթ-Նովա 20",
        port: "8088",
        createdAt: "2026-04-09",
        createdBy: "superadmin",
        updatedBy: "operator1",
      },
      {
        id: 10,
        section: "Տեղամաս 10",
        scale: "Կշեռք E2",
        manufacturer: "Uniview",
        model: "IPC3612LB",
        direction: "Ելք",
        active: "Այո",
        plateRecognition: "Ոչ",
        liveStream: "Այո",
        address: "Չարենցավան, Կոմիտաս 4",
        port: "8089",
        createdAt: "2026-04-10",
        createdBy: "admin",
        updatedBy: "operator5",
      },
      {
        id: 11,
        section: "Տեղամաս 11",
        scale: "Կշեռք F1",
        manufacturer: "Hikvision",
        model: "DS-2CD2143G0-I",
        direction: "Մուտք",
        active: "Այո",
        plateRecognition: "Այո",
        liveStream: "Այո",
        address: "Երևան, Կոմիտաս 44",
        port: "8090",
        createdAt: "2026-04-11",
        createdBy: "operator2",
        updatedBy: "operator2",
      },
      {
        id: 12,
        section: "Տեղամաս 12",
        scale: "Կշեռք F2",
        manufacturer: "Dahua",
        model: "IPC-HDBW1431E",
        direction: "Ելք",
        active: "Ոչ",
        plateRecognition: "Այո",
        liveStream: "Ոչ",
        address: "Երևան, Բաղրամյան 50",
        port: "8091",
        createdAt: "2026-04-12",
        createdBy: "admin",
        updatedBy: "manager2",
      },
      {
        id: 13,
        section: "Տեղամաս 13",
        scale: "Կշեռք G1",
        manufacturer: "Axis",
        model: "M3046-V",
        direction: "Մուտք",
        active: "Այո",
        plateRecognition: "Այո",
        liveStream: "Այո",
        address: "Աբովյան, Հատիս 7",
        port: "8092",
        createdAt: "2026-04-13",
        createdBy: "superadmin",
        updatedBy: "operator6",
      },
      {
        id: 14,
        section: "Տեղամաս 14",
        scale: "Կշեռք G2",
        manufacturer: "Bosch",
        model: "AUTODOME 5000",
        direction: "Ելք",
        active: "Այո",
        plateRecognition: "Ոչ",
        liveStream: "Այո",
        address: "Կապան, Գարեգին Նժդեհ 9",
        port: "8093",
        createdAt: "2026-04-14",
        createdBy: "admin",
        updatedBy: "operator1",
      },
      {
        id: 15,
        section: "Տեղամաս 15",
        scale: "Կշեռք H1",
        manufacturer: "Uniview",
        model: "IPC2322EBR",
        direction: "Մուտք",
        active: "Ոչ",
        plateRecognition: "Այո",
        liveStream: "Այո",
        address: "Իջևան, Անկախություն 14",
        port: "8094",
        createdAt: "2026-04-15",
        createdBy: "manager2",
        updatedBy: "operator3",
      },
      {
        id: 16,
        section: "Տեղամաս 16",
        scale: "Կշեռք H2",
        manufacturer: "Hikvision",
        model: "DS-2CD2T43G0-I5",
        direction: "Ելք",
        active: "Այո",
        plateRecognition: "Այո",
        liveStream: "Ոչ",
        address: "Մեղրի, Զորավար Անդրանիկ 2",
        port: "8095",
        createdAt: "2026-04-16",
        createdBy: "admin",
        updatedBy: "operator4",
      },
      {
        id: 17,
        section: "Տեղամաս 17",
        scale: "Կշեռք I1",
        manufacturer: "Dahua",
        model: "SD49225XA-HNR",
        direction: "Մուտք",
        active: "Այո",
        plateRecognition: "Ոչ",
        liveStream: "Այո",
        address: "Գորիս, Օրբելի 11",
        port: "8096",
        createdAt: "2026-04-17",
        createdBy: "superadmin",
        updatedBy: "manager1",
      },
      {
        id: 18,
        section: "Տեղամաս 18",
        scale: "Կշեռք I2",
        manufacturer: "Axis",
        model: "P3245-V",
        direction: "Ելք",
        active: "Ոչ",
        plateRecognition: "Այո",
        liveStream: "Այո",
        address: "Դիլիջան, Շահումյան 19",
        port: "8097",
        createdAt: "2026-04-18",
        createdBy: "admin",
        updatedBy: "operator5",
      },
      {
        id: 19,
        section: "Տեղամաս 19",
        scale: "Կշեռք J1",
        manufacturer: "Bosch",
        model: "MIC IP 7000",
        direction: "Մուտք",
        active: "Այո",
        plateRecognition: "Այո",
        liveStream: "Այո",
        address: "Եղեգնաձոր, Սպանդարյան 13",
        port: "8098",
        createdAt: "2026-04-19",
        createdBy: "operator1",
        updatedBy: "operator6",
      },
      {
        id: 20,
        section: "Տեղամաս 20",
        scale: "Կշեռք J2",
        manufacturer: "Uniview",
        model: "IPC3634SR3",
        direction: "Ելք",
        active: "Այո",
        plateRecognition: "Ոչ",
        liveStream: "Ոչ",
        address: "Մարտունի, Կենտրոն 1",
        port: "8099",
        createdAt: "2026-04-20",
        createdBy: "admin",
        updatedBy: "manager2",
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

  const openSecurityCameraDetails = (item, readOnly) => {
    navigate("/security-cameras-create", {
      state: { securityCamera: item, readOnly },
    });
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
    <>
      <div className="security">
         <div className="page-card">
                  <div className="page-actions">
                   
        
                    <Button variant="outline-cs-blue"> 
                      Մաքրել
                    </Button>
                    <Button variant="cs-blue"> 
                      Որոնել
                    </Button>
                  </div>
                </div>
                <div className="form-card mb-4">
        <p className="header-name">Որոնել տեսախցիկ</p>
        </div>
        <div className="form-card mb-4">
        <p className="header-name">Գտնված տվյալներ</p>
        <Table
          className="mb-4 text-center transport-rich-table margin-90"
          responsive
          size="sm"
          striped
          bordered
          hover
        >
          <thead>
            <tr>
              <th>
                <button className="plus mx-auto">
                  <BsGearWide className="text-cs-blue" />
                </button>
              </th>
              <th>Տեղամաս</th>
              <th>Կշեռք</th>
              <th>Արտադրող</th>
              <th>Մոդել</th>
              <th>Ուղղություն</th>
              <th>Ակտիվ</th>
              <th>Պետհմր ճանաչում</th>
              <th>Առցանց հեռարձակում</th>
              <th>Հասցե</th>
              <th>Պորտ</th>
              <th>Ստեղծվել</th>
              <th>Ստեղծվել է</th>
              <th>Խմբագրվել է</th>
            </tr>
          </thead>

          <tbody>
            {currentRows.map((item) => (
              <tr key={item.id}>
                <td>
                  <div className="operations-col">
                    <button
                      className="table-button"
                      title="Դիտել"
                      onClick={() => openSecurityCameraDetails(item, true)}
                    >
                      <MdOutlineRemoveRedEye />
                    </button>
                    <button
                      className="table-button"
                      title="Խմբագրել"
                      onClick={() => openSecurityCameraDetails(item, false)}
                    >
                      <BsPencil />
                    </button>
                    <button
                      className="table-button table-button-remove"
                      title="Ջնջել"
                    >
                      <IoTrashOutline />
                    </button>
                  </div>
                </td>
                <td>{item.section}</td>
                <td>{item.scale}</td>
                <td>{item.manufacturer}</td>
                <td>{item.model}</td>
                <td>{item.direction}</td>
                <td>{item.active}</td>
                <td>{item.plateRecognition}</td>
                <td>{item.liveStream}</td>
                <td>{item.address}</td>
                <td>{item.port}</td>
                <td>{item.createdAt}</td>
                <td>{item.createdBy}</td>
                <td>{item.updatedBy}</td>
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
    </>
  );
}

export default SecurityCameraSearch;
