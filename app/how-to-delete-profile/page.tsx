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
        "Log into your account and go to your profile settings. Look for the 'App' section in your user dashboard and click it. You will see 'Delete Account' option. Click on it to proceed with the deletion process.",
      imageUrl: "one.jpeg",
    },
    {
      id: 2,
      title: "Delete your Account",
      description:
        "Read the instructions carefully. Click on the 'Delete Account' button.",
      imageUrl: "two.jpeg",
    },
    {
      id: 3,
      title: "What should we delete?",
      description:
        "You'll be prompted to select what data you want to delete. You can choose to delete all your data or select specific items. Make your selection and click 'Delete' to finalize the process.",
      imageUrl: "three.jpeg",
    },
    {
      id: 4,
      title: "Why are you leaving?",
      description:
        "This is optional.You'll be prompted to provide a reason for deleting your account. The feedback helps us improve our services. Select an option from the list or write your own reason, then click 'Continue' to proceed.",
      imageUrl: "four.jpeg",
    },
     {
      id: 5,
      title: "Confirm Account Deletion",
      description:
        "You'll be asked to confirm your decision. Read all warnings carefully, then click 'Schedule account deletion' to permanently remove your account after 30 days",
      imageUrl: "five.jpeg",
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
