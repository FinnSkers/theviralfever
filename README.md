# ShopBuilder AI

An AI-powered website builder that generates beautiful, modern e-commerce stores with full inventory management capabilities.

## 🌟 Features

- **AI-Powered Shop Generation**: Describe your shop in natural language and get a fully functional online store in seconds
- **Modern UI/UX**: Beautiful, responsive design with smooth animations and gradients
- **Full Inventory Management**: Complete CRUD operations for products
  - Add new products
  - Edit existing products
  - Delete products
  - Real-time stock tracking
- **Shopping Cart**: Fully functional shopping cart with quantity management
- **Theme Customization**: AI automatically selects themes based on your description:
  - Modern (Blue/Purple gradient)
  - Minimal (Black/Gray)
  - Vibrant (Pink/Orange gradient)
  - Elegant (Purple/Indigo gradient)
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/FinnSkers/theviralfever.git
cd theviralfever
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📖 Usage

### Creating a New Shop

1. Visit the homepage
2. Enter a description of your desired shop in the text area
   - Example: "Create a modern electronics store with a vibrant theme"
   - Example: "I want an elegant jewelry shop with a minimal design"
3. Click "Generate My Shop"
4. Your custom shop will be created and you'll be redirected to it

### Managing Inventory

1. Click the "Edit Mode" button in the header of your shop
2. Use the form at the top to add new products:
   - Enter product name, category, price, stock quantity
   - Add an image URL (supports Unsplash and other image services)
   - Write a product description
   - Click "Add Product"
3. Edit existing products by clicking the blue edit icon on any product card
4. Delete products by clicking the red delete icon
5. Click "View Mode" to exit edit mode and see the customer view

### Shopping Experience

1. Browse products in your shop
2. Click "Add" to add items to cart
3. Click the cart icon to view your shopping cart
4. Adjust quantities using the +/- buttons
5. Remove items with the X button
6. See real-time total calculation
7. Click "Proceed to Checkout" (demo feature)

## 🏗️ Technology Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Image Optimization**: Next.js Image Component

## 📁 Project Structure

```
├── app/
│   ├── api/
│   │   ├── products/     # Product CRUD API routes
│   │   └── shops/        # Shop creation API routes
│   ├── shop/[id]/        # Dynamic shop pages
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Landing page
├── components/
│   ├── ProductCard.tsx   # Product display component
│   └── ShoppingCart.tsx  # Shopping cart sidebar
├── lib/
│   ├── types.ts          # TypeScript interfaces
│   ├── storage.ts        # In-memory data storage
│   └── ai-generator.ts   # AI shop generation logic
└── public/               # Static assets
```

## 🎨 Themes

The AI automatically detects keywords in your prompt to select appropriate themes:

- **Modern**: Default theme with blue-purple gradients
- **Minimal**: Triggered by "minimal", "simple", "clean"
- **Vibrant**: Triggered by "vibrant", "colorful", "bright"
- **Elegant**: Triggered by "elegant", "luxury", "premium"

## 📝 API Routes

### POST /api/shops
Create a new shop from a text prompt.

**Request Body:**
```json
{
  "prompt": "Create a modern electronics store"
}
```

**Response:**
```json
{
  "shop": {
    "id": "shop-xxx",
    "name": "Tech Store",
    "description": "Your source for cutting-edge technology",
    "theme": "modern",
    "primaryColor": "#3b82f6"
  }
}
```

### GET /api/products?shopId={id}
Get all products for a shop.

### POST /api/products
Add a new product to a shop.

### PUT /api/products
Update an existing product.

### DELETE /api/products?shopId={id}&id={productId}
Delete a product from a shop.

## 🔧 Configuration

The application uses in-memory storage by default. For production use, replace the storage implementation in `lib/storage.ts` with a real database (PostgreSQL, MongoDB, etc.).

## 🌐 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the repository in Vercel
3. Deploy with one click

### Other Platforms

```bash
npm run build
npm start
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Images from [Unsplash](https://unsplash.com)
- Icons from [Lucide](https://lucide.dev)
- Built with [Next.js](https://nextjs.org)
