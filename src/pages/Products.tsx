import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Loader2, AlertCircle, LayoutGrid, Rows, Square } from "lucide-react";
import { fetchProducts } from "@/services/api";
import type { Product } from "@/types/product";

const ITEMS_PER_PAGE = 9;
type ViewMode = "small" | "large" | "list";

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";
  const initialView = (searchParams.get("view") as ViewMode) || "large";

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [viewMode, setViewMode] = useState<ViewMode>(initialView);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // keep state in sync with URL when user navigates
  useEffect(() => {
    const category = searchParams.get("category");
    const view = (searchParams.get("view") as ViewMode) || null;
    if (category) setSelectedCategory(category);
    if (view) setViewMode(view);
  }, [searchParams]);

  useEffect(() => {
    loadProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchProducts({ limit: 200 });
      setProducts(Array.isArray(data.items) ? data.items : []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load products");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // De-duplicate categories (case-insensitive), keep original label
  const categories: string[] = useMemo(
    () =>
      Array.from(
        new Map(
          products
            .map((p) => (p.category ?? "").toString().trim())
            .filter(Boolean)
            .map((label) => [label.toLowerCase(), label])
        ).values()
      ),
    [products]
  );

  const toLower = (v: unknown) => (v ?? "").toString().toLowerCase();

  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return products.filter((product) => {
      const productCat = toLower(product.category);
      const matchesCategory =
        selectedCategory === "all" ||
        productCat === selectedCategory.toLowerCase();

      if (!q) return matchesCategory;

      const matchesSearch =
        toLower(product.name).includes(q) ||
        toLower(product.description).includes(q) ||
        toLower(product.platform).includes(q) ||
        productCat.includes(q) ||
        toLower(product.tags).includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [products, searchQuery, selectedCategory]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / ITEMS_PER_PAGE));
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const updateSearchParams = (next: { category?: string; view?: ViewMode }) => {
    const params = new URLSearchParams(searchParams);
    if (next.category) params.set("category", next.category);
    else params.delete("category");

    if (next.view) params.set("view", next.view);
    else params.delete("view");

    setSearchParams(params);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    updateSearchParams({ category, view: viewMode });
  };

  const handleViewChange = (view: ViewMode) => {
    setViewMode(view);
    updateSearchParams({ category: selectedCategory !== "all" ? selectedCategory : undefined, view });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Grid classes based on view
  const gridClasses =
    viewMode === "small"
      ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-8"
      : viewMode === "large"
      ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
      : "space-y-4"; // list

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Header */}
        <section className="bg-muted py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4">All Products</h1>
            <p className="text-muted-foreground">
              Discover our curated selection of top-rated products
            </p>
          </div>
        </section>

        <div className="container mx-auto px-4 py-8">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-3 text-lg">Loading products...</span>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-20">
              <AlertCircle className="h-12 w-12 text-destructive mb-4" />
              <h3 className="text-xl font-semibold mb-2">Failed to Load Products</h3>
              <p className="text-muted-foreground mb-4">{error}</p>
              <Button onClick={loadProducts}>Retry</Button>
            </div>
          ) : (
            <>
              {/* Search, Filters, View Mode */}
              <div className="mb-8 space-y-4">
                {/* Search */}
                <div className="relative max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="pl-10"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-2 justify-between">
                  {/* Category Filter */}
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant={selectedCategory === "all" ? "default" : "outline"}
                      onClick={() => handleCategoryChange("all")}
                      size="sm"
                    >
                      All Products
                    </Button>
                    {categories.map((category) => (
                      <Button
                        key={category}
                        variant={
                          selectedCategory === category.toLowerCase()
                            ? "default"
                            : "outline"
                        }
                        onClick={() => handleCategoryChange(category.toLowerCase())}
                        size="sm"
                      >
                        {category}
                      </Button>
                    ))}
                  </div>

                  {/* View Mode Toggle */}
                  <div className="flex items-center gap-2">
                    <Button
                      variant={viewMode === "small" ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleViewChange("small")}
                      title="Small grid"
                    >
                      <Square className="mr-2 h-4 w-4" /> Small
                    </Button>
                    <Button
                      variant={viewMode === "large" ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleViewChange("large")}
                      title="Large grid"
                    >
                      <LayoutGrid className="mr-2 h-4 w-4" /> Large
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleViewChange("list")}
                      title="List view"
                    >
                      <Rows className="mr-2 h-4 w-4" /> List
                    </Button>
                  </div>
                </div>
              </div>

              {/* Results Count */}
              <div className="mb-6">
                <p className="text-muted-foreground">
                  Showing {filteredProducts.length === 0 ? 0 : startIndex + 1}-
                  {Math.min(startIndex + ITEMS_PER_PAGE, filteredProducts.length)} of{" "}
                  {filteredProducts.length} products
                </p>
              </div>

              {/* Products List / Grid */}
              {paginatedProducts.length > 0 ? (
                <>
                  {viewMode === "list" ? (
                    <div className={gridClasses}>
                      {paginatedProducts.map((product) => (
                        <div
                          key={String(product.id)}
                          className="rounded-xl border p-4 flex gap-4 items-start"
                        >
                          {/* Image left */}
                          <div className="w-32 h-32 shrink-0 rounded-lg overflow-hidden bg-muted">
                            <ProductCard product={product} />
                          </div>
                          {/* Details right (reuse ProductCard link and pricing by linking to details) */}
                          <div className="flex-1">
                            <div className="text-xs text-muted-foreground mb-1">
                              {(product.platform ?? "").toString()}
                            </div>
                            <a
                              href={`/product/${String(product.id ?? "")}`}
                              className="font-semibold text-foreground hover:text-primary transition-colors"
                            >
                              {(product.name ?? "").toString() || "Untitled"}
                            </a>
                            <div className="text-xs text-muted-foreground mt-1">
                              {(product.category ?? "").toString()}
                            </div>
                            {/* Keep it lean in list view; full details on detail page */}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className={gridClasses}>
                      {paginatedProducts.map((product) => (
                        <ProductCard key={String(product.id)} product={product} />
                      ))}
                    </div>
                  )}

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex justify-center gap-2">
                      <Button
                        variant="outline"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                      >
                        Previous
                      </Button>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <Button
                          key={page}
                          variant={currentPage === page ? "default" : "outline"}
                          onClick={() => handlePageChange(page)}
                        >
                          {page}
                        </Button>
                      ))}
                      <Button
                        variant="outline"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                      >
                        Next
                      </Button>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-lg">
                    No products found matching your criteria.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Products;
