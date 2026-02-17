import FeaturesCards from "./FeaturesCards";

const Features = () => {
  return (
    <div id="features" className="features_component mt-30">
      <div className="fe_text text-center mb-30">
        <h1 className="text-4xl font-bold">
          Optimized for every{" "}
          <span className="text_style text-(--primary) uppercase font-extrabold">
            workload
          </span>
        </h1>
        <p className="text-md mt-5">
          Enterprise-grade WordPress management that keeps your site running
          <br />
          smoothly so you can focus on what matters most.
        </p>
      </div>
      <div className="fe_cards">
        <FeaturesCards />
      </div>
    </div>
  );
};

export default Features;
