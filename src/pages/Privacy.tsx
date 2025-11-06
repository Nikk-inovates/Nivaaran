import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Privacy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Header */}
        <section className="bg-muted py-12 border-b">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-3">Privacy Policy</h1>
            <p className="text-muted-foreground text-sm">
              Last Updated: <span className="font-medium">November 2025</span>
            </p>
          </div>
        </section>

        {/* Body */}
        <section className="container mx-auto px-4 py-16 max-w-4xl">
          <div className="prose prose-lg max-w-none space-y-10 text-foreground">
            {/* 1. Introduction */}
            <div>
              <h2 className="text-2xl font-bold">1. Introduction</h2>
              <p>
                Welcome to <strong>Nivaaran</strong> (“we,” “our,” or “us”).
                Your privacy matters to us. This Privacy Policy explains how we
                collect, use, disclose, and safeguard your personal information
                when you visit or interact with our website (
                <a
                  href="https://nivaaran.store"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline"
                >
                  nivaaran.store
                </a>
                ) or any related services. By using our website, you agree to
                the practices described in this Privacy Policy.
              </p>
            </div>

            {/* 2. Information We Collect */}
            <div>
              <h2 className="text-2xl font-bold">2. Information We Collect</h2>
              <p>We may collect information about you in the following ways:</p>

              <h3 className="text-xl font-semibold mt-6">A. Personal Data</h3>
              <p>
                Information you voluntarily provide to us, including your name,
                email address, or contact details when you subscribe to our
                newsletter or contact us.
              </p>

              <h3 className="text-xl font-semibold mt-6">B. Usage Data</h3>
              <p>
                Information automatically collected when you use our website,
                such as your IP address, browser type, device information,
                referring URLs, pages visited, and time spent on pages.
              </p>

              <h3 className="text-xl font-semibold mt-6">
                C. Cookies and Tracking Technologies
              </h3>
              <p>
                We use cookies, analytics tags, and similar technologies to
                enhance your browsing experience, analyze traffic, and
                personalize content.
              </p>

              <h3 className="text-xl font-semibold mt-6">D. Communication Data</h3>
              <p>
                Information you provide when communicating with us via email,
                forms, or feedback systems.
              </p>
            </div>

            {/* 3. How We Use Your Information */}
            <div>
              <h2 className="text-2xl font-bold">3. How We Use Your Information</h2>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>To operate, maintain, and improve our website’s functionality.</li>
                <li>To personalize user experience and deliver relevant content.</li>
                <li>To send newsletters, updates, and promotional materials (only if you’ve opted in).</li>
                <li>To respond to inquiries and provide customer support.</li>
                <li>To analyze trends and monitor site performance.</li>
                <li>To detect, prevent, or address technical issues and potential fraud.</li>
              </ul>
            </div>

            {/* 4. Affiliate Disclosure */}
            <div>
              <h2 className="text-2xl font-bold">4. Affiliate Disclosure</h2>
              <p>
                <strong>Nivaaran</strong> participates in various affiliate
                marketing programs. This means that when you click on affiliate
                links and make a purchase, we may earn a small commission —{" "}
                <strong>at no additional cost to you</strong>. These affiliate
                relationships allow us to maintain our website, create valuable
                content, and continue offering recommendations and insights for
                free. We only promote products or services that align with our
                values and that we believe will genuinely benefit our visitors.
              </p>
            </div>

            {/* 5. Cookies and Tracking */}
            <div>
              <h2 className="text-2xl font-bold">5. Cookies and Tracking</h2>
              <p>
                Cookies are small files stored on your device that help us
                remember your preferences and improve usability. They also allow
                us to understand user behavior for analytics and marketing. You
                can choose to disable cookies in your browser settings, but some
                parts of the website may not function properly if you do so.
              </p>
            </div>

            {/* 6. Third-Party Links */}
            <div>
              <h2 className="text-2xl font-bold">6. Third-Party Links and Services</h2>
              <p>
                Our website may contain links to third-party websites, affiliate
                partners, or advertisers. We are not responsible for the privacy
                practices, security, or content of these third parties. We
                recommend reviewing their individual privacy policies before
                interacting with their services.
              </p>
            </div>

            {/* 7. Your Rights */}
            <div>
              <h2 className="text-2xl font-bold">7. Your Rights</h2>
              <p>Depending on your location, you may have the right to:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Access the personal data we hold about you.</li>
                <li>Correct inaccurate or incomplete data.</li>
                <li>Request deletion of your personal data.</li>
                <li>Withdraw consent for marketing communications.</li>
                <li>Object to processing based on legitimate interests.</li>
              </ul>
              <p className="mt-2">
                To exercise any of these rights, contact us via the email provided below.
              </p>
            </div>

            {/* 8. Data Security */}
            <div>
              <h2 className="text-2xl font-bold">8. Data Security</h2>
              <p>
                We implement reasonable administrative and technical safeguards
                to protect your data against unauthorized access, alteration,
                disclosure, or destruction. However, no online transmission or
                storage method can be guaranteed to be 100% secure.
              </p>
            </div>

            {/* 9. Children's Privacy */}
            <div>
              <h2 className="text-2xl font-bold">9. Children’s Privacy</h2>
              <p>
                Our website is not intended for children under the age of 13. We
                do not knowingly collect personal information from children
                under 13. If you believe we have collected information about a
                child under 13, please contact us, and we will take steps to
                delete such data.
              </p>
            </div>

            {/* 10. Policy Updates */}
            <div>
              <h2 className="text-2xl font-bold">10. Changes to this Privacy Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. If we make
                significant changes, we will notify you by posting the updated
                date at the top of this page. Please review this policy
                periodically to stay informed about how we handle your
                information.
              </p>
            </div>

            {/* 11. Contact */}
            <div>
              <h2 className="text-2xl font-bold">11. Contact Us</h2>
              <p>
                If you have any questions or concerns about this Privacy Policy,
                please contact us at:
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

export default Privacy;
