import React from "react";
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle } from "@/components/ui/dialog";
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
        <Dialog>
            <DialogTrigger asChild>
                <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-8 px-3 bg-[#F9F0FF] dark:bg-[#2B1B3D] border-[#D3ADF7] dark:border-[#2B1B3D] hover:bg-[#F4E8FF] dark:hover:bg-[#3E2A5C] text-[#722ED1] dark:text-[#D3ADF7]"
                >
                    <GamepadIcon className="w-4 h-4 mr-1" />
                    Applications
                </Button>
            </DialogTrigger>
            <DialogContent className="p-0 border-0 bg-transparent shadow-none max-w-fit [&>button]:hidden" style={{ width: "auto", maxWidth: "90vw" }}>
                <div 
                    className="bg-popover border border-border rounded-lg shadow-lg p-6"
                    style={{
                        width: "var(--breakpoint-sm, 640px)",
                        maxHeight: "80vh",
                        overflowY: "auto"
                    }}
                >
                    <DialogTitle className="sr-only">
                        {opcode.title} - Applications
                    </DialogTitle>
                    <div className="space-y-6">
                        {/* Opcode Header */}
                        <div className="flex items-center gap-3">
                            <Image
                                src={`/logos/${opcode.slug}.png`}
                                alt={opcode.title}
                                width={32}
                                height={32}
                                className="rounded-full object-cover bg-muted"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = '/logos/bitcoinlayers-logo.png';
                                }}
                            />
                            <div>
                                <h3 className="text-xl font-medium text-foreground" style={{ lineHeight: "28px" }}>
                                    {opcode.title} - Applications
                                </h3>
                            </div>
                        </div>
                        
                        {/* Underline separator */}
                        <hr className="border-border" />
                        
                        {/* Applications Content */}
                        <div className="content flex-grow pt-0">
                            {applicationsSection.content.map((item, index) => (
                                <div key={index} className="self-stretch mb-4">
                                    {item.title && (
                                        <div className="text-lg font-semibold text-foreground mb-2">
                                            {parseTextWithLinks(item.title)}
                                        </div>
                                    )}
                                    <div className="text-sm text-muted-foreground leading-relaxed">
                                        {parseTextWithLinks(item.content)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default OpcodeSummaryDialog; 