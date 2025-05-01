
import { 
  Package, 
  FileText, 
  BarChart, 
  Home, 
  ScanBarcode,
  DollarSign
} from "lucide-react";
import { 
  Sidebar as SidebarComponent, 
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger
} from "@/components/ui/sidebar";
import { useLocation, Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const navigationItems = [
  {
    title: "Dashboard",
    path: "/",
    icon: Home,
  },
  {
    title: "Inventory",
    path: "/inventory",
    icon: Package,
  },
  {
    title: "Billing",
    path: "/billing",
    icon: DollarSign,
  },
  {
    title: "Invoices",
    path: "/invoices",
    icon: FileText,
  },
  {
    title: "Scanner",
    path: "/scanner",
    icon: ScanBarcode,
  },
  {
    title: "Reports",
    path: "/reports",
    icon: BarChart,
  }
];

const Sidebar = () => {
  const location = useLocation();
  
  return (
    <>
      <SidebarTrigger className="absolute top-4 left-4 md:hidden z-40" />
      <SidebarComponent>
        <SidebarContent>
          <div className="flex items-center justify-center py-6">
            <h1 className="text-2xl font-bold text-primary">StockScribe</h1>
          </div>
          <SidebarGroup>
            <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {navigationItems.map((item) => (
                  <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton asChild>
                      <Link 
                        to={item.path} 
                        className={cn(
                          "flex items-center gap-3 w-full",
                          location.pathname === item.path && "font-medium bg-accent/50"
                        )}
                      >
                        <item.icon className="h-5 w-5" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </SidebarComponent>
    </>
  );
};

export default Sidebar;
