
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppContext } from "@/context/AppContext";
import { 
  ResponsiveContainer, 
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend
} from "recharts";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const CategorySalesChart = () => {
  const { categorySales } = useAppContext();
  
  return (
    <Card className="col-span-full md:col-span-1">
      <CardHeader>
        <CardTitle>Sales by Category</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={categorySales}
              cx="50%"
              cy="50%"
              labelLine={false}
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              dataKey="sales"
              nameKey="category"
              label={({ category, percent }) => `${category}: ${(percent * 100).toFixed(0)}%`}
            >
              {categorySales.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value) => [`₹${value}`, 'Sales']}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default CategorySalesChart;
