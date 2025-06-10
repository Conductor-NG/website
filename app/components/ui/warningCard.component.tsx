import React from "react";
import { AlertCircle } from "lucide-react";

const WarningCard = () => {
  return (
    <div className="bg-[red] bg-opacity-10 border border-[red] border-opacity-20 rounded-lg p-6 mb-12">
      <div className="flex items-start space-x-3">
        <AlertCircle className="w-6 h-6 text-[red] text-opacity-60 flex-shrink-0 mt-0.5" />
        <div>
          <h3 className="font-semibold text-[red] text-opacity-60 mb-2">
            Important Warning
          </h3>
          <p className="text-sm text-[grey] ">
            Deleting your account is permanent and cannot be reversed. All your
            data, including profile information, posts, and preferences will be
            permanently removed from our servers.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WarningCard;
