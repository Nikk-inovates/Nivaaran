import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Facebook, Twitter, Mail, Loader2, AlertCircle } from "lucide-react";
import { fetchProductById, fetchProducts, formatCurrency } from "@/services/api";
import type { Product } from "@/types/product";

function sanitizeUrl(u: unknown): string {
  const s = (u ?? "").toString().trim();
  if (!s) return "";
  try {
    return encodeURI(s);
  } catch {
    return "";
  }
}

function collectImages(p: Product): string[] {
  const fourth = (p as any).fourth_image_url ?? (p as any).foutrh_image_url;
  const candidates = [
    p.first_image_url,
    p.second_image_url,
    p.third_image_url,
    fourth,
  ]
    .map(sanitizeUrl)
    .filter(Boolean);

  // Deduplicate, preserve order
  const seen = new Set<string>();
  const unique: string[] = [];
  for (const u of candidates) {
    if (!seen.has(u)) {
      seen.add(u);
      unique.push(u);
    }
  }
  return unique;
}

function toNum(v: unknown): number | null {
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

const ProductDetail = () => {
  // Support either /product/:id or /product/:slug
  const { id, slug } = useParams<{ id?: string; slug?: string }>();
  const param = id ?? slug ?? "";
  const numericId = Number(param);
  const idForFetch = Number.isFinite(numericId) ? numericId : param;

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        setLoading(true);
        setError(null);

        // 1) Load the primary product
        const one = await fetchProductById(idForFetch);
        if (!active) return;

        if (!one) {
          setError("Product not found");
          setProduct(null);
          return;
        }

        setProduct(one);

        // set initial image
        const imgs = collectImages(one);
        setSelectedImage(imgs[0] || "/placeholder.svg");

        // 2) Load related products (same category, exclude self)
        try {
          const all = await fetchProducts({ limit: 200 });
          const items = Array.isArray(all.items) ? all.items : [];
          const cat = (one.category ?? "").toString().toLowerCase();
          const rel = items
            .filter(
              (p) =>
                String(p.id) !== String(one.id) &&
                (p.category ?? "").toString().toLowerCase() === cat
            )
            .slice(0, 4);
          setRelatedProducts(rel);
        } catch {
          // Non-fatal if related fails
          setRelatedProducts([]);
        }
      } catch (err: any) {
        setError(err?.message || "Failed to load product");
        setProduct(null);
      } finally {
        if (active) setLoading(false);
      }
    }

    load();
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idForFetch]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-3 text-lg">Loading product...</span>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-16">
          <div className="flex flex-col items-center justify-center py-20">
            <AlertCircle className="h-12 w-12 text-destructive mb-4" />
            <h3 className="text-xl font-semibold mb-2">Product Not Found</h3>
            <p className="text-muted-foreground mb-4">
              {error || "The product you're looking for doesn't exist."}
            </p>
            <div className="flex gap-3">
              <Link to="/products">
                <Button>Back to Products</Button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const images = collectImages(product);
  const tags = (product.tags ?? "")
    .toString()
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  const buyPrice = toNum(product.buy_price);
  const originalPrice = toNum(product.original_price);
  const hasDiscount =
    buyPrice != null &&
    originalPrice != null &&
    originalPrice > 0 &&
    buyPrice > 0 &&
    originalPrice > buyPrice;
  const discount = hasDiscount
    ? Math.round(((originalPrice! - buyPrice!) / originalPrice!) * 100)
    : 0;

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareTitle = (product.name ?? "").toString();

  const affiliateUrl = sanitizeUrl((product as any).affiliate_url);

  // Polished affiliate note
  const affiliateNote = (
    <p className="text-xs text-muted-foreground text-center mt-3 leading-relaxed">
      This page contains affiliate links. If you purchase through these links, we may earn a small
      commission at no extra cost to you. This helps us keep the site running and continue curating
      quality products.
    </p>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary">
              Home
            </Link>
            <span>/</span>
            <Link to="/products" className="hover:text-primary">
              Products
            </Link>
            <span>/</span>
            <span className="text-foreground">{product.name}</span>
          </div>
        </div>

        {/* Product Details */}
        <section className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Images */}
            <div>
              <div className="aspect-square rounded-lg overflow-hidden mb-4 bg-muted">
                <img
                  src={selectedImage || images[0] || "/placeholder.svg"}
                  alt={(product.name ?? "Product image").toString()}
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </div>

              {images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {images.slice(0, 8).map((image, index) => (
                    <button
                      key={image + index}
                      onClick={() => setSelectedImage(image)}
                      className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                        selectedImage === image ? "border-primary" : "border-transparent"
                      }`}
                      aria-label={`Show image ${index + 1}`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Info */}
            <div>
              {product.category && <Badge className="mb-4">{product.category}</Badge>}

              <h1 className="text-3xl md:text-4xl font-bold mb-4">{product.name}</h1>

              {product.platform && (
                <div className="flex items-center gap-2 mb-6">
                  <Badge variant="outline">{product.platform}</Badge>
                </div>
              )}

              <div className="flex items-baseline gap-3 mb-6">
                {buyPrice != null ? (
                  <span className="text-4xl font-bold text-primary">
                    {formatCurrency(buyPrice)}
                  </span>
                ) : (
                  <span className="text-4xl font-bold text-primary">—</span>
                )}
                {hasDiscount && originalPrice != null && (
                  <>
                    <span className="text-xl text-muted-foreground line-through">
                      {formatCurrency(originalPrice)}
                    </span>
                    <Badge className="bg-secondary text-secondary-foreground">Save {discount}%</Badge>
                  </>
                )}
              </div>

              {product.description && (
                <div className="mb-6">
                  <h3 className="font-semibold mb-3">Description</h3>
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                    {product.description}
                  </p>
                </div>
              )}

              {tags.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag, index) => (
                      <Badge key={tag + index} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="sticky top-20 bg-background p-4 rounded-lg border border-border mb-6">
                {affiliateUrl ? (
                  <a href={affiliateUrl} target="_blank" rel="noopener noreferrer">
                    <Button size="lg" className="w-full">
                      Buy Now <ExternalLink className="ml-2 h-5 w-5" />
                    </Button>
                  </a>
                ) : (
                  <Button size="lg" className="w-full" disabled>
                    Buy Now
                  </Button>
                )}
                {affiliateNote}
              </div>

              <div>
                <h3 className="font-semibold mb-3">Share this product:</h3>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      window.open(
                        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
                        "_blank"
                      )
                    }
                  >
                    <Facebook className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      window.open(
                        `https://twitter.com/intent/tweet?url=${encodeURIComponent(
                          shareUrl
                        )}&text=${encodeURIComponent(shareTitle)}`,
                        "_blank"
                      )
                    }
                  >
                    <Twitter className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      (window.location.href = `mailto:?subject=${encodeURIComponent(
                        shareTitle
                      )}&body=${encodeURIComponent(shareUrl)}`)
                    }
                  >
                    <Mail className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="container mx-auto px-4 py-16 border-t">
            <h2 className="text-3xl font-bold mb-8">Related Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((rp) => (
                <ProductCard key={String(rp.id)} product={rp} />
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
