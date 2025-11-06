import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Terms = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Header */}
        <section className="bg-muted py-12 border-b">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-3">Terms & Conditions</h1>
            <p className="text-muted-foreground text-sm">
              Last Updated: <span className="font-medium">November 2025</span>
            </p>
          </div>
        </section>

        {/* Body */}
        <section className="container mx-auto px-4 py-16 max-w-4xl">
          <div className="prose prose-lg max-w-none space-y-10 text-foreground">
            {/* Agreement to Terms */}
            <div>
              <h2 className="text-2xl font-bold">1. Agreement to Terms</h2>
              <p>
                By accessing or using <strong>Nivaaran</strong> (“we,” “our,” or “us”)
                and its website (
                <a
                  href="https://nivaaran.store"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline"
                >
                  nivaaran.store
                </a>
                ), you agree to be bound by these Terms and Conditions. If you
                disagree with any part of these terms, please discontinue use of
                our website immediately.
              </p>
            </div>

            {/* Affiliate Disclaimer */}
            <div>
              <h2 className="text-2xl font-bold">2. Affiliate Disclaimer</h2>
              <p>
                <strong>Nivaaran</strong> participates in various affiliate marketing
                programs. This means we may earn commissions from qualifying
                purchases made through links on our site —{" "}
                <strong>at no additional cost to you</strong>. These affiliate
                partnerships help us maintain our website and continue creating
                valuable, unbiased product recommendations and informational
                content.
              </p>
              <p>
                All affiliate products are selected independently, and we only
                promote products we genuinely believe add value to our visitors.
              </p>
            </div>

            {/* Product Information */}
            <div>
              <h2 className="text-2xl font-bold">3. Product Information</h2>
              <p>
                We strive to ensure that product details, prices, and reviews
                displayed on <strong>Nivaaran</strong> are accurate and current.
                However, we do not warrant that all information, descriptions,
                images, or pricing are complete, reliable, or error-free.
              </p>
              <p>
                Product availability, pricing, and promotions are subject to
                change without notice. Users are encouraged to verify all
                details on the respective merchant’s website before making a
                purchase.
              </p>
            </div>

            {/* User Content */}
            <div>
              <h2 className="text-2xl font-bold">4. User Content</h2>
              <p>
                Our website may allow users to post comments, reviews, or other
                content. By submitting any content, you grant{" "}
                <strong>Nivaaran</strong> a worldwide, non-exclusive, royalty-free,
                and transferable license to use, reproduce, distribute, and
                display such content for site operations and promotions.
              </p>
              <p className="font-semibold mt-4">You agree not to post content that:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Is illegal, defamatory, harmful, or offensive.</li>
                <li>Infringes upon intellectual property rights or trademarks.</li>
                <li>Contains malware, spam, or deceptive links.</li>
                <li>Violates any applicable local, state, or international laws.</li>
              </ul>
            </div>

            {/* Intellectual Property */}
            <div>
              <h2 className="text-2xl font-bold">5. Intellectual Property</h2>
              <p>
                All content, logos, graphics, design elements, code, and
                trademarks on <strong>Nivaaran.store</strong> are owned by or
                licensed to <strong>Nivaaran</strong> and protected by copyright
                and intellectual property laws. You may not copy, modify,
                distribute, or create derivative works without our express
                written consent.
              </p>
            </div>

            {/* Disclaimer of Warranties */}
            <div>
              <h2 className="text-2xl font-bold">6. Disclaimer of Warranties</h2>
              <p>
                This website and all content are provided on an{" "}
                <strong>“as-is” and “as-available”</strong> basis, without any
                warranties of any kind, express or implied. We do not guarantee
                that our website will be uninterrupted, error-free, or free from
                viruses or other harmful components.
              </p>
            </div>

            {/* Limitation of Liability */}
            <div>
              <h2 className="text-2xl font-bold">7. Limitation of Liability</h2>
              <p>
                To the fullest extent permitted by law, <strong>Nivaaran</strong> and
                its affiliates, directors, employees, or partners shall not be
                liable for any indirect, incidental, special, consequential, or
                punitive damages arising out of or in connection with your use
                of — or inability to use — this website.
              </p>
              <p>
                Your sole remedy for dissatisfaction with the website or its
                content is to stop using it.
              </p>
            </div>

            {/* External Links */}
            <div>
              <h2 className="text-2xl font-bold">8. External Links</h2>
              <p>
                Our website may contain links to third-party websites, merchants,
                or services. These links are provided solely for convenience.{" "}
                <strong>Nivaaran</strong> has no control over, and assumes no
                responsibility for, the content, accuracy, or policies of such
                external sites. Visiting any third-party website is at your own
                risk.
              </p>
            </div>

            {/* Changes to Terms */}
            <div>
              <h2 className="text-2xl font-bold">9. Changes to Terms</h2>
              <p>
                We reserve the right to update or modify these Terms and
                Conditions at any time. Any changes will be reflected by the
                “Last Updated” date at the top of this page. Your continued use
                of the website after changes are posted constitutes your
                acceptance of the revised Terms.
              </p>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-bold">10. Contact Information</h2>
              <p>
                If you have any questions, concerns, or feedback regarding these
                Terms & Conditions, please contact us at:
              </p>
              <p>
                <strong>Email:</strong>{" "}
                <a
                  href="mailto:contact@nivaaran.store"
                  className="text-primary underline"
                >
                  contact@nivaaran.store
                </a>
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Terms;
