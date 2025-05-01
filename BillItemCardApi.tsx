import { useApiContext } from "@/context/ApiContext";
import { BillItem } from "@/types";
import { Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface BillItemCardProps {
  item: BillItem;
}

const BillItemCardApi = ({ item }: BillItemCardProps) => {
  const { removeFromBill, updateBillItemQuantity, isLoading } = useApiContext();
  const [quantity, setQuantity] = useState(item.quantity.toString());
  const [isUpdating, setIsUpdating] = useState(false);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(e.target.value);
  };

  const handleQuantityBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    // Prevent default behavior
    e.preventDefault();

    const newQuantity = parseInt(quantity, 10);
    if (!isNaN(newQuantity) && newQuantity > 0) {
      setIsUpdating(true);
      updateBillItemQuantity(item.id, newQuantity);
      setIsUpdating(false);
    } else {
      // Reset to previous valid quantity if invalid input
      setQuantity(item.quantity.toString());
    }
  };

  return (
    <div className="flex items-center justify-between py-2 border-b last:border-b-0">
      <div className="flex-1">
        <h4 className="font-medium">{item.name}</h4>
        <p className="text-sm text-gray-500">₹{item.price.toFixed(2)} each</p>
      </div>

      <div className="flex items-center space-x-4">
        <div className="w-20">
          <Input
            type="number"
            min="1"
            value={quantity}
            onChange={handleQuantityChange}
            onBlur={handleQuantityBlur}
            className="h-8"
            disabled={isLoading || isUpdating}
          />
        </div>

        <div className="w-24 text-right">
          ₹{item.subtotal.toFixed(2)}
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            removeFromBill(item.id);
          }}
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Trash2 className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default BillItemCardApi;
