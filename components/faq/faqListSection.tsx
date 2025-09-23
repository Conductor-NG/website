import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
const faqData: {
  id: string;
  question: string;
  answer: string;
}[] = [
  {
    id: "item-1",
    question: "Is Conductor.ng an on-demand ride service like Bolt or Uber?",
    answer:
      "Not exactly. We are pre-booked, not instant. You schedule your trip ahead of time, even just one day before, and we'll find you a driver going your way.",
  },
  {
    id: "item-2",
    question: "Do I have to pay before I get a Ride?",
    answer:
      "No. You only pay after a car owner accepts your trip request. You’ll get a confirmation and then choose how to pay: card, transfer, or wallet. No cash needed",
  },
  {
    id: "item-3",
    question: "When do Car owners get paid?",
    answer:
      "Car owners get paid after completing successful trips. Earnings are held securely and released after a minimum of 3 days. This helps us process refunds properly if a trip is missed.",
  },
  {
    id: "item-4",
    question: "What if the driver doesn't show up?",
    answer:
      "If a confirmed driver doesn’t show up, your money is refunded automatically. No long stories.",
  },
  {
    id: "item-5",
    question: "Where do I get picked up from?",
    answer:
      "We use popular public pickup points like bus stops, junctions, or known landmarks. This helps Car owners find you easily and keeps everyone safe. No home pickups for now.",
  },
  {
    id: "item-6",
    question: "Can I book more than one trip at once?",
    answer:
      "Yes. You can schedule multiple trips in advance. Perfect if you already know your weekly movement plans.",
  },
  {
    id: "item-7",
    question: "Is Conductor cheaper than danfo or keke?",
    answer:
      "Not quite. We're not a budget option like danfo or keke. But we’re more affordable than other ride-hailing apps and comfortable too.",
  },
  {
    id: "item-8",
    question: "Do Car owners set their own prices?",
    answer:
      "No. Fares are set by Conductor.ng so it’s fair and consistent for everyone. Car owners know what they’ll earn, and you know what you’ll pay.",
  },
  {
    id: "item-9",
    question: "Can I communicate with my driver?",
    answer:
      "Yes. There’s a built-in chat feature on the app so you and your driver can discuss or ask quick questions.",
  },
  {
    id: "item-10",
    question: "Can Car Owners do multiple trips?",
    answer:
      "Yes, but not at the same time. A Car owner can offer several trips in a day, but each trip must be completed before starting another.",
  },
  {
    id: "item-11",
    question: "What are the payment options?",
    answer:
      "You can pay using card, bank transfer, or your Conductor wallet. We don’t accept cash payments to keep things secure and traceable",
  },
  {
    id: "item-12",
    question: "Who is Conductor.ng for?",
    answer:
      "We're for everyday Nigerians who want a safer, more affordable option than private ride-hailing. Whether you’re a Car owner with extra seats or a passenger heading across town, Conductor connects you.",
  },
];
const FAQListSection = () => {
  return (
    <div className="flex flex-col w-full items-start gap-5 relative">
      <Accordion
        type="single"
        collapsible
        defaultValue="item-1"
        className="w-full space-y-5"
      >
        {faqData.map((faq) => (
          <AccordionItem key={faq.id} value={faq.id} className="border-none">
            <AccordionTrigger className="flex items-center justify-between p-4 bg-[#00000005] rounded-lg hover:no-underline data-[state=open]:bg-[#00000005] data-[state=closed]:bg-transparent">
              <span className="[font-family:'Roboto',Helvetica] font-medium text-[#292928] text-left  md:text-[1.2rem] text-[0.9rem] tracking-[0] leading-8">
                {faq.question}
              </span>
            </AccordionTrigger>
            {faq.answer && (
              <AccordionContent className="px-6 pb-4 bg-[#00000005] rounded-b-lg">
                <div className="[font-family:'Archivo',Helvetica] font-light text-[#676563] text-sm text-justify tracking-[0] leading-7">
                  {faq.answer}
                </div>
              </AccordionContent>
            )}
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default FAQListSection;
