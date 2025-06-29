import React from "react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import { CodeIcon, HashIcon } from "lucide-react";
import { InfrastructureProject } from "@/content/props";
import Image from "next/image";
import { parseTextWithLinks } from "@/util/parseTextWithLinks";

interface ApplicationsSummaryDialogProps {
    opcode: InfrastructureProject;
}

const ApplicationsSummaryDialog: React.FC<ApplicationsSummaryDialogProps> = ({ opcode }) => {
    // Find the Primitives section from the opcode's sections
    const primitivesSection = opcode.sections?.find(section => section.id === "Primitive");
    
    // Don't show button if no primitives content
    if (!primitivesSection || !primitivesSection.content || primitivesSection.content.length === 0) {
        return (
            <div className="text-muted-foreground text-sm">
                No primitives
            </div>
        );
    }

    return (
        <HoverCard>
            <HoverCardTrigger asChild>
                <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-8 px-3 bg-[#F6FFED] dark:bg-[#162312] border-[#B7EB8F] dark:border-[#162312] hover:bg-[#EAFFDA] dark:hover:bg-[#274016] text-[#52C41A] dark:text-[#B7EB8F]"
                >
                    <CodeIcon className="w-4 h-4 mr-1" />
                    Primitives
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
                                {opcode.title} - Primitives
                            </h3>
                        </div>
                    </div>
                    
                    {/* Primitives Content */}
                    <div className="space-y-3">
                        {primitivesSection.content.map((item, index) => (
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

export default ApplicationsSummaryDialog; 