
import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useAppContext } from "@/context/AppContext";
import StockLevelBadge from "./StockLevelBadge";
import { InventoryItem } from "@/types";
import { Edit, MoreHorizontal, Trash2 } from "lucide-react";

interface InventoryTableProps {
  onEdit: (item: InventoryItem) => void;
}

const InventoryTable = ({ onEdit }: InventoryTableProps) => {
  const { inventory, deleteInventoryItem } = useAppContext();
  const [filteredInventory, setFilteredInventory] = useState<InventoryItem[]>(inventory);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredInventory(inventory);
    } else {
      const lowercaseQuery = searchQuery.toLowerCase();
      const filtered = inventory.filter(
        (item) =>
          item.name.toLowerCase().includes(lowercaseQuery) ||
          item.category.toLowerCase().includes(lowercaseQuery) ||
          item.barcode?.toLowerCase().includes(lowercaseQuery)
      );
      setFilteredInventory(filtered);
    }
  }, [searchQuery, inventory]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <h2 className="text-xl font-semibold">Inventory Items</h2>
        <Input
          placeholder="Search items..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-xs"
        />
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Price (₹)</TableHead>
              <TableHead className="text-center">Quantity</TableHead>
              <TableHead className="text-center">Stock Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInventory.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  {searchQuery ? "No items match your search" : "No inventory items found"}
                </TableCell>
              </TableRow>
            ) : (
              filteredInventory.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell className="text-right">
                    {item.price.toLocaleString("en-IN")}
                  </TableCell>
                  <TableCell className="text-center">{item.quantity}</TableCell>
                  <TableCell className="text-center">
                    <StockLevelBadge
                      quantity={item.quantity}
                      threshold={item.lowStockThreshold}
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onEdit(item)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => deleteInventoryItem(item.id)}
                          className="text-red-600"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default InventoryTable;
