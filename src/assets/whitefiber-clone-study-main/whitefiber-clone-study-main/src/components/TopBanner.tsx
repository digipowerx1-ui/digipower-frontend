import { Button } from "@/components/ui/button";

const TopBanner = () => {
  return (
    <div className="bg-whitefiber-orange text-whitefiber-orange-foreground py-3">
      <div className="container mx-auto px-4 flex items-center justify-center text-sm">
        <span className="text-center mr-4">
          Network and learn how to build smarter GPU infrastructure - join us September 9 in San Jose
        </span>
        <Button 
          variant="secondary" 
          size="sm"
          className="bg-whitefiber-orange-foreground text-whitefiber-orange hover:bg-white/90 px-4 py-1 text-sm font-medium rounded-full"
        >
          Register now
        </Button>
      </div>
    </div>
  );
};

export default TopBanner;