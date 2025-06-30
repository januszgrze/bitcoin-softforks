"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import React, { useState } from "react";
import { ComponentIcon, NetworkIcon, AppWindowIcon, ChevronDownIcon, ChevronUpIcon, CodeIcon } from "lucide-react";
import { allOpcodes } from "@/util/opcode_index";
import { allLayers } from "@/util/layer_index";
import { EntityType } from "@/content/props";
import { parseTextWithLinks } from "@/util/parseTextWithLinks";
import Link from "next/link";
import Image from "next/image";

type AggregatedOpcodeChartProps = {
  defaultOpcode?: string;
  title?: string;
  description?: string;
};

// Get soft forks projects (SingleOp OR GroupOp)
const getSoftForksProjects = () => {
  return allOpcodes.filter(project => 
    project.entityType === EntityType.SingleOp || project.entityType === EntityType.GroupOp
  );
};

// Helper function to count items in a section
const getSectionCount = (project: any, sectionId: string): number => {
  const section = project.sections?.find((s: any) => s.id === sectionId);
  if (!section?.content?.length) return 0;
  
  // Special handling for associatednetworks - count individual networks in comma-separated string
  if (sectionId === "associatednetworks") {
    const networksContent = section.content[0]?.content || "";
    if (networksContent) {
      // Split by comma and filter out empty strings
      const networks = networksContent.split(',').map((n: string) => n.trim()).filter((n: string) => n.length > 0);
      return networks.length;
    }
  }
  
  return section.content.length;
};

// Network mapping utility to get full project data from slug
const getNetworkBySlug = (slug: string) => {
  return allLayers.find(layer => layer.slug === slug.trim().toLowerCase());
};

