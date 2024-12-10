import { Card } from "./ui/Card";

const updates = [
  {
    type: "Class Added",
    description:
      "Added a class in Slot 1 (8:30 - 9:45) for Sarifa Siddika (00000001) on Tuesday",
  },
  {
    type: "Class Updated",
    description:
      "Updated class in Slot 2 (10:00 - 11:15) for Sarifa Siddika (00000002) on Wednesday",
  },
  {
    type: "Class Removed",
    description:
      "Removed class in Slot 3 (11:30 - 12:45) for Sabir Islam (00000003) on Thursday",
  },
];

const Updates = () => (
  <Card title="Updates">
    <div className="space-y-4">
      {updates.map((update, index) => (
        <div key={index} className="space-y-1 rounded-lg border bg-white shadow-sm p-2">
          <h3 className="text-sm font-medium">{update.type}</h3>
          <p className="text-sm text-gray-600">{update.description}</p>
        </div>
      ))}
    </div>
  </Card>
);

export default Updates;
