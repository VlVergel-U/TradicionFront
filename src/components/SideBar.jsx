import { Menu, ShoppingBag, ShoppingCart, ListOrdered, LogOut, LayoutDashboard, User } from "lucide-react";
import { useState, useEffect } from "react";
import { AnimatePresence} from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const role = localStorage.getItem('role');

const icons = [
	{ name: "Productos", icon: LayoutDashboard, color: "#4B5563", href: "/menu" },
	{ name: "Pedidos", icon: ListOrdered, color: "#4B5563", href: "/order" },
	...(role === 'customer' || role === 'administrative' ? [{ name: "Carrito", icon: ShoppingCart, color: "#4B5563", href: "/cart" }] : []),
	...(role === 'administrative' ? [{ name: "Usuarios", icon: User, color: "#4B5563", href: "/createuser" }] : []),
	{ name: "Cerrar sesión", icon: LogOut, color: "red", href: "/login", onClick: "handleLogout" }
];

const Sidebar = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);
	const { logout } = useAuthStore();
	const navigate = useNavigate();

	const handleLogout = () => {
		logout(navigate);
	};

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
			animate={{ width: isSidebarOpen ? 256 : 80 }}
		>
			<div className='h-ful bg-opacity-50 backdrop-blur-md p-4 flex flex-col'>
				<button
					onClick={() => setIsSidebarOpen(!isSidebarOpen)}
					className='p-2 rounded-full hover:bg-[#3D0F09] transition-colors max-w-fit'
				>
					<Menu size={24} />
				</button>

				<nav className='mt-8 flex-grow'>
					{icons.map((item) => (
						<Link
							key={item.href}
							to={item.href}
							onClick={item.name === "Logout" ? handleLogout : undefined}
						>
							<div className='flex items-center p-4 text-sm font-medium rounded-lg hover:bg-amber-100 transition-colors mb-2'>
								<item.icon size={20} style={{ color: item.color, minWidth: "20px" }} />
								<AnimatePresence>
									{isSidebarOpen && (
										<span
											className='ml-4 whitespace-nowrap'
										>
											{item.name}
										</span>
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