// Enhanced Network Card Component
const NetworkCard = ({ networkSlug }: { networkSlug: string }) => {
  const network = getNetworkBySlug(networkSlug);
  
  if (!network) {
    // Fallback for networks not found in layer index
    return (
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 text-center border border-gray-200 dark:border-gray-700">
        <span className="text-sm font-medium text-gray-900 dark:text-gray-100 capitalize">
          {networkSlug.trim()}
        </span>
      </div>
    );
  }

  return (
    <Link 
      href={`/layers/${network.slug}`}
      className="group bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-md transition-all duration-200 cursor-pointer"
    >
      <div className="flex items-center space-x-3">
        <div className="flex-shrink-0">
          <Image
            src={`/logos/${network.slug}.png`}
            alt={`${network.title} logo`}
            width={24}
            height={24}
            className="rounded-sm"
            onError={(e) => {
              // Hide image on error and show fallback
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>
        <div className="flex-1 min-w-0">
          <span className="text-sm font-medium text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 truncate block">
            {network.title}
          </span>
        </div>
        <div className="flex-shrink-0">
          <svg 
            className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </div>
      </div>
    </Link>
  );
};

// Stats component for summary metrics
const StatsBar = ({ 
  selectedOpcode, 
  selectedSection, 
  onSectionClick 
}: { 
  selectedOpcode: string;
  selectedSection: string | null;
  onSectionClick: (section: string) => void;
}) => {
  const softForksProjects = getSoftForksProjects();
  const currentProject = softForksProjects.find(p => p.slug === selectedOpcode);
  
  if (!currentProject) return null;
  
  const componentsCount = getSectionCount(currentProject, "Components");
  const primitivesCount = getSectionCount(currentProject, "Primitive");
  const networksCount = getSectionCount(currentProject, "associatednetworks");
  const useCasesCount = getSectionCount(currentProject, "applications");
  
  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      <div 
        className={`bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800 cursor-pointer transition-all hover:shadow-md ${
          selectedSection === "Components" ? "ring-2 ring-blue-500 shadow-lg" : ""
        }`}
        onClick={() => onSectionClick("Components")}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Total Components</p>
            <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">{componentsCount}</p>
          </div>
          <div className="flex flex-col items-center">
            <ComponentIcon className="h-8 w-8 text-blue-500" />
            {selectedSection === "Components" ? 
              <ChevronUpIcon className="h-4 w-4 text-blue-500 mt-1" /> : 
              <ChevronDownIcon className="h-4 w-4 text-blue-500 mt-1" />
            }
          </div>
        </div>
      </div>
      
      <div 
        className={`bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-lg p-4 border border-orange-200 dark:border-orange-800 cursor-pointer transition-all hover:shadow-md ${
          selectedSection === "Primitive" ? "ring-2 ring-orange-500 shadow-lg" : ""
        }`}
        onClick={() => onSectionClick("Primitive")}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-orange-600 dark:text-orange-400">Primitives</p>
            <p className="text-2xl font-bold text-orange-900 dark:text-orange-100">{primitivesCount}</p>
          </div>
          <div className="flex flex-col items-center">
            <CodeIcon className="h-8 w-8 text-orange-500" />
            {selectedSection === "Primitive" ? 
              <ChevronUpIcon className="h-4 w-4 text-orange-500 mt-1" /> : 
              <ChevronDownIcon className="h-4 w-4 text-orange-500 mt-1" />
            }
          </div>
        </div>
      </div>
      
      <div 
        className={`bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg p-4 border border-green-200 dark:border-green-800 cursor-pointer transition-all hover:shadow-md ${
          selectedSection === "associatednetworks" ? "ring-2 ring-green-500 shadow-lg" : ""
        }`}
        onClick={() => onSectionClick("associatednetworks")}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-green-600 dark:text-green-400">Associated Networks</p>
            <p className="text-2xl font-bold text-green-900 dark:text-green-100">{networksCount}</p>
          </div>
          <div className="flex flex-col items-center">
            <NetworkIcon className="h-8 w-8 text-green-500" />
            {selectedSection === "associatednetworks" ? 
              <ChevronUpIcon className="h-4 w-4 text-green-500 mt-1" /> : 
              <ChevronDownIcon className="h-4 w-4 text-green-500 mt-1" />
            }
          </div>
        </div>
      </div>
      
      <div 
        className={`bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg p-4 border border-purple-200 dark:border-purple-800 cursor-pointer transition-all hover:shadow-md ${
          selectedSection === "applications" ? "ring-2 ring-purple-500 shadow-lg" : ""
        }`}
        onClick={() => onSectionClick("applications")}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-purple-600 dark:text-purple-400">Use Cases</p>
            <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">{useCasesCount}</p>
          </div>
          <div className="flex flex-col items-center">
            <AppWindowIcon className="h-8 w-8 text-purple-500" />
            {selectedSection === "applications" ? 
              <ChevronUpIcon className="h-4 w-4 text-purple-500 mt-1" /> : 
              <ChevronDownIcon className="h-4 w-4 text-purple-500 mt-1" />
            }
          </div>
        </div>
      </div>
    </div>
  );
};

// Section content display component
const SectionContentDisplay = ({ 
  selectedOpcode, 
  selectedSection,
  onClose 
}: { 
  selectedOpcode: string;
  selectedSection: string | null;
  onClose: () => void;
}) => {
  const softForksProjects = getSoftForksProjects();
  const currentProject = softForksProjects.find(p => p.slug === selectedOpcode);
  const [showAllUseCases, setShowAllUseCases] = useState(false);
  
  // Reset expanded state when section changes
  React.useEffect(() => {
    setShowAllUseCases(false);
  }, [selectedSection]);
  
  if (!selectedSection || !currentProject) return null;
  
  const section = currentProject.sections?.find((s: any) => s.id === selectedSection);
  if (!section) return null;
  
  const getSectionTitle = (sectionId: string) => {
    switch (sectionId) {
      case "Components": return "Components";
      case "Primitive": return "Primitives";
      case "associatednetworks": return "Associated Networks";
      case "applications": return "Use Cases";
      default: return section.title;
    }
  };
  
  const getSectionColor = (sectionId: string) => {
    switch (sectionId) {
      case "Components": return "blue";
      case "Primitive": return "orange";
      case "associatednetworks": return "green";
      case "applications": return "purple";
      default: return "gray";
    }
  };
  
  const color = getSectionColor(selectedSection);
  
  // Handle use cases display logic
  const getDisplayedUseCases = () => {
    if (selectedSection === "applications" && section.content) {
      const totalUseCases = section.content.length;
      if (totalUseCases <= 4) {
        return section.content; // Show all if 4 or fewer
      }
      return showAllUseCases ? section.content : section.content.slice(0, 4);
    }
    return section.content;
  };
  
  const displayedContent = getDisplayedUseCases();
  const hasMoreUseCases = selectedSection === "applications" && section.content && section.content.length > 4;
  const hiddenUseCasesCount = hasMoreUseCases ? section.content.length - 4 : 0;
  
  return (
    <div className="mt-6 mb-6 animate-in slide-in-from-top-2 duration-300">
      <div className={`bg-white dark:bg-gray-900/50 rounded-lg p-6 border border-${color}-200 dark:border-${color}-800 shadow-lg`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className={`text-xl font-semibold text-${color}-900 dark:text-${color}-100 flex items-center`}>
            {selectedSection === "Components" && <ComponentIcon className="h-5 w-5 mr-2" />}
            {selectedSection === "Primitive" && <CodeIcon className="h-5 w-5 mr-2" />}
            {selectedSection === "associatednetworks" && <NetworkIcon className="h-5 w-5 mr-2" />}
            {selectedSection === "applications" && <AppWindowIcon className="h-5 w-5 mr-2" />}
            {currentProject.title} - {getSectionTitle(selectedSection)}
          </h3>
          <button
            onClick={onClose}
            className={`text-${color}-600 dark:text-${color}-400 hover:text-${color}-800 dark:hover:text-${color}-200 transition-colors`}
          >
            <ChevronUpIcon className="h-5 w-5" />
          </button>
        </div>
        
        <div className="space-y-4">
          {selectedSection === "associatednetworks" ? (
            // Enhanced networks display with logos and links
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {section.content[0]?.title}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {section.content[0]?.content?.split(',').map((networkSlug: string, index: number) => (
                  <NetworkCard key={index} networkSlug={networkSlug} />
                ))}
              </div>
            </div>
          ) : (
            // Regular content display for other sections
            <>
              {displayedContent.map((item: any, index: number) => (
                <div key={index} className="border-b border-gray-200 dark:border-gray-700 last:border-b-0 pb-4 last:pb-0">
                  {item.title && (
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                      {parseTextWithLinks(item.title)}
                    </h4>
                  )}
                  <div className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {parseTextWithLinks(item.content)}
                  </div>
                </div>
              ))}
              
              {/* Show More/Show Less button for use cases */}
              {hasMoreUseCases && (
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={() => setShowAllUseCases(!showAllUseCases)}
                    className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 bg-${color}-50 dark:bg-${color}-900/20 text-${color}-600 dark:text-${color}-400 hover:bg-${color}-100 dark:hover:bg-${color}-900/30 border border-${color}-200 dark:border-${color}-800`}
                  >
                    {showAllUseCases ? (
                      <>
                        <ChevronUpIcon className="h-4 w-4 mr-2" />
                        Show less
                      </>
                    ) : (
                      <>
                        <ChevronDownIcon className="h-4 w-4 mr-2" />
                        Show all {hiddenUseCasesCount} more use cases
                      </>
                    )}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default function OpcodeSupportChart({
  defaultOpcode,
  title,
  description,
}: AggregatedOpcodeChartProps) {
  const softForksProjects = getSoftForksProjects();
  
  // Set initial opcode based on defaultOpcode or first available project
  const initialOpcode = defaultOpcode || softForksProjects[0]?.slug || "opcat";
  const [selectedOpcode, setSelectedOpcode] = useState<string>(initialOpcode);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  
  const currentProject = softForksProjects.find(p => p.slug === selectedOpcode);
  
  const handleSectionClick = (section: string) => {
    if (selectedSection === section) {
      setSelectedSection(null); // Close if already open
    } else {
      setSelectedSection(section); // Open new section
    }
  };
  
  const handleOpcodeChange = (newOpcode: string) => {
    setSelectedOpcode(newOpcode);
    setSelectedSection(null); // Reset section when changing opcode
  };

  return (
    <Card className="bg-background shadow-lg border-0 ring-1 ring-gray-200/50 dark:ring-gray-800/50" id="op-support-chart">
      <CardHeader className="pb-2">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent">
              {currentProject ? `${currentProject.title} Project Overview` : 'Bitcoin Opcode Project Overview'}
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              {currentProject ? `Detailed breakdown of components, networks, and use cases for ${currentProject.title}` : 'Select an opcode to view its project details'}
            </CardDescription>
          </div>
          
          <div className="flex items-center space-x-3">
            <Select value={selectedOpcode} onValueChange={handleOpcodeChange}>
              <SelectTrigger className="w-[200px] bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600">
                <SelectValue placeholder="Select opcode" />
              </SelectTrigger>
              <SelectContent>
                {softForksProjects
                  .sort((a, b) => a.title.localeCompare(b.title))
                  .map((project) => (
                    <SelectItem key={project.slug} value={project.slug}>
                      {project.title}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-4">
        <StatsBar 
          selectedOpcode={selectedOpcode} 
          selectedSection={selectedSection}
          onSectionClick={handleSectionClick}
        />
        
        <SectionContentDisplay 
          selectedOpcode={selectedOpcode}
          selectedSection={selectedSection}
          onClose={() => setSelectedSection(null)}
        />
        
        <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Data sourced from project content sections
          </div>
          <a
            href={`/opcode/${selectedOpcode}`}
            className="inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
          >
            View full project details
            <span className="ml-1">→</span>
          </a>
        </div>
      </CardContent>
    </Card>
  );
}