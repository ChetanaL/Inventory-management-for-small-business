
import { useAppContext } from "@/context/AppContext";
import { BillItem } from "@/types";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface BillItemCardProps {
  item: BillItem;
}

const BillItemCard = ({ item }: BillItemCardProps) => {
  const { removeFromBill, updateBillItemQuantity } = useAppContext();
  const [quantity, setQuantity] = useState(item.quantity.toString());

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(e.target.value);
  };

  const handleQuantityBlur = () => {
    const newQuantity = parseInt(quantity, 10);
    if (!isNaN(newQuantity) && newQuantity > 0) {
      updateBillItemQuantity(item.id, newQuantity);
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
          />
        </div>
        
        <div className="w-24 text-right">
          ₹{item.subtotal.toFixed(2)}
        </div>
        
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => removeFromBill(item.id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default BillItemCard;
