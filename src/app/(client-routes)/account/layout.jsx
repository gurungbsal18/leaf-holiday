import ClientAccountNavbar from "@/components/ClientAccountNavbar";

export default function ClientAccountLayout({ children }) {
  return (
    <div className="container">
      <div className="d-flex justify-content-between gap-5 mt-4 user-account-dashboard rounded">
        <ClientAccountNavbar />
        {children}
      </div>
    </div>
  );
}
