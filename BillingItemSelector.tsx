
import { useState, useEffect } from "react";
import { useAppContext } from "@/context/AppContext";
import { InventoryItem } from "@/types";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const BillingItemSelector = () => {
  const { inventory, addToBill } = useAppContext();
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState<InventoryItem[]>(inventory);
  const [selectedQuantity, setSelectedQuantity] = useState<Record<string, number>>({});

  useEffect(() => {
    if (searchQuery) {
      const lowercaseQuery = searchQuery.toLowerCase();
      setFilteredItems(
        inventory.filter(
          (item) =>
            item.name.toLowerCase().includes(lowercaseQuery) ||
            item.category.toLowerCase().includes(lowercaseQuery) ||
            item.barcode?.toLowerCase().includes(lowercaseQuery)
        )
      );
    } else {
      setFilteredItems(inventory.filter(item => item.quantity > 0));
    }
  }, [searchQuery, inventory]);

  const handleSelectItem = (item: InventoryItem) => {
    const quantity = selectedQuantity[item.id] || 1;
    addToBill(item.id, quantity);
    setOpen(false);
    setSearchQuery("");
    
    // Reset the selected quantity
    const newSelectedQuantity = { ...selectedQuantity };
    delete newSelectedQuantity[item.id];
    setSelectedQuantity(newSelectedQuantity);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          className="w-full justify-start text-left"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Item to Bill
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-[300px]" align="start">
        <Command>
          <CommandInput 
            placeholder="Search items..." 
            value={searchQuery}
            onValueChange={setSearchQuery}
          />
          <CommandList>
            <CommandEmpty>No items found.</CommandEmpty>
            <CommandGroup heading="Available Items">
              {filteredItems
                .filter(item => item.quantity > 0)
                .map((item) => (
                  <CommandItem
                    key={item.id}
                    value={item.id}
                    onSelect={() => handleSelectItem(item)}
                  >
                    <div className="flex justify-between w-full">
                      <span>{item.name}</span>
                      <span className="text-muted-foreground">
                        ₹{item.price} ({item.quantity} in stock)
                      </span>
                    </div>
                  </CommandItem>
                ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default BillingItemSelector;
