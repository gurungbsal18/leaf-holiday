import ClientAccountNavbar from "@/components/ClientAccountNavbar";

export default function ClientAccountLayout({ children }) {
  return (
    <div className="container">
      <div className="d-flex justify-content-between flex-column flex-md-row gap-2 mt-4 user-account-dashboard rounded">
        <ClientAccountNavbar />
        {children}
      </div>
    </div>
  );
}
