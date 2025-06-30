import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon, ExternalLinkIcon } from "lucide-react";
import Link from "next/link";

export default function WelcomeBanner() {
  return (
    <Alert className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800 mb-8">
      <InfoIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
      <AlertTitle className="text-blue-900 dark:text-blue-100 font-semibold">
        Welcome to Bitcoin Soft Forks
      </AlertTitle>
      <AlertDescription className="text-blue-800 dark:text-blue-200 mt-2">
        <p className="mb-3">
          Soft forks are backward-compatible upgrades to Bitcoin that introduce new rules or features without breaking existing functionality. They allow the network to evolve while maintaining consensus among all participants.
        </p>
        <Link 
          href="https://github.com/bitcoinbook/bitcoinbook/blob/develop/ch10.asciidoc#soft-forks"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
        >
          Learn more about soft forks
          <ExternalLinkIcon className="ml-1 h-4 w-4" />
        </Link>
      </AlertDescription>
    </Alert>
  );
} 