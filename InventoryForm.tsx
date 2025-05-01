import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAppContext } from "@/context/AppContext";
import { InventoryItem } from "@/types";

interface InventoryFormProps {
  initialData?: InventoryItem;
  onSubmitSuccess: () => void;
}

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  category: z.string().min(1, "Category is required"),
  quantity: z.coerce
    .number()
    .int()
    .min(0, "Quantity must be zero or positive"),
  price: z.coerce
    .number()
    .min(0, "Price must be zero or positive"),
  lowStockThreshold: z.coerce
    .number()
    .int()
    .min(1, "Low stock threshold must be at least 1"),
  barcode: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const InventoryForm = ({ initialData, onSubmitSuccess }: InventoryFormProps) => {
  const { addInventoryItem, updateInventoryItem } = useAppContext();

  const isEditMode = !!initialData;
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      category: "",
      quantity: 0,
      price: 0,
      lowStockThreshold: 5,
      barcode: "",
    },
  });

  useEffect(() => {
    if (initialData) {
      form.reset(initialData);
    }
  }, [initialData, form]);

  const onSubmit = (data: FormValues) => {
    if (isEditMode && initialData) {
      updateInventoryItem(initialData.id, data);
    } else {
      // Ensure all required properties are present (not optional)
      const newItem = {
        name: data.name,
        category: data.category,
        quantity: data.quantity,
        price: data.price,
        lowStockThreshold: data.lowStockThreshold,
        barcode: data.barcode || ""
      };
      
      addInventoryItem(newItem);
    }
    form.reset();
    onSubmitSuccess();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Item Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter item name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Input placeholder="Enter category" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantity</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="0"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price (₹)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lowStockThreshold"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Low Stock Threshold</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="5"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="barcode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Barcode (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="Enter barcode" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <Button type="submit">
            {isEditMode ? "Update Item" : "Add Item"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default InventoryForm;
