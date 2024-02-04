import AdminPages from "@/components/AdminPages";
import CreateDestination from "@/components/CreateComponents/CreateDestination";
import Table from "@/components/ui/Table";
import axios from "axios";

export default function Destination() {
  const data = {
    pageName: "Destinations",
    apiName: "destination",
    createComponent: <CreateDestination />,
    headerData: [
      { Header: "NAME", accessor: "name" },
      { Header: "DESCRIPTION", accessor: "description" },
    ],
    showView: true,
    showEdit: true,
    showRemove: true,
    showImage: true,
  };

  return (
    <div className="dashboard-content-section p-4">
      <AdminPages data={data} />
    </div>
  );
}
