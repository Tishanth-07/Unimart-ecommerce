"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Product, FilterState, SortOption, PaginationInfo } from "@/types";
import { productsAPI } from "@/utils/api";
import ProductCard from "@/components/Product/ProductCard";
import ProductFilter from "@/components/Product/ProductFilter";
import ProductSort from "@/components/Product/ProductSort";
import Pagination from "@/components/Product/Pagination";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";

const ShopPage = () => {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState<PaginationInfo>({
    currentPage: 1,
    totalPages: 1,
    totalProducts: 0,
    hasNextPage: false,
    hasPrevPage: false,
  });

  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 10000],
    categories: [],
    popularity: [],
  });

  const [sortBy, setSortBy] = useState("default");
  const [searchQuery, setSearchQuery] = useState("");

  // Initialize search query from URL params
  useEffect(() => {
    const search = searchParams?.get("search");
    const category = searchParams?.get("category");
    const sort = searchParams?.get("sortBy");

    if (search) {
      setSearchQuery(search);
    }

    if (category) {
      setFilters((prev) => ({
        ...prev,
        categories: [category],
      }));
    }

    if (sort) {
      setSortBy(sort);
    }
  }, [searchParams]);

  const fetchProducts = async (page = 1) => {
    setLoading(true);
    try {
      const search = searchParams?.get("search") || "";
      const categoryParam = filters.categories.join(",");

      const params: any = {
        page,
        search,
        limit: 12,
        sort: sortBy,
      };

      if (searchQuery) {
        params.search = searchQuery;
      }

      if (filters.categories.length) {
        params.category = categoryParam;
      }

      if (filters.priceRange[0] > 0) {
        params.minPrice = filters.priceRange[0];
      }

      if (filters.priceRange[1] < 10000) {
        params.maxPrice = filters.priceRange[1];
      }

     if (filters.popularity.length)
       params.popularity = filters.popularity.join(",");

      const response = await productsAPI.getAll(params) as { products: Product[]; pagination: PaginationInfo };
      setProducts(response.products);
      setPagination(response.pagination);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to load products");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [filters, sortBy, searchQuery]);

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
  };

  const handleSortChange = (newSortBy: string) => {
    setSortBy(newSortBy);
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
  };

  const handlePageChange = async (page: number) => {
    setLoading(true);
    try {
      await fetchProducts(page);
    } finally {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const clearFilters = () => {
    setFilters({
      priceRange: [0, 10000],
      categories: [],
      popularity: [],
    });
    setSortBy("default");
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Shop</h1>
          {searchQuery && (
            <p className="text-gray-600">
              Showing results for "{searchQuery}" ({pagination.totalProducts}{" "}
              products found)
            </p>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Filters */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <ProductFilter
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearFilters={clearFilters}
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Sort and Results Info */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="text-gray-600 mb-4 sm:mb-0">
                Showing {products.length} of {pagination.totalProducts} products
                {pagination.totalPages > 1 && (
                  <span className="ml-2">
                    (Page {pagination.currentPage} of {pagination.totalPages})
                  </span>
                )}
              </div>
              <ProductSort sortBy={sortBy} onSortChange={handleSortChange} />
            </div>

            {/* Loading State */}
            {loading && (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
                <span className="ml-2 text-gray-600">Loading products...</span>
              </div>
            )}

            {/* Products Grid */}
            {!loading && products.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            )}

            {/* No Products Found */}
            {!loading && products.length === 0 && (
              <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="text-6xl mb-4">🛍️</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No products found
                </h3>
                <p className="text-gray-600 mb-6">
                  {searchQuery
                    ? `No products found matching "${searchQuery}". Try adjusting your search or filters.`
                    : "No products match your current filters. Try adjusting your criteria."}
                </p>
                <button onClick={clearFilters} className="btn-primary">
                  Clear All Filters
                </button>
              </div>
            )}

            {/* Pagination */}
            {!loading && products.length > 0 && pagination.totalPages > 1 && (
              <Pagination
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                onPageChange={handlePageChange}
                hasNextPage={pagination.hasNextPage}
                hasPrevPage={pagination.hasPrevPage}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
