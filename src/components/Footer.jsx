import { MdEmail, MdPhone } from "react-icons/md";
import { Container, Row, Col } from "react-bootstrap";
import "../styles/Footer.css";



function Footer() {

  return (
      <div className="py-1 px-5 custom-footer d-flex gap-3 bg align-items-center text-white">
        <Container fluid>
          <Row className="w-100 align-items-center">
            <Col className="d-flex flex-column flex-md-row gap-3 align-items-center justify-content-start ps-2">
              <span>Հետադարձ կապ՝</span>
              <div className="d-flex align-items-center gap-2">
                <MdEmail size={20} />
                <span>support@daniam.am</span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <MdPhone size={20} />
                <span>+374-(011)-000000</span>
              </div>
              <a href="/trade/downloads" className="link" >Ներբեռնումներ</a>
            </Col>
            <Col className="d-flex flex-column flex-md-row gap-3 align-items-center justify-content-end pe-2">
              <div>Daniam</div>
              <div className="rights">Բոլոր իրավունքները պաշտպանված են</div>
            </Col>
          </Row>
        </Container>
      </div>
  );
}

export default Footer;
