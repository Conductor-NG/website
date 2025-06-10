import React from "react";
import { CheckCircle } from "lucide-react";
import Image from "next/image";

interface StepCardProps {
  stepNumber: number;
  title: string;
  description: string;
  imageUrl: string;
  isCompleted?: boolean;
}

const StepCard = ({
  stepNumber,
  title,
  description,
  imageUrl,
  isCompleted = false,
}: StepCardProps) => {
  return (
    <div className="bg-card rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="relative">
        <Image
          src={`/images/${imageUrl}`}
          alt={title}
          width={300}
          height={600}
          className="mx-auto w-[300px] h-[600px] object-fit"
        />
        <div className="absolute top-4 left-4 bg-[var(--secondary-color)] text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
          {isCompleted ? <CheckCircle size={16} /> : stepNumber}
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-foreground mb-3">{title}</h3>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

export default StepCard;
