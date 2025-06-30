"use client";

import { ChevronsUpDown, ExternalLinkIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import ImageWithFallback from "./tables/image-with-fallback";
import { InfrastructureProject } from "@/content/props";
import starknet from "@/content/layers/starknet";
import base from "@/content/layers/base";
import optimism from "@/content/layers/optimism";
import bob from "@/content/layers/bob";
import scroll from "@/content/layers/scroll";
import taiko from "@/content/layers/taiko";
import zksync from "@/content/layers/zksync";

interface Props {
    opcode: InfrastructureProject;
}

// Utility to get all available networks with descriptions
const getAllNetworks = () => {
    return [
        { slug: starknet.slug, title: starknet.title, description: starknet.description },
        { slug: base.slug, title: base.title, description: base.description },
        { slug: optimism.slug, title: optimism.title, description: optimism.description },
        { slug: bob.slug, title: bob.title, description: bob.description },
        { slug: scroll.slug, title: scroll.title, description: scroll.description },
        { slug: taiko.slug, title: taiko.title, description: taiko.description },
        { slug: zksync.slug, title: zksync.title, description: zksync.description },
    ];
};

const NetworkItem = ({
    network,
    showBorder,
}: {
    network: {
        slug: string;
        title: string;
        description: string;
    };
    showBorder: boolean;
}) => {
    return (
        <div className={`${showBorder ? "border-b" : ""} py-4`}>
            <div className="self-stretch justify-between items-center inline-flex">
                <div className="!text-muted-foreground mb-1 flex items-center">
                    <ImageWithFallback
                        slug={network.slug}
                        folder="logos"
                        altText={network.title}
                        width={20}
                        height={20}
                    />
                    <p className="ml-2 font-semibold text-foreground">
                        {network.title}
                    </p>
                </div>
            </div>
            <div className="!text-muted-foreground text-sm leading-relaxed pl-7">
                {network.description}
            </div>
        </div>
    );
};

export default function ProjectAssociatedNetworks({ opcode }: Props) {
    const [isOpen, setIsOpen] = useState(false);

    // Find the associatednetworks section from the opcode's sections
    const associatedSection = opcode.sections?.find(section => section.id === "associatednetworks");
    
    // Extract network names from the content and match to full network data
    const getAssociatedNetworks = () => {
        if (!associatedSection || !associatedSection.content || associatedSection.content.length === 0) {
            return [];
        }
        
        // Get all content strings and parse network names
        const networkNames: string[] = [];
        associatedSection.content.forEach(item => {
            if (item.content) {
                // Split by comma and clean up the network names
                const names = item.content.split(',').map(name => 
                    name.trim().toLowerCase().replace(/\s+/g, '')
                ).filter(name => name.length > 0);
                networkNames.push(...names);
            }
        });
        
        // Map to the full network data structure
        const allNetworks = getAllNetworks();
        return allNetworks.filter(network => 
            networkNames.some(name => 
                network.slug.toLowerCase().includes(name) || 
                network.title.toLowerCase().includes(name) ||
                name.includes(network.slug.toLowerCase())
            )
        );
    };

    const networks = getAssociatedNetworks();

    // Don't render if no networks found
    if (networks.length === 0) {
        return null;
    }

    const initialItems = networks.slice(0, 3);
    const collapsibleItems = networks.slice(3);

    return (
        <section
            id="associatednetworks"
            className="self-stretch lg:px-8 px-4 pt-6 pb-8 mb-6 bg-background rounded-xl border border-border flex-col justify-center items-end gap-4"
        >
            <div className="self-stretch justify-start items-start gap-4">
                <div className="body_section !text-foreground">
                    Associated Networks
                </div>
            </div>

            {initialItems.map((network, index) => (
                <NetworkItem
                    key={network.slug}
                    network={network}
                    showBorder={
                        index !== initialItems.length - 1 ||
                        (collapsibleItems.length > 0 && isOpen)
                    }
                />
            ))}

            {collapsibleItems.length > 0 && (
                <Collapsible
                    open={isOpen}
                    onOpenChange={setIsOpen}
                    className="w-full space-y-2"
                >
                    {!isOpen && (
                        <CollapsibleTrigger asChild>
                            <div className="flex items-center justify-between space-x-4 mt-6 cursor-pointer">
                                <h4 className="text-sm text-muted-foreground">
                                    Show {collapsibleItems.length} more{" "}
                                    {collapsibleItems.length === 1
                                        ? "network"
                                        : "networks"}
                                </h4>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="w-9 p-0"
                                >
                                    <ChevronsUpDown className="h-4 w-4" />
                                    <span className="sr-only">Toggle</span>
                                </Button>
                            </div>
                        </CollapsibleTrigger>
                    )}
                    <CollapsibleContent className="space-y-2">
                        {collapsibleItems.map((network, index) => (
                            <NetworkItem
                                key={network.slug}
                                network={network}
                                showBorder={
                                    index !== collapsibleItems.length - 1
                                }
                            />
                        ))}
                    </CollapsibleContent>
                </Collapsible>
            )}
        </section>
    );
} 