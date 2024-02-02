import ClientAccountNavbar from "@/components/ClientAccountNavbar";
import Notification from "@/components/Notification";

export default function ClientAccountLayout({ children }) {
  return (
    <div className="d-flex">
      <ClientAccountNavbar />
      {children}
    </div>
  );
}
