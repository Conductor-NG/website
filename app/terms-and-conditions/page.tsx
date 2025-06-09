import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card.component";
import { Separator } from "@/app/components/ui/separator.component";
import { ArrowLeft, Shield } from "lucide-react";
import Link from "next/link";
import Footer from "../components/footer/footer.component";

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="bg-[var(--secondary-color)] pt-32 text-white rounded-md  mb-3">
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
              <h1 className="text-3xl md:text-4xl font-bold">
                Terms and Conditions
              </h1>
            </div>
            <p className="text-primary-foreground/80 text-lg">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">1. ACCEPTANCE OF TERMS</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-foreground leading-relaxed">
              By registering, using and clicking on accept on this Application,
              you (User) agree to be bound by these Terms and Conditions.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">2. SERVICE DESCRIPTION</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-foreground leading-relaxed">
              Conductor.ng connects individuals in need of transportation with
              available car owners. The Company acts as a platform facilitating
              these connections but does not own or operate the vehicles.
            </p>
          </CardContent>
        </Card>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">
                3. PAYMENT AND REPAYMENT POLICY
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="list-disc list-inside space-y-2 text-foreground ml-4">
                <li>
                  Payments for rides are due immediately upon booking
                  confirmation.
                </li>
                <li>
                  Users may request refunds only by giving a minimum of three
                  (3) days&apos; written notice before the scheduled ride.
                </li>
                <li>
                  Refunds, if any, are processed on a weekly basis and at the
                  sole discretion of the Company.
                </li>
                <li>
                  No refunds will be issued in cases of user default as defined
                  below.
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">
                4. USER DEFAULTS LEADING TO NO REFUND
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-foreground leading-relaxed">
                Refunds will not be granted under the following circumstances:
              </p>
              <ul className="list-disc list-inside space-y-2 text-foreground ml-4">
                <li>
                  No-show or late arrival by the User for the scheduled ride.
                </li>
                <li>Cancellation without the required 3-day notice.</li>
                <li>
                  Violation of any terms herein, including but not limited to
                  unsafe behaviour, harassment, or illegal activities.
                </li>
                <li>
                  Failure to comply with Lagos traffic laws or any applicable
                  regulations.
                </li>
                <li>
                  Any behaviour leading to suspension or termination of the
                  User&apos;s account.
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">
                5. VEHICLE FAULTS AND MECHANICAL ISSUES
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="list-disc list-inside space-y-2 text-foreground ml-4">
                <li>
                  The Company is not liable for any mechanical faults or
                  breakdowns of vehicles.
                </li>
                <li>
                  Drivers are responsible for ensuring their vehicles are
                  roadworthy and comply with Lagos state vehicle regulations.
                </li>
                <li>
                  In case of vehicle failure during a ride, the Company will
                  assist in arranging alternative transport, but is not liable
                  for any inconvenience or costs incurred.
                </li>
                <li>
                  Users acknowledge that vehicle conditions may vary and accept
                  rides at their own risk.
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">6. CONDUCT AND DISPUTES</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="list-disc list-inside space-y-2 text-foreground ml-4">
                <li>
                  Users and Drivers must conduct themselves respectfully and
                  lawfully.
                </li>
                <li>
                  Any physical altercation, verbal abuse, or misconduct between
                  Users and Drivers or among Users will lead to immediate
                  suspension or termination of accounts without refund.
                </li>
                <li>
                  The Company reserves the right to report any criminal
                  behaviour to Lagos law enforcement authorities.
                </li>
                <li>
                  The Company disclaims liability for any disputes arising
                  between Users and Drivers.
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">
                7. LIMITATION OF LIABILITY
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="list-disc list-inside space-y-2 text-foreground ml-4">
                <li>
                  The Company is a facilitator and does not assume
                  responsibility for the safety, conduct, or actions of Users or
                  Drivers.
                </li>
                <li>
                  The Company is not liable for any damages, losses, or injuries
                  arising from the use of the service.
                </li>
                <li>
                  Users agree to indemnify and hold the Company harmless from
                  any claims related to their use of the service.
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">
                8. GOVERNING LAW AND JURISDICTION
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-foreground leading-relaxed">
                These Terms are governed by the laws of Lagos State, Nigeria.
                Any disputes will be subject to first, arbitration house in
                Lagos State.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">9. CHANGES TO TERMS</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-foreground leading-relaxed">
                The Company reserves the right to modify these Terms at any
                time. Users will be notified of significant changes via the app
                or email, and continued use constitutes acceptance of the
                updated Terms.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">10. Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-foreground leading-relaxed">
                If you have any questions about these Terms and Conditions,
                please contact us at:
              </p>
              <div className="bg-muted p-4 rounded-lg">
                <Link
                  href="mailto:admin@conductor.ng"
                  className="hover:scale-110 hover:opacity-85 hover:underline"
                >
                  <strong>Email:</strong> admin@conductor.ng
                </Link>
                <p>
                  <strong>Phone:</strong> +234&nbsp;818&nbsp;887&nbsp;6601
                </p>
                <p>
                  <strong>Address:</strong> No 7 Ahmadu Bello Close Peace Court
                  Est Lokogoma Abuja
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Separator className="my-8" />
      </div>
      <hr />
      <Footer />
    </div>
  );
};

export default TermsAndConditions;
