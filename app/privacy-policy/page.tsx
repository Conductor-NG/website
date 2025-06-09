import Link from "next/link";
import {
  ArrowLeft,
  Shield,
  Eye,
  Lock,
  UserCheck,
  FileText,
  Mail,
  CircleHelp,
  Presentation,
  TvMinimal,
  Clock,
  EyeOff,
  UserPen,
  Eraser,
} from "lucide-react";
import Footer from "../components/footer/footer.component";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="bg-[var(--secondary-color)] pt-32 text-white rounded-md">
          <div className="container mx-auto px-4 py-6">
            <Link
              href="/"
              className="inline-flex items-center text-sm hover:underline mb-4"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
            <div className="flex items-center mb-2">
              <Shield className="mr-3 h-8 w-8" />
              <h1 className="text-3xl md:text-4xl font-bold">Privacy Policy</h1>
            </div>
            <p className="text-primary-foreground/80 text-lg">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <div className="prose prose-lg max-w-none">
            {/* Introduction */}
            <section className="mb-12">
              <div className="flex items-center mb-4">
                <FileText className="mr-3 h-6 w-6 text-primary" />
                <h2 className="text-2xl font-semibold text-foreground">
                  Introduction
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Conductor.ng (&quot;we&quot;, &quot;us&quot;, or
                &quot;our&quot;) is committed to protecting your privacy. This
                Privacy Policy explains how we collect, use, disclose, and
                protect your personal information when you visit and interact
                with our website.
              </p>
            </section>

            {/* Information We Collect */}
            <section className="mb-12">
              <div className="flex items-center mb-4">
                <Eye className="mr-3 h-6 w-6 text-primary" />
                <h2 className="text-2xl font-semibold text-foreground">
                  Information We Collect
                </h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <div>
                  <h3 className="text-lg font-medium text-foreground mb-2">
                    Personal Information
                  </h3>
                  <p>We may collect the following types of information:</p>
                  <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                    <li>
                      Full name, email address, phone number, and physical
                      address
                    </li>
                    <li>
                      Billing and payment information (excluding full credit
                      card numbers, which are handled by secure payment
                      gateways)
                    </li>
                    <li>Order history and product preferences</li>
                    <li>IP address, browser type, and device information</li>
                    <li>
                      Interaction data (e.g. clicks, pages visited, and time
                      spent on pages)
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* How Information Is Collected*/}
            <section className="mb-12">
              <div className="flex items-center mb-4">
                <CircleHelp className="mr-3 h-6 w-6 text-primary" />
                <h2 className="text-2xl font-semibold text-foreground">
                  How Do We Collect Information From You?
                </h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <div>
                  <h3 className="text-lg font-medium text-foreground mb-2">
                    Personal Information
                  </h3>
                  <p>Information is collected through:</p>
                  <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                    <li>Website forms (checkout, sign-up, contact forms)</li>
                    <li>Account registration and order placement</li>
                    <li>Cookies and tracking tools (for analytics and ads)</li>
                    <li>Direct communications (e.g., email, phone)</li>
                    <li>
                      Third-party services (e.g., Google Analytics, Facebook
                      Pixel)
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* How We Use Information */}
            <section className="mb-12">
              <div className="flex items-center mb-4">
                <UserCheck className="mr-3 h-6 w-6 text-primary" />
                <h2 className="text-2xl font-semibold text-foreground">
                  How We Use Your Information
                </h2>
              </div>
              <div className="text-muted-foreground">
                <p className="mb-4">We use your personal information to:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Process orders and deliver products</li>
                  <li>Provide customer support</li>
                  <li>Improve our website, products, and services</li>
                  <li>Manage your account</li>
                  <li>Detect fraud and ensure compliance with laws</li>
                </ul>
              </div>
            </section>

            {/* Marketing */}
            <section className="mb-12">
              <div className="flex items-center mb-4">
                <Presentation className="mr-3 h-6 w-6 text-primary" />
                <h2 className="text-2xl font-semibold text-foreground">
                  Marketing Material
                </h2>
              </div>
              <div className="text-muted-foreground">
                <p className="mb-4">
                  We may send promotional emails and newsletters with your
                  consent. You can unsubscribe at any time using the
                  “unsubscribe” link in our emails or by contacting us directly.
                </p>
              </div>
            </section>

            {/* Digital Marketing */}
            <section className="mb-12">
              <div className="flex items-center mb-4">
                <TvMinimal className="mr-3 h-6 w-6 text-primary" />
                <h2 className="text-2xl font-semibold text-foreground">
                  Digital Marketing and Online Advertising
                </h2>
              </div>
              <div className="text-muted-foreground">
                <p className="mb-4">
                  We use tools like Google Ads, Meta (Facebook/Instagram) Ads,
                  and other third-party platforms to show relevant ads to users.
                  These platforms may use cookies or tracking pixels to tailor
                  ads based on your behavior on our site. You can adjust ad
                  preferences via your browser or device settings.
                </p>
              </div>
            </section>

            {/* Information Sharing */}
            <section className="mb-12">
              <div className="flex items-center mb-4">
                <Lock className="mr-3 h-6 w-6 text-primary" />
                <h2 className="text-2xl font-semibold text-foreground">
                  Information Sharing and Disclosure
                </h2>
              </div>
              <div className="text-muted-foreground space-y-4">
                <p>
                  We do not sell, trade, or rent your personal information to
                  third parties. We may share your information only in the
                  following circumstances:
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li>
                    <strong>Service Providers:</strong> With trusted third-party
                    service providers who help us deliver our services (e.g.,
                    payment processors, couriers, marketing platforms)
                  </li>
                  <li>
                    <strong>Overseas Service Providers:</strong> With trusted
                    third-party service providers, including those based outside
                    Nigeria, where necessary for service delivery. We ensure all
                    third-party providers comply with data protection standards.
                  </li>
                </ul>
              </div>
            </section>

            {/* Duration of Data Storage */}
            <section className="mb-12">
              <div className="flex items-center mb-4">
                <Clock className="mr-3 h-6 w-6 text-primary" />
                <h2 className="text-2xl font-semibold text-foreground">
                  How Long We Keep Your Information
                </h2>
              </div>
              <div className="text-muted-foreground space-y-4">
                <p>
                  We retain your information for as long as needed to fulfill
                  the purposes outlined in this policy, including legal and
                  accounting obligations, or until you request its erasure.
                </p>
              </div>
            </section>

            {/* Data Security */}
            <section className="mb-12">
              <div className="flex items-center mb-4">
                <Shield className="mr-3 h-6 w-6 text-primary" />
                <h2 className="text-2xl font-semibold text-foreground">
                  How We Store and Secure Your Information
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Your data is stored on secure servers and protected using
                industry-standard security measures including:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>HTTPS encryption</li>
                <li>Secure WordPress plugins</li>
                <li>Limited administrative access</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed">
                Despite these efforts, no system can guarantee 100% security. We
                advise users to keep passwords secure.
              </p>
            </section>

            {/* Sensitive Personal Information */}
            <section className="mb-12">
              <div className="flex items-center mb-4">
                <EyeOff className="mr-3 h-6 w-6 text-primary" />
                <h2 className="text-2xl font-semibold text-foreground">
                  Sensitive Personal Information
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                We do not intentionally collect sensitive personal information
                such as biometric data or health records. If you voluntarily
                provide such information, you consent to our processing of it in
                accordance with this policy.
              </p>
            </section>

            {/* Accessing and Correcting Your Information */}
            <section className="mb-12">
              <div className="flex items-center mb-4">
                <UserPen className="mr-3 h-6 w-6 text-primary" />
                <h2 className="text-2xl font-semibold text-foreground">
                  Accessing and Correcting Your Information
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                You may request to access or update the personal information we
                hold about you by contacting us at the email below.
              </p>
            </section>

            {/* Erasing Your Information */}
            <section className="mb-12">
              <div className="flex items-center mb-4">
                <Eraser className="mr-3 h-6 w-6 text-primary" />
                <h2 className="text-2xl font-semibold text-foreground">
                  Erasing Your Information
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                You can request that we delete your data at any time, subject to
                legal or contractual obligations requiring retention.
              </p>
            </section>

            {/* Changes to Policy */}
            <section className="mb-12">
              <div className="flex items-center mb-4">
                <FileText className="mr-3 h-6 w-6 text-primary" />
                <h2 className="text-2xl font-semibold text-foreground">
                  Changes to This Privacy Policy
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                We may update this Privacy Policy from time to time. When we do,
                we will post the updated version on this page with a revised
                “Effective Date.” Continued use of the website constitutes
                acceptance of the updated policy.
              </p>
            </section>

            {/* Contact Information */}
            <section className="mb-12">
              <div className="flex items-center mb-4">
                <Mail className="mr-3 h-6 w-6 text-primary" />
                <h2 className="text-2xl font-semibold text-foreground">
                  Contacting Us and Complaints
                </h2>
              </div>
              <div className="text-muted-foreground space-y-4">
                <p>
                  If you have any questions or concerns about this Privacy
                  Policy or how your data is handled, please contact:
                </p>
                <div className="bg-muted p-6 rounded-lg">
                  <Link
                    href="mailto:support@conductor.ng"
                    className="hover:scale-110 hover:opacity-85 hover:underline"
                  >
                    <strong>Email:</strong> support@conductor.ng
                  </Link>
                  <p>
                    <strong>Address:</strong> No 7 Ahmadu Bello Close Peace
                    Court Est Lokogoma Abuja
                  </p>
                  <p>
                    <strong>Phone:</strong> +234&nbsp;818&nbsp;887&nbsp;6601
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
      <hr />
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
