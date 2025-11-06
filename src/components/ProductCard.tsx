import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import type { Product } from "@/types/product";
import { formatCurrency } from "@/services/api";

interface ProductCardProps {
  product: Product;
}

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
  // Handle both "fourth_image_url" and the misspelled "foutrh_image_url"
  const fourth = (p as any).fourth_image_url ?? (p as any).foutrh_image_url;
  const candidates = [
    p.first_image_url,
    p.second_image_url,
    p.third_image_url,
    fourth,
  ]
    .map(sanitizeUrl)
    .filter(Boolean);

  // Deduplicate while preserving order
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

const ProductCard = ({ product }: ProductCardProps) => {
  const images = useMemo(() => collectImages(product), [product]);
  const [active, setActive] = useState(0);

  const mainSrc = images[active] || "/placeholder.svg";

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

  const platform = (product.platform ?? "").toString();
  const category = (product.category ?? "").toString();
  const name = (product.name ?? "").toString();
  const idStr = String(product.id ?? "");
  const affiliateUrl = sanitizeUrl((product as any).affiliate_url);

  const goPrev = (e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (images.length === 0) return;
    setActive((i) => (i - 1 + images.length) % images.length);
  };

  const goNext = (e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (images.length === 0) return;
    setActive((i) => (i + 1) % images.length);
  };

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300">
      {/* Main image links to details */}
      <Link to={`/product/${idStr}`} aria-label={`View ${name}`}>
        <div className="relative overflow-hidden aspect-square bg-muted">
          <img
            src={mainSrc}
            alt={name || "Product image"}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
            decoding="async"
          />

          {/* Discount badge */}
          {hasDiscount && (
            <div className="absolute top-3 right-3 bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-sm font-semibold">
              {discount}% OFF
            </div>
          )}

          {/* Simple previous/next controls (only if multiple images) */}
          {images.length > 1 && (
            <>
              <button
                onClick={goPrev}
                className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 text-white w-8 h-8 flex items-center justify-center hover:bg-black/60 focus:outline-none"
                aria-label="Previous image"
              >
                ‹
              </button>
              <button
                onClick={goNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 text-white w-8 h-8 flex items-center justify-center hover:bg-black/60 focus:outline-none"
                aria-label="Next image"
              >
                ›
              </button>
            </>
          )}
        </div>
      </Link>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="px-4 pt-3">
          <div className="flex gap-2">
            {images.slice(0, 4).map((thumb, idx) => {
              const isActive = idx === active;
              return (
                <button
                  key={thumb + idx}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setActive(idx);
                  }}
                  onMouseEnter={() => setActive(idx)}
                  className={[
                    "w-14 h-14 rounded-md overflow-hidden border",
                    isActive ? "border-primary ring-2 ring-primary/30" : "border-border",
                  ].join(" ")}
                  aria-label={`Show image ${idx + 1}`}
                >
                  <img
                    src={thumb}
                    alt={`${name} thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </button>
              );
            })}
          </div>
        </div>
      )}

      <CardContent className="p-4">
        {platform && (
          <div className="text-xs text-muted-foreground mb-2">{platform}</div>
        )}

        <Link to={`/product/${idStr}`}>
          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 min-h-[3rem]">
            {name || "Untitled"}
          </h3>
        </Link>

        {category && (
          <div className="text-xs text-muted-foreground mt-2 mb-3">
            {category}
          </div>
        )}

        <div className="flex items-baseline gap-2">
          {buyPrice != null ? (
            <span className="text-2xl font-bold text-primary">
              {formatCurrency(buyPrice)}
            </span>
          ) : (
            <span className="text-2xl font-bold text-primary">—</span>
          )}
          {hasDiscount && originalPrice != null && (
            <span className="text-sm text-muted-foreground line-through">
              {formatCurrency(originalPrice)}
            </span>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex gap-2">
        {/* Buy Now opens affiliate link in new tab if available */}
        {affiliateUrl && (
          <a
            href={affiliateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full"
            aria-label={`Buy ${name}`}
          >
            <Button className="w-full">Buy Now</Button>
          </a>
        )}

        {/* View Details stays as internal route */}
        <Link to={`/product/${idStr}`} className="w-full" aria-label={`View details of ${name}`}>
          <Button variant="secondary" className="w-full">
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
