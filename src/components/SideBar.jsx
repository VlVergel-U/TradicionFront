import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { Menu, ShoppingCart, ListOrdered, LogOut, LayoutDashboard, User } from "lucide-react";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [role, setRole] = useState(localStorage.getItem('role')); 
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    setRole(storedRole);
  }, [localStorage.getItem('role')]);
  
  const handleLogout = () => {
    logout(navigate);
  };

  const icons = [
    { name: "Productos", icon: LayoutDashboard, color: "#4B5563", href: "/menu" },
    ...(role === 'customer' || role === 'administrative' ? [{ name: "Carrito", icon: ShoppingCart, color: "#4B5563", href: "/cart" }] : []),
    { name: "Pedidos", icon: ListOrdered, color: "#4B5563", href: "/order" },
    ...(role === 'administrative' ? [{ name: "Usuarios", icon: User, color: "#4B5563", href: "/createuser" }] : []),
    { name: "Cerrar sesión", icon: LogOut, color: "#4B5563", href: "/login", onClick: () => handleLogout() }
  ];

  const handleResize = () => {
    if (window.innerWidth <= 768) {
      setIsSidebarOpen(false);
    } else {
      setIsSidebarOpen(true);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 left-0 ${
        isSidebarOpen ? "w-64" : "w-20"
      }`}
    >
      <div className="h-full bg-opacity-50 backdrop-blur-md p-4 flex flex-col">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-full hover:bg-[#3D0F09] transition-colors max-w-fit"
        >
          <Menu size={24} />
        </button>

        <nav className="mt-8 flex-grow">
          {icons.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              onClick={item.name === "Cerrar sesión" ? handleLogout : undefined}
            >
              <div className="flex items-center p-4 text-sm font-medium rounded-lg hover:bg-amber-100 transition-colors mb-2">
                <item.icon size={20} style={{ color: item.color, minWidth: "20px" }} />
                <AnimatePresence>
                  {isSidebarOpen && (
                    <span className="ml-4 whitespace-nowrap">{item.name}</span>
                  )}
                </AnimatePresence>
              </div>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
