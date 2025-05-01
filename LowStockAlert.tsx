
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { useAppContext } from "@/context/AppContext";
import { Link } from "react-router-dom";

const LowStockAlert = () => {
  const { inventory } = useAppContext();
  
  const lowStockItems = inventory.filter(item => item.quantity <= item.lowStockThreshold);
  
  if (lowStockItems.length === 0) {
    return null;
  }
  
  return (
    <Alert variant="destructive" className="mb-4">
      <AlertTitle>Low Stock Alert!</AlertTitle>
      <AlertDescription>
        {lowStockItems.length === 1 ? (
          <p>
            <strong>{lowStockItems[0].name}</strong> is running low on stock with only{" "}
            <strong>{lowStockItems[0].quantity}</strong> units remaining.
          </p>
        ) : (
          <p>
            <strong>{lowStockItems.length} items</strong> are running low on stock.{" "}
            <Link to="/inventory" className="underline">
              View details
            </Link>
          </p>
        )}
      </AlertDescription>
    </Alert>
  );
};

export default LowStockAlert;
