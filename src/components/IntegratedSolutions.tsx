import fiberOptic2 from "@/assets/fiber-optic-2.avif";
import processorCube from "@/assets/processor-cube.avif";
import whitefiberChip from "@/assets/whitefiber-chip.avif";
import fiberCables from "@/assets/fiber-cables.avif";

const IntegratedSolutions = () => {
  const solutions = [
    {
      image: fiberCables,
      title: "End-to-end managed private and hybrid cloud environments",
      description: "Complete infrastructure management from private to hybrid cloud setups."
    },
    {
      image: processorCube,
      title: "Burst workloads between private data clusters and public GPU cloud",
      description: "Seamless workload distribution across infrastructure types."
    },
    {
      image: whitefiberChip,
      title: "Scale rapidly without sacrificing performance, reliability, or security",
      description: "Maintain high standards while achieving rapid scalability."
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-whitefiber-light-gray text-sm uppercase tracking-widest mb-4">
            Integrated Solutions
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-whitefiber-dark mb-8">
            Private AI meets the Public Cloud
          </h2>
          <p className="text-xl text-whitefiber-light-gray max-w-4xl mx-auto leading-relaxed mb-16">
            WhiteFiber's unified cloud and data center solutions provide unmatched scalability, 
            flexibility, and performance - transforming your infrastructure into a competitive advantage.
          </p>
        </div>

        {/* Solution Features - Large Images Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="aspect-video overflow-hidden rounded-lg">
            <img
              src={fiberOptic2}
              alt="Fiber optic cables"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="aspect-video overflow-hidden rounded-lg">
            <img
              src={processorCube}
              alt="Processor with data cube"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="aspect-video overflow-hidden rounded-lg">
            <img
              src={whitefiberChip}
              alt="WhiteFiber branded chip"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Solution Details */}
        <div className="space-y-12">
          {solutions.map((solution, index) => (
            <div key={index} className="flex flex-col lg:flex-row items-center gap-8">
              {/* Image */}
              <div className="flex-shrink-0">
                <div className="w-24 h-16 overflow-hidden rounded-lg">
                  <img
                    src={solution.image}
                    alt={solution.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 text-center lg:text-left">
                <h3 className="text-xl font-semibold text-whitefiber-dark mb-2">
                  {solution.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IntegratedSolutions;