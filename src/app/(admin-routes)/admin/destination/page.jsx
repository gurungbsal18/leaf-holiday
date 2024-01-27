import AdminPages from "@/components/AdminPages";
import CreateDestination from "@/components/CreateComponents/CreateDestination";
import axios from "axios";

export default async function Destination() {
  const data = {
    pageName: "Destinations",
    apiName: "destination",
    createComponent: <CreateDestination />,
    titles: ["NAME", "DESCRIPTION"],
  };

  return (
    <div className="dashboard-content-section p-4">
      <AdminPages data={data} />
    </div>
  );
}
