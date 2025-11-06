import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Target, Heart, Award } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Header */}
        <section className="bg-muted py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">Hey there, it&apos;s Nikhil Panchal</h1>
            <p className="text-lg text-muted-foreground">
              Welcome to Nivaaran! Your trusted guide to the best products and deals online.
            </p>
          </div>
        </section>

        {/* Story */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto space-y-6 text-muted-foreground leading-relaxed">
            <h2 className="text-3xl font-bold mb-4">Our Story</h2>
            <p>
              Nivaaran began as a passion project by a student determined to make online shopping smarter, simpler, and more reliable. With countless products and offers online, it’s easy to feel overwhelmed—but that’s where we step in.
            </p>
            <p>
              Our team of dedicated researchers spends hours testing, reviewing, and comparing products across tech, fitness, photography, and home essentials. We provide honest, transparent insights so you know exactly what you’re getting before making a purchase.
            </p>
            <p>
              Whether you’re hunting for the latest gadgets, fitness gear, or home office essentials, Nivaaran is here to guide you toward the best choices—without the stress.
            </p>
          </div>
        </section>

        {/* Values */}
        <section className="bg-muted py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                    <Target className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Honest Reviews</h3>
                  <p className="text-muted-foreground">
                    We provide unbiased, thoroughly researched opinions based on real testing, not marketing hype.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                    <Heart className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">User First</h3>
                  <p className="text-muted-foreground">
                    Your satisfaction is our priority. We only recommend products we genuinely believe will add value.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                    <Award className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Expert Insights</h3>
                  <p className="text-muted-foreground">
                    Years of expertise across product categories guide our recommendations and advice.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Affiliate Disclosure */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto space-y-4 text-muted-foreground leading-relaxed">
            <h2 className="text-3xl font-bold mb-4">Affiliate Disclosure</h2>
            <p>
              Nivaaran participates in affiliate programs. This means we may earn a small commission when you purchase products through our links—at no extra cost to you. These relationships never influence our honest reviews.
            </p>
            <p>
              We only promote products that we truly believe add value to your shopping experience. Supporting Nivaaran through our affiliate links helps us continue providing high-quality, student-driven insights.
            </p>
            <p>Thank you for supporting Nivaaran and helping us make online shopping smarter and easier!</p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
