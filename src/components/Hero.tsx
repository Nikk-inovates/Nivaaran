import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, RefreshCw, HandCoins } from "lucide-react";

const Hero = () => {
  return (
    <section
      aria-label="Hero"
      className="
        relative overflow-hidden
        md:min-h-[100svh] md:grid md:place-items-center
      "
    >
      {/* Background — soft neutral gradient + restrained spotlights + micro-grain */}
      <div className="absolute inset-0">
        {/* Base gradient (light, minimal) */}
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(var(--background))] via-[hsl(var(--muted))] to-[hsl(var(--muted))]" />

        {/* Spotlight accents — smaller to avoid page scroll; clipped by overflow-hidden */}
        <div
          className="pointer-events-none absolute -top-24 -left-20 h-[36rem] w-[36rem] rounded-full opacity-70 blur-[100px]"
          style={{
            background:
              "radial-gradient(36rem 36rem at 50% 50%, hsl(var(--primary) / 0.12), transparent 70%)",
          }}
        />
        <div
          className="pointer-events-none absolute -top-10 -right-24 h-[28rem] w-[28rem] rounded-full opacity-60 blur-[100px]"
          style={{
            background:
              "radial-gradient(28rem 28rem at 50% 50%, hsl(var(--accent) / 0.10), transparent 75%)",
          }}
        />

        {/* Subtle texture */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.04] mix-blend-multiply"
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 30%, rgba(0,0,0,0.10) 0.5px, transparent 0.5px), radial-gradient(circle at 70% 70%, rgba(0,0,0,0.10) 0.5px, transparent 0.5px)",
            backgroundSize: "24px 24px, 26px 26px",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full">
        <div className="container mx-auto max-w-screen-xl px-6 py-10 md:py-0">
          <div
            className="
              mx-auto max-w-3xl rounded-3xl border border-border/60 bg-background/80
              backdrop-blur-xl supports-[backdrop-filter]:bg-background/70
              shadow-[0_8px_32px_-10px_rgba(0,0,0,0.18)]
              p-6 sm:p-8 text-center
              animate-fade-in-up
              transition-shadow
              hover:shadow-[0_16px_48px_-14px_rgba(0,0,0,0.22)]
            "
          >
            {/* Headline */}
            <h1
              className="
                font-semibold tracking-tight text-foreground/90
                text-4xl sm:text-5xl md:text-[44px]
                leading-tight motion-safe:transition-all motion-safe:duration-700
              "
              style={{ textWrap: "balance" as any }}
            >
              Smart Picks. Zero Noise.
            </h1>

            {/* Subhead — concise, professional */}
            <p
              className="
                mt-4 text-base md:text-lg text-muted-foreground/90
                leading-relaxed max-w-[60ch] mx-auto
              "
              style={{ textWrap: "balance" as any }}
            >
              We cut through the hype to surface gear that performs.
              Reviews you can trust. Deals worth taking. Curation that respects your time.
            </p>

            {/* CTAs — compact, accessible, no excess spacing */}
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link to="/products" aria-label="Browse products">
                <Button
                  size="lg"
                  className="
                    group h-11 px-6 text-[15px]
                    bg-[hsl(var(--primary))] text-primary-foreground
                    hover:bg-[hsl(var(--primary)/0.92)]
                    focus-visible:ring-2 focus-visible:ring-[hsl(var(--primary))] focus-visible:ring-offset-2
                    focus-visible:ring-offset-background
                    transition-all duration-200 active:scale-[0.98]
                    shadow-[0_4px_18px_rgba(0,0,0,0.10)]
                  "
                >
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5 translate-x-0 transition-transform duration-200 group-hover:translate-x-1" />
                </Button>
              </Link>

              <Link to="/blog" aria-label="Read our insights and reviews">
                <Button
                  variant="outline"
                  size="lg"
                  className="
                    h-11 px-6 text-[15px]
                    border-border/70
                    bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/60
                    hover:bg-background/90 hover:text-foreground
                    focus-visible:ring-2 focus-visible:ring-[hsl(var(--primary))] focus-visible:ring-offset-2
                    focus-visible:ring-offset-background
                    transition-all duration-200 active:scale-[0.98]
                  "
                >
                  Learn More
                </Button>
              </Link>
            </div>

            {/* Trust row — tight, single-line on desktop */}
            <ul className="mt-6 flex flex-col items-center justify-center gap-2 text-sm text-muted-foreground/90 sm:flex-row">
              <li className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 opacity-80" aria-hidden="true" />
                Expertly vetted
              </li>
              <li className="hidden h-4 w-px bg-foreground/15 sm:block" aria-hidden="true" />
              <li className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4 opacity-80" aria-hidden="true" />
                Updated weekly
              </li>
              <li className="hidden h-4 w-px bg-foreground/15 sm:block" aria-hidden="true" />
              <li className="flex items-center gap-2">
                <HandCoins className="h-4 w-4 opacity-80" aria-hidden="true" />
                Affiliate-transparent
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Smooth entrance animation keyframes (CSS-only) */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 900ms cubic-bezier(.2,.8,.2,1) both;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-fade-in-up { animation: none; }
        }
      `}</style>
    </section>
  );
};

export default Hero;
