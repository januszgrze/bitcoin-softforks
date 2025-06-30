import React from "react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import { GitForkIcon } from "lucide-react";
import { InfrastructureProject } from "@/content/props";
import Image from "next/image";
import { parseTextWithLinks } from "@/util/parseTextWithLinks";

interface SoftForksDialogProps {
    opcode: InfrastructureProject;
}

const SoftForksDialog: React.FC<SoftForksDialogProps> = ({ opcode }) => {
    // Find the Softforks section from the opcode's sections
    const softforksSection = opcode.sections?.find(section => section.id === "Softforks");
    
    // Don't show button if no softforks content
    if (!softforksSection || !softforksSection.content || softforksSection.content.length === 0) {
        return (
            <div className="text-muted-foreground text-sm">
                No soft forks
            </div>
        );
    }

    return (
        <HoverCard>
            <HoverCardTrigger asChild>
                <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-8 px-3 bg-[#FFF2E8] dark:bg-[#2B1810] border-[#FFD591] dark:border-[#2B1810] hover:bg-[#FFEBD3] dark:hover:bg-[#3E2723] text-[#FA8C16] dark:text-[#FFD591]"
                >
                    <GitForkIcon className="w-4 h-4 mr-1" />
                    Soft Forks
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
                                {opcode.title} - Soft Forks
                            </h3>
                        </div>
                    </div>
                    
                    {/* Soft Forks Content */}
                    <div className="space-y-3">
                        {softforksSection.content.map((item, index) => (
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

export default SoftForksDialog; 