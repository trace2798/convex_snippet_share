import { Navbar } from "./(routes)/preview/[snippetId]/_components/navbar";

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <Navbar />
      {children}
    </div>
  );
};

export default PublicLayout;
