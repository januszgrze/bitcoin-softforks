import React from "react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import { FileTextIcon } from "lucide-react";
import { InfrastructureProject } from "@/content/props";
import Image from "next/image";
import { parseTextWithLinks } from "@/util/parseTextWithLinks";

interface TechAnalysisDialogProps {
    opcode: InfrastructureProject;
}

const TechAnalysisDialog: React.FC<TechAnalysisDialogProps> = ({ opcode }) => {
    // Find the Techanalysis section from the opcode's sections
    const techSection = opcode.sections?.find(section => section.id === "Techanalysis");
    
    // Don't show button if no tech analysis content
    if (!techSection || !techSection.content || techSection.content.length === 0) {
        return (
            <div className="text-muted-foreground text-sm">
                No tech analysis
            </div>
        );
    }

    return (
        <HoverCard>
            <HoverCardTrigger asChild>
                <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-8 px-3 bg-[#E6F7FF] dark:bg-[#0F2A44] border-[#91D5FF] dark:border-[#0F2A44] hover:bg-[#D1F2FF] dark:hover:bg-[#1F3A5F] text-[#0958D9] dark:text-[#91D5FF]"
                >
                    <FileTextIcon className="w-4 h-4 mr-1" />
                    Tech Analysis
                </Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-96 p-4">
                <div className="space-y-4">
                    {/* Opcode Header */}
                    <div className="flex items-center gap-3">
                        <Image
                            src={`/logos/${opcode.slug}.png`}
                            alt={opcode.title}
                            width={24}
                            height={24}
                            className="rounded-full object-cover bg-muted"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = '/logos/bitcoinlayers-logo.png';
                            }}
                        />
                        <div>
                            <h3 className="text-lg font-medium text-foreground">
                                {opcode.title} - Tech Analysis
                            </h3>
                        </div>
                    </div>
                    
                    {/* Tech Analysis Content */}
                    <div className="space-y-3">
                        {techSection.content.map((item, index) => (
                            <div key={index}>
                                {item.title && (
                                    <div className="text-sm font-semibold text-foreground mb-1">
                                        {parseTextWithLinks(item.title)}
                                    </div>
                                )}
                                <div className="text-xs text-muted-foreground leading-relaxed">
                                    {parseTextWithLinks(item.content)}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </HoverCardContent>
        </HoverCard>
    );
};

export default TechAnalysisDialog; 