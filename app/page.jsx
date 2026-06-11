'use client';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [columns, setColumns] = useState(4);
  const [loading, setLoading] = useState(true);

  // This hook runs automatically when the page loads to fetch real items
  useEffect(() => {
    async function fetchProducts() {
      try {
        const { data, error } = await supabase
          .from('products') // Pulls data directly from your SQL table
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setProducts(data || []);
      } catch (error) {
        console.error('Error loading products:', error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return (
    <main className="max-w-[1600px] mx-auto px-6 py-12 bg-white min-h-screen">
      
      <div className="text-center mb-16">
        <h2 className="text-sm tracking-[0.3em] text-gray-500 mb-2">NEW ARRIVALS</h2>
        <h1 className="text-3xl font-light tracking-widest uppercase">The S. Sikamòre Collection</h1>
      </div>

      {/* Toolbar for layout grid switching */}
      <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-100 text-xs tracking-wider text-gray-500">
        <div>{loading ? 'LOADING...' : `SHOWING ${products.length} ITEMS`}</div>
        
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

      {/* Loading Skeleton State */}
      {loading ? (
        <div className="text-center py-24 text-xs tracking-widest text-gray-400 uppercase animate-pulse">
          Loading Collection...
        </div>
      ) : products.length === 0 ? (
        /* Empty State if no products exist yet */
        <div className="text-center py-24 text-xs tracking-widest text-gray-400 uppercase">
          No products found. Use the /admin panel to add your first item!
        </div>
      ) : (
        /* Live Dynamic Product Grid */
        <div className={`grid gap-x-6 gap-y-12 transition-all duration-500 ${columns === 2 ? 'grid-cols-2' : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-4'}`}>
          {products.map((product) => (
            <ProductCard key={product.id} product={{
              id: product.id,
              name: product.name,
              price: product.price,
              image: product.image,
              isSoldOut: product.is_sold_out
            }} />
          ))}
        </div>
      )}
    </main>
  );
}
