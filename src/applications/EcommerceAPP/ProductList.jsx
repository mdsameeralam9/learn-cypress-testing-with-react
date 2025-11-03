import React, { useEffect, useState } from "react";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadProducts() {
    try {
      setLoading(true);
      const res = await fetch("https://dummyjson.com/products", {
        headers: {
          // Access token is not required for GET products, but included if you want to demo auth headers:
          Authorization: `Bearer ${localStorage.getItem("accessToken") || ""}`,
        },
        //credentials: "include",
      });
      const data = await res.json();
      if (res.ok && data?.products) {
        setProducts(data.products);
      } else {
        setProducts([]);
      }
    } catch (e) {
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Product List</h2>
      {loading ? (
        <div className="text-gray-600">Loading products...</div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {products.map((p) => (
            <div key={p.id} className="rounded border bg-white p-4">
              <div className="aspect-video overflow-hidden rounded mb-3 bg-gray-100">
                {/* Thumbnail if present */}
                {p.thumbnail ? (
                  <img
                    src={p.thumbnail}
                    alt={p.title}
                    className="h-full w-full object-cover"
                  />
                ) : null}
              </div>
              <h3 className="font-medium">{p.title}</h3>
              <p className="text-sm text-gray-600">Price: ${p.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
