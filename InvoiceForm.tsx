import { useForm } from "react-hook-form";
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
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useAppContext } from "@/context/AppContext";

interface InvoiceFormProps {
  onInvoiceCreated: (invoiceId: string) => void;
}

const formSchema = z.object({
  customerName: z.string().min(1, "Customer name is required"),
  customerEmail: z.string().email("Invalid email").or(z.string().length(0)),
  customerPhone: z.string().optional(),
  notes: z.string().optional(),
  paymentStatus: z.enum(["paid", "pending", "overdue"]),
});

type FormValues = z.infer<typeof formSchema>;

const InvoiceForm = ({ onInvoiceCreated }: InvoiceFormProps) => {
  const { createInvoice, currentBill } = useAppContext();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customerName: "",
      customerEmail: "",
      customerPhone: "",
      notes: "",
      paymentStatus: "pending",
    },
  });

  const onSubmit = (data: FormValues) => {
    if (currentBill.length === 0) {
      form.setError("root", { 
        message: "Cannot create invoice with empty bill" 
      });
      return;
    }

    // Ensure all required properties are non-optional
    const invoiceData = {
      customerName: data.customerName,
      customerEmail: data.customerEmail || "",
      customerPhone: data.customerPhone || "",
      notes: data.notes || "",
      paymentStatus: data.paymentStatus
    };
    
    const invoice = createInvoice(invoiceData);
    form.reset();
    onInvoiceCreated(invoice.id);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {form.formState.errors.root && (
          <div className="text-red-500 text-sm">
            {form.formState.errors.root.message}
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="customerName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Customer Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter customer name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="customerEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Customer Email (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="Enter customer email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="customerPhone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Customer Phone (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="Enter customer phone" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="paymentStatus"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Payment Status</FormLabel>
                <FormControl>
                  <select
                    className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    {...field}
                  >
                    <option value="paid">Paid</option>
                    <option value="pending">Pending</option>
                    <option value="overdue">Overdue</option>
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes (Optional)</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Enter any additional notes"
                  className="min-h-[100px]" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <Button type="submit">
            Create Invoice
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default InvoiceForm;
