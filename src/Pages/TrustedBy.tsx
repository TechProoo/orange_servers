import Navbar from "../components/Home/Navbar";
import TrustedBy from "../components/Home/TrustedBy";

const TrustedByPage = () => {
  return (
    <div className="trustedByPage">
      <div className="trustedByPage__nav">
        <Navbar />
      </div>
      <TrustedBy />
    </div>
  );
};

export default TrustedByPage;
