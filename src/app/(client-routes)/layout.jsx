import ClientNavbar from "@/components/ClientNavbar";
import Footer from "@/components/Footer";

export default function ClientLayout({ children }) {
  return (
    <div className="main-container">
      <ClientNavbar />
      {children}
      <Footer />
    </div>
  );
}
