import { Button } from "@/components/ui/button";

const AnnouncementBar = () => {
  return (
    <div className="bg-gradient-to-r from-[#0F3E51] to-[#0B2C3A] p-8 text-white text-white py-3 px-4 animate-slide-up">

      <div className="container mx-auto flex justify-center items-center gap-4 text-sm">
        <span>Network and learn how to build smarter GPU Infrastructure - join us September 9 in San Jose</span>
        <Button
          variant="secondary"
          size="sm"
          className="bg-gradient-to-r from-[#0F3E51] to-[#0B2C3A] text-white border border-white hover:bg-gray-100 font-medium hover:scale-105 transition-all duration-200"
        >
          Register now
        </Button>
      </div>
    </div>
  );
};

export default AnnouncementBar;