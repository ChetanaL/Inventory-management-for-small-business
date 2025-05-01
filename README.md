# StockScribe Billing Hub

A comprehensive inventory management and billing system with barcode scanning capabilities.

## Features

- **Dashboard**: Overview of sales, inventory, and business metrics
- **Inventory Management**: Track products, stock levels, and pricing
- **Billing System**: Create bills and generate invoices
- **Invoice Management**: Track and manage customer invoices
- **Barcode Scanner**: Scan products for quick addition to bills
- **Reports**: Generate and view sales and inventory reports

## Tech Stack

### Frontend
- React with TypeScript
- Tailwind CSS with Shadcn UI components
- React Router for navigation
- React Query for data fetching
- PDF generation with jsPDF

### Backend
- Django with Django REST Framework
- PostgreSQL database
- CORS support for frontend integration

## Setup Instructions

### Prerequisites
- Node.js and npm
- Python 3.8+
- PostgreSQL

Follow these steps:

### Frontend Setup

```sh
# Step 1: Navigate to the project root directory

# Step 2: Install the necessary dependencies.
npm install

# Step 3: Start the development server with auto-reloading.
npm run dev
```

### Backend Setup

```sh
# Step 1: Navigate to the backend directory
cd backend

# Step 2: Create a virtual environment
python -m venv venv

# Step 3: Activate the virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
# source venv/bin/activate

# Step 4: Install dependencies
pip install -r requirements.txt

# Step 5: Configure the database in inventory_project/settings.py
# Update the database credentials with your PostgreSQL details

# Step 6: Run migrations
python manage.py makemigrations
python manage.py migrate

# Step 7: Create a superuser (for admin access)
python manage.py createsuperuser

# Step 8: Start the development server
python manage.py runserver
```

## Next Steps for Development

1. Connect the frontend to the backend API
2. Implement user authentication
3. Add more features to the barcode scanner
4. Enhance reporting capabilities
5. Add data export/import functionality
