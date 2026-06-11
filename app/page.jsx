'use client';
import { useState } from 'react';
import ProductCard from '../components/ProductCard';

const MOCK_PRODUCTS = [
  { id: 1, name: "LUMIÈRE MAXI DRESS", price: 85000, image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80", isSoldOut: false },
  { id: 2, name: "AURA SILK TUNIC", price: 62000, image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=600&q=80", isSoldOut: true },
  { id: 3, name: "NOIR PLEATED TROUSERS", price: 45000, image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80", isSoldOut: false },
  { id: 4, name: "SOLSTICE LINEN BLAZER", price: 95000, image: "https://images.unsplash.com/photo-1548624149-f7b31603045e?auto=format&fit=crop&w=600&q=80", isSoldOut: false },
];

export default function Home() {
  const [columns, setColumns] = useState(4);

  return (
    <main className="max-w-[1600px] mx-auto px-6 py-12 bg-white min-h-screen">
      
      <div className="text-center mb-16">
        <h2 className="text-sm tracking-[0.3em] text-gray-500 mb-2">NEW ARRIVALS</h2>
        <h1 className="text-3xl font-light tracking-widest uppercase">The S. Sikamòre Collection</h1>
      </div>

      <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-100 text-xs tracking-wider text-gray-500">
        <div>SHOWING {MOCK_PRODUCTS.length} ITEMS</div>
        
        <div className="flex items-center gap-3">
          <span className="mr-2 text-[10px] uppercase">Grid:</span>
          <button onClick={() => setColumns(2)} className={`p-1 border transition-all ${columns === 2 ? 'border-black text-black' : 'border-gray-200 text-gray-400'}`}>
            <div className="w-4 h-4 flex gap-[2px]"><div className="w-1/2 h-full bg-current"></div><div className="w-1/2 h-full bg-current"></div></div>
          </button>
          <button onClick={() => setColumns(4)} className={`p-1 border transition-all ${columns === 4 ? 'border-black text-black' : 'border-gray-200 text-gray-400'}`}>
            <div className="w-4 h-4 grid grid-cols-2 gap-[2px]"><div className="bg-current"></div><div className="bg-current"></div><div className="bg-current"></div><div className="bg-current"></div></div>
          </button>
        </div>
      </div>

      <div className={`grid gap-x-6 gap-y-12 transition-all duration-500 ${columns === 2 ? 'grid-cols-2' : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-4'}`}>
        {/* We map through our data and pass it to our newly isolated ProductCard component */}
        {MOCK_PRODUCTS.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}
