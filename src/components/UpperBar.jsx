
import coatOfArms from "../assets/coatOfArms.svg";
import src from "../assets/src.svg";

function UpperBar() {

  const config = useSelector((state) => state.config.data);

 
  return (
    <div className="d-flex justify-content-between bg-light align-items-center py-3 px-md-2 px-xl-5 cs-backgound-light">
      <img src={coatOfArms} alt="coatOfArms" className="barImg" />
      
    
        <h1 className="text-primary text-center fw-bold text-uppercase flex-grow-1">
          Հայաստանի հանրապետության Արտաքին առեւտրի ազգային մեկ պատուհան
        </h1>
      
      
      <img src={src} alt="src" className="barImg" />
    </div>
  );
}

export default UpperBar;
