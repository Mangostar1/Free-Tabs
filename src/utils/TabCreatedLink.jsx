import { Link } from "react-router-dom";

export default function TabCreatedLink() {
  if (sessionStorage.getItem("tab") === "created") {
    return (
      <Link
        className="px-2 py-2 text-sm text-gray-200 lg:px-6 md:px-3 hover:text-[#ff9800]"
        to="/tab/view"
      >
        Tab Created
      </Link>
    );
  } else {
    return null;
  }
}
