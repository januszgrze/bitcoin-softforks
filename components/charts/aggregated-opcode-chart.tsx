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

import { useState } from "react";
import { ComponentIcon, NetworkIcon, AppWindowIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { allOpcodes } from "@/util/opcode_index";
import { EntityType } from "@/content/props";
import { parseTextWithLinks } from "@/util/parseTextWithLinks";

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
  const networksCount = getSectionCount(currentProject, "associatednetworks");
  const useCasesCount = getSectionCount(currentProject, "applications");
  
  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
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
  
  if (!selectedSection || !currentProject) return null;
  
  const section = currentProject.sections?.find((s: any) => s.id === selectedSection);
  if (!section) return null;
  
  const getSectionTitle = (sectionId: string) => {
    switch (sectionId) {
      case "Components": return "Components";
      case "associatednetworks": return "Associated Networks";
      case "applications": return "Use Cases";
      default: return section.title;
    }
  };
  
  const getSectionColor = (sectionId: string) => {
    switch (sectionId) {
      case "Components": return "blue";
      case "associatednetworks": return "green";
      case "applications": return "purple";
      default: return "gray";
    }
  };
  
  const color = getSectionColor(selectedSection);
  
  return (
    <div className="mt-6 mb-6 animate-in slide-in-from-top-2 duration-300">
      <div className={`bg-white dark:bg-gray-900/50 rounded-lg p-6 border border-${color}-200 dark:border-${color}-800 shadow-lg`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className={`text-xl font-semibold text-${color}-900 dark:text-${color}-100 flex items-center`}>
            {selectedSection === "Components" && <ComponentIcon className="h-5 w-5 mr-2" />}
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
            // Special handling for networks - show as a formatted list
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                {section.content[0]?.title}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {section.content[0]?.content?.split(',').map((network: string, index: number) => (
                  <div key={index} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 text-center">
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {network.trim()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            // Regular content display for other sections
            section.content.map((item: any, index: number) => (
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
            ))
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