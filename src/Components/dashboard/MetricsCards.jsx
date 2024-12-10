/* eslint-disable react/prop-types */

// MetricsCards Component
import { Card } from "./ui/Card";

const MetricCard = ({
  title='',
  value = "",
  subtitle = "",
  valueClasses = "mt-2 text-2xl font-bold",
}) => (
  <Card>
    <h3 className="text-sm font-medium">{title}</h3>
    <div className={valueClasses}>{value}</div>
    {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
  </Card>
);

const MetricsCards = () => (
  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
    <MetricCard
      title="Current Routine"
      value="Spring 2024"
      valueClasses="mt-2 text-md font-normal"
      subtitle="Revision: 4"
    />
    <MetricCard title="Number of class today" value="156" />
    <MetricCard title="Free Rooms" value="2" />
    <MetricCard title="Slot conflicts" value="3" valueClasses="mt-2 text-2xl text-red-900 font-bold" />
  </div>
);

export default MetricsCards;
