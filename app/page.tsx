import { Heading } from "@/components/home/heading";
import { cn } from "@/lib/utils";

const MarketingPage = () => {
  return (
    <div
      className={cn(
        "absolute min-h-full flex flex-col inset-0 bottom-10 bg-bottom bg-no-repeat bg-slate-50 dark:bg-[#0B1120] bg-[url('/hero@75.jpg')] dark:bg-[url('/hero-dark@90.jpg')]",
      )}
    >
      <div className="flex flex-col items-center justify-center text-center gap-y-8 flex-1 px-6 pb-10">
        <Heading />
      </div>
    </div>
  );
};

export default MarketingPage;
