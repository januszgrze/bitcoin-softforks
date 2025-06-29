import React from "react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import { GamepadIcon } from "lucide-react";
import { InfrastructureProject } from "@/content/props";
import Image from "next/image";
import { parseTextWithLinks } from "@/util/parseTextWithLinks";

interface OpcodeSummaryDialogProps {
    opcode: InfrastructureProject;
}

const OpcodeSummaryDialog: React.FC<OpcodeSummaryDialogProps> = ({ opcode }) => {
    // Find the applications section from the opcode's sections
    const applicationsSection = opcode.sections?.find(section => section.id === "applications");
    
    // Don't show button if no applications content
    if (!applicationsSection || !applicationsSection.content || applicationsSection.content.length === 0) {
        return (
            <div className="text-muted-foreground text-sm">
                No applications
            </div>
        );
    }

    return (
        <HoverCard>
            <HoverCardTrigger asChild>
                <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-8 px-3 bg-[#F9F0FF] dark:bg-[#2B1B3D] border-[#D3ADF7] dark:border-[#2B1B3D] hover:bg-[#F4E8FF] dark:hover:bg-[#3E2A5C] text-[#722ED1] dark:text-[#D3ADF7]"
                >
                    <GamepadIcon className="w-4 h-4 mr-1" />
                    Applications
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
                                {opcode.title} - Applications
                            </h3>
                        </div>
                    </div>
                    
                    {/* Applications Content */}
                    <div className="space-y-3">
                        {applicationsSection.content.map((item, index) => (
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

export default OpcodeSummaryDialog; 