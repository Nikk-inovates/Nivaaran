import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Laptop, Dumbbell, Camera, Home, Gamepad2 } from "lucide-react";
import { fetchProducts } from "@/services/api";
import { Product } from "@/types/product";
import categoriesData from "@/data/categories.json";

const Index = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const products = await fetchProducts();
        setFeaturedProducts(products.slice(0, 4));
      } catch (err) {
        console.error("Failed to load featured products:", err);
      }
    };
    loadProducts();
  }, []);

  const iconMap: { [key: string]: any } = {
    Laptop,
    Dumbbell,
    Camera,
    Home,
    Gamepad2,
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <Hero />

        {/* Featured Products Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Featured Products</h2>
              <p className="text-muted-foreground">Hand-picked deals you don't want to miss</p>
            </div>
            <Link to="/products">
              <Button variant="ghost" className="hidden sm:flex">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-8 sm:hidden">
            <Link to="/products">
              <Button variant="secondary">
                View All Products <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>

        {/* Categories Section */}
        <section className="bg-muted py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-2">Shop by Category</h2>
              <p className="text-muted-foreground">Find exactly what you're looking for</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {categoriesData.map((category) => {
                const Icon = iconMap[category.icon];
                return (
                  <Link
                    key={category.id}
                    to={`/products?category=${category.slug}`}
                    className="group"
                  >
                    <div className="bg-card rounded-lg p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <Icon className="h-8 w-8" />
                      </div>
                      <h3 className="font-semibold mb-1">{category.name}</h3>
                      <p className="text-sm text-muted-foreground">{category.description}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-8 md:p-12 text-white" style={{ background: 'var(--gradient-hero)' }}>
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
              <p className="text-white/90 mb-6">
                Subscribe to our newsletter for exclusive deals, product reviews, and tech tips delivered to your inbox.
              </p>
              <form className="flex flex-col sm:flex-row gap-3" onSubmit={(e) => e.preventDefault()}>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 bg-white/10 border-white/30 text-white placeholder:text-white/60 focus:bg-white/20"
                />
                <Button type="submit" variant="secondary" size="lg">
                  Subscribe
                </Button>
              </form>
              <p className="text-xs text-white/70 mt-4">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
