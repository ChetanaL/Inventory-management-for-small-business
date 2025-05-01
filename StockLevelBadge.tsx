
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface StockLevelBadgeProps {
  quantity: number;
  threshold: number;
  className?: string;
}

const StockLevelBadge = ({ quantity, threshold, className }: StockLevelBadgeProps) => {
  const getStockLevel = () => {
    if (quantity <= threshold) {
      return {
        label: "Low Stock",
        variant: "destructive" as const
      };
    }
    if (quantity <= threshold * 2) {
      return {
        label: "Medium Stock",
        variant: "warning" as const
      };
    }
    return {
      label: "In Stock",
      variant: "outline" as const
    };
  };

  const { label, variant } = getStockLevel();
  
  return (
    <Badge 
      variant={variant === "warning" ? "outline" : variant}
      className={cn(
        variant === "warning" && "border-orange-500 bg-orange-100 text-orange-800",
        className
      )}
    >
      {label}
    </Badge>
  );
};

export default StockLevelBadge;
