import { Cloud } from "lucide-react";
import MainNav from "./MainNav";
import MetricsCards from "./MetricsCards";
import QuickActions from "./QuickActions";
import Calendar from "./Calendar";
import Updates from "./Updates";
import UserNav from "./UserNav";

const DashboardPage = () => (
  <div className="flex h-max flex-col border border-gray-300 m-3 shadow-md">
    <div className="border-b">
      <div className="flex items-center p-5">
        <span className="font-semibold">Dashboard </span>
        <span className="px-1">|</span>
        <span className="font-semibold">Metronome</span>
      </div>
      <div className="flex h-16 items-center px-5">
        <Cloud />
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <UserNav />
        </div>
      </div>
    </div>
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <MetricsCards />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <div className="col-span-4 space-y-4">
            <QuickActions />
            <Updates />
          </div>
          <div className="col-span-3">
            <Calendar />
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default DashboardPage;
