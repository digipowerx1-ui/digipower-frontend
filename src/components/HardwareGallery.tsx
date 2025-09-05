import hardware1 from "@/assets/hardware-1.avif";
import hardware2 from "@/assets/hardware-2.avif";
import hardware3 from "@/assets/hardware-3.avif";
import hardware4 from "@/assets/hardware-4.avif";

const HardwareGallery = () => {
  const hardwareImages = [
    { src: hardware1, alt: "NVIDIA hardware setup 1" },
    { src: hardware2, alt: "NVIDIA hardware setup 2" },
    { src: hardware3, alt: "NVIDIA hardware setup 3" },
    { src: hardware4, alt: "NVIDIA hardware setup 4" },
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {hardwareImages.map((image, index) => (
            <div key={index} className="aspect-square overflow-hidden rounded-lg">
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HardwareGallery;