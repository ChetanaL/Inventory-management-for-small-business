import { useState, useEffect } from "react";
import { useApiContext } from "@/context/ApiContext";
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
import { Input } from "@/components/ui/input";
import { Plus, Loader2, MinusCircle, PlusCircle } from "lucide-react";

const BillingItemSelectorApi = () => {
  const { inventory, addToBill, isLoading } = useApiContext();
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

  const handleSelectItem = (value: string, e?: React.MouseEvent | React.KeyboardEvent) => {
    // Prevent default behavior that might cause navigation
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    // Find the item by ID
    const item = inventory.find(i => i.id === value);
    if (!item) return;

    console.log(`Selected item: ${item.name} (ID: ${item.id})`);

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
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Plus className="mr-2 h-4 w-4" />
          )}
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
            {isLoading ? (
              <div className="flex items-center justify-center p-4">
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Loading...
              </div>
            ) : (
              <>
                <CommandEmpty>No items found.</CommandEmpty>
                <CommandGroup heading="Available Items">
                  {filteredItems
                    .filter(item => item.quantity > 0)
                    .map((item) => (
                      <CommandItem
                        key={item.id}
                        value={item.id}
                        onSelect={(value) => handleSelectItem(value)}
                      >
                        <div className="flex flex-col w-full">
                          <div className="flex justify-between w-full">
                            <span>{item.name}</span>
                            <span className="text-muted-foreground">
                              ₹{item.price} ({item.quantity} in stock)
                            </span>
                          </div>
                          <div className="flex items-center mt-2">
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              onClick={(e) => {
                                e.stopPropagation();
                                const currentQty = selectedQuantity[item.id] || 1;
                                if (currentQty > 1) {
                                  setSelectedQuantity({
                                    ...selectedQuantity,
                                    [item.id]: currentQty - 1
                                  });
                                }
                              }}
                            >
                              <MinusCircle className="h-4 w-4" />
                            </Button>
                            <Input
                              type="number"
                              min="1"
                              max={item.quantity}
                              value={selectedQuantity[item.id] || 1}
                              onChange={(e) => {
                                e.stopPropagation();
                                const value = parseInt(e.target.value);
                                if (!isNaN(value) && value > 0 && value <= item.quantity) {
                                  setSelectedQuantity({
                                    ...selectedQuantity,
                                    [item.id]: value
                                  });
                                }
                              }}
                              onClick={(e) => e.stopPropagation()}
                              className="h-7 w-16 mx-1 text-center"
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              onClick={(e) => {
                                e.stopPropagation();
                                const currentQty = selectedQuantity[item.id] || 1;
                                if (currentQty < item.quantity) {
                                  setSelectedQuantity({
                                    ...selectedQuantity,
                                    [item.id]: currentQty + 1
                                  });
                                }
                              }}
                            >
                              <PlusCircle className="h-4 w-4" />
                            </Button>
                            <Button
                              type="button"
                              size="sm"
                              className="ml-auto"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSelectItem(item.id, e);
                              }}
                            >
                              Add
                            </Button>
                          </div>
                        </div>
                      </CommandItem>
                    ))}
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default BillingItemSelectorApi;
