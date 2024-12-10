import Button from "./ui/Button";

const QuickActions = () => (
  <div className="space-y-4">
    <h2 className="text-lg font-semibold">Quick Actions</h2>
    <div className="flex flex-wrap gap-2">
      <Button bgColor="bg-blue-600" title="Add/Remove Classes" />
      <Button bgColor="bg-blue-600" title="Add/Remove Rooms" />
      <Button bgColor="bg-blue-600" title="Add/Remove Courses" />
      <Button bgColor="bg-blue-600" title="Add/Remove Teachers" />
    </div>
  </div>
);

export default QuickActions;
