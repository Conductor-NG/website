import React from "react";
import { AlertTriangle } from "lucide-react";

const Header = () => {
  return (
    <div className="text-center mb-12 mt-20">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-[red] bg-opacity-10 rounded-full mb-6">
        <AlertTriangle className="w-8 h-8 text-[red]" />
      </div>
      <h1 className="md:text-4xl text-2xl font-bold mb-4">
        How to Delete Your Account
      </h1>
      <p className="md:text-lg text-sm text-[grey] max-w-2xl mx-auto leading-relaxed">
        Follow these simple steps to permanently delete your account and all
        associated data. Please note that this action cannot be undone.
      </p>
    </div>
  );
};

export default Header;
