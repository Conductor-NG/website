"use client";
import React, { useState } from "react";
import Header from "@/components/ui/header.component";
import ProgressBar from "@/components/ui/progressBar.component";
import StepCard from "@/components/ui/stepCard.component";
import WarningCard from "@/components/ui/warningCard.component";
import { Button } from "@/components/ui/button.component";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import Footer from "@/components/footer/footer";

const Index = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    {
      id: 1,
      title: "Navigate to Account Settings",
      description:
        "Log into your account and go to your profile settings. Look for the 'Account' or 'Privacy' section in your user dashboard.",
      imageUrl: "one.png",
    },
    {
      id: 2,
      title: "Find Delete Account Option",
      description:
        "Scroll down to the bottom of your account settings page. Look for 'Delete Account.",
      imageUrl: "two.png",
    },
    {
      id: 3,
      title: "Confirm Account Deletion",
      description:
        "You'll be asked to confirm your decision. Read all warnings carefully, then click 'Yes' to permanently remove your profile and all associated data.",
      imageUrl: "three.png",
    },
  ];

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (stepNumber: number) => {
    setCurrentStep(stepNumber);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <Header />

        <WarningCard />

        <ProgressBar currentStep={currentStep} totalSteps={steps.length} />

        <div className="">
          <div className="mb-8">
            <StepCard
              stepNumber={currentStep}
              title={steps[currentStep - 1].title}
              description={steps[currentStep - 1].description}
              imageUrl={steps[currentStep - 1].imageUrl}
            />
          </div>

          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="flex items-center space-x-2"
            >
              <ArrowLeft size={16} />
              <span>Previous</span>
            </Button>

            <div className="flex space-x-2">
              {steps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToStep(index + 1)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    currentStep === index + 1
                      ? "bg-primary"
                      : currentStep > index + 1
                      ? "bg-primary/60"
                      : "bg-muted"
                  }`}
                />
              ))}
            </div>

            <Button
              onClick={nextStep}
              disabled={currentStep === steps.length}
              className="flex items-center space-x-2"
            >
              <span>Next</span>
              <ArrowRight size={16} />
            </Button>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 p-8 bg-muted/30 rounded-lg">
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            Need Help?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            If you&apos;re having trouble deleting your account or have
            questions about data retention, our support team is here to help.
          </p>
          <Link href="mailto:support@conductor.ng">
            <Button variant="outline" size="lg">
              Contact Support
            </Button>
          </Link>
        </div>
      </div>
      <section className="bg-[#0a0704]">
        <div className="md:px-0 px-[24px]">
          <Footer />
        </div>
      </section>
    </div>
  );
};

export default Index;
