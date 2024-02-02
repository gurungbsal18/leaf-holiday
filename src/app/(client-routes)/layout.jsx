import ClientNavbar from "@/components/ClientNavbar";
import Footer from "@/components/Footer";
import Notification from "@/components/Notification";

export default function ClientLayout({ children }) {
  return (
    <div className="main-container">
      <ClientNavbar />
      {children}
      <Footer />
      <Notification />
    </div>
  );
}
