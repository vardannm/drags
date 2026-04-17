
import coatOfArms from "../assets/coatOfArms.svg";
import src from "../assets/src.svg";

function UpperBar() {


 
  return (
    <div className="d-flex justify-content-between bg-light align-items-center py-3 px-md-2 px-xl-5 cs-backgound-light">
      <img src={coatOfArms} alt="coatOfArms" className="barImg" />
      
    
        <h3 className="text-cs-blue text-center fw-bold text-uppercase flex-grow-1">
          Հայաստանի հանրապետության Արտաքին առեւտրի ազգային մեկ պատուհան
        </h3>
      
      
      <img src={src} alt="src" className="barImg" />
    </div>
  );
}

export default UpperBar;
