import { useState } from "react";
import Button from "./ui/Button";
import { ChevronLeft, ChevronRight } from "react-feather";

const Calendar = () => {
  const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  const [currentDate, setCurrentDate] = useState(new Date());

  // Update the displayed month
  const changeMonth = (direction) => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() + direction);
      return newDate;
    });
  };

  // Generate calendar days
  const generateDays = () => {
    const firstDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    const lastDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    );
    const startDay = firstDay.getDay();
    const totalDays = lastDay.getDate();

    return Array.from({ length: 42 }, (_, i) => {
      const dayNum = i - startDay + 1;
      return dayNum > 0 && dayNum <= totalDays ? dayNum : null;
    });
  };

  // Check if the day is the current date
  const isToday = (day) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  return (
    <div className="p-6 border rounded-lg shadow-sm bg-white">
      <div className="flex items-center justify-between mb-4">
        <Button
          bgColor="bg-gray-100"
          title={<ChevronLeft className="h-4 w-4 text-black" />}
          customPadding="px-2 py-1"
          onClick={() => changeMonth(-1)}
        />
        <h2 className="text-xl font-semibold">
          {currentDate.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </h2>
        <Button
          bgColor="bg-gray-100"
          title={<ChevronRight className="h-4 w-4 text-black" />}
          customPadding="px-2 py-1"
          onClick={() => changeMonth(1)}
        />
      </div>

      <div className="grid grid-cols-7 gap-2 text-center text-sm">
        {days.map((day) => (
          <div key={day} className="font-medium">
            {day}
          </div>
        ))}
        {generateDays().map((day, i) => (
          <div
            key={i}
            className={`py-2 rounded-sm text-sm ${
              isToday(day) ? "bg-black text-white" : "bg-transparent"
            }`}
          >
            {day || ""}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
