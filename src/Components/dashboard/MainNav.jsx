/* eslint-disable react/prop-types */

const items = [
  {
    title: "Dashboard",
    href: "/",
  },
  {
    title: "Routine",
    href: "/routine",
  },
  {
    title: "Rooms",
    href: "/rooms",
  },
  {
    title: "Courses",
    href: "/courses",
  },
  {
    title: "Teacher",
    href: "/teacher",
  },
  {
    title: "Department",
    href: "/department",
  },
  {
    title: "Reports",
    href: "/reports",
  },
];

const MainNav = ({ className = "" }) => (
  <nav className={`flex items-center space-x-4 lg:space-x-6 ${className}`}>
    {items.map((item) => (
      <a
        key={item.href}
        href={item.href}
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        {item.title}
      </a>
    ))}
  </nav>
);

export default MainNav;
