import ClientAccountNavbar from "@/components/ClientAccountNavbar";

export default function ClientAccountLayout({ children }) {
  return (
    <div className="d-flex">
      <ClientAccountNavbar />
      {children}
    </div>
  );
}
