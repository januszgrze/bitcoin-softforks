"use client";

import React, { useState, useMemo, ReactNode } from "react";
import Image from "next/image";
import TableHeader from "@/components/tables/tableHeader";
// Removed isMobile import to fix hydration issues
import Link from "next/link";
import { useQueryState } from "nuqs";
import { InfrastructureProject, EntityType, LayerProject } from "@/content/props";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { CoinsIcon } from "lucide-react";
import NetworkTypeHoverCard from "../layer/network-type-hover-card";
import ImageWithFallback from "./image-with-fallback";
import OpcodeSummaryDialog from "../opcodes/opcode-summary-dialog";
import ApplicationsSummaryDialog from "../opcodes/applications-summary-dialog";
import OpcodesButtonDialog from "../opcodes/opcodes-button-dialog";
import TechAnalysisDialog from "../opcodes/tech-analysis-dialog";
import SoftForksDialog from "../opcodes/softforks-dialog";
import ThroughputMultipleDialog from "../opcodes/throughput-multiple-dialog";
import SupportNetworksModal from "./support-networks-modal";
import starknet from "@/content/layers/starknet";
import base from "@/content/layers/base";
import optimism from "@/content/layers/optimism";
import bob from "@/content/layers/bob";
import scroll from "@/content/layers/scroll";
import taiko from "@/content/layers/taiko";
import zksync from "@/content/layers/zksync";

// Hardcoded support networks for each opcode
const OPCODE_SUPPORT_NETWORKS: Record<string, string[]> = {
    "opcat": ["starknet", "spark", "bob"],
    "opctv": ["starknet", "spark", "bob"],
};

type TableTabKey =
    | "Components"
    | "Primitives"
    | "Tech Analysis"
    | "Applications"
    | "Support Networks"
    | "Soft Forks"
    | "Throughput Multiple"

interface Props {
    data: InfrastructureProject[];
    headers: {
        name: string;
        showSorting: boolean;
        filterOptions?: string[];
        mobileLabel: string;
        className?: string;
    }[];
    title?: string;
    description?: string;
    icon?: ReactNode;
    isOpcode?: boolean;
}

const OpcodeImage = ({ src, title }: { src: string; title: string }) => {
    const [imageSrc, setImageSrc] = useState(src);
    const handleError = () => setImageSrc("/bitcoinlayers-logo.png");
    return (
        <Image
            src={imageSrc}
            alt={`${title} logo`}
            width={20}
            height={20}
            onError={handleError}
        />
    );
};

const StatusBadge = ({ status }: { status: string }) => {
    const getStatusColor = (status: string) => {
        switch (status) {
            case "Proposed":
                return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30";
            case "Bip Drafted":
                return "bg-blue-500/20 text-blue-300 border-blue-500/30";
            case "Activation Client":
                return "bg-green-500/20 text-green-300 border-green-500/30";
            default:
                return "bg-gray-500/20 text-gray-300 border-gray-500/30";
        }
    };
    return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(status)}`}>{status}</span>
    );
};

// Utility to get all AltRollup networks
const getAltRollupNetworks = () => {
    const layers: LayerProject[] = [starknet, base, optimism, bob, scroll, taiko, zksync];
    return layers
        .filter((layer) => layer.entityType === EntityType.AltRollup)
        .map((layer) => ({
            slug: layer.slug,
            title: layer.title,
            description: layer.description,
        }));
};

const SupportNetworksList = ({ opcode }: { opcode: InfrastructureProject }) => {
    // Find the associatednetworks section from the opcode's sections
    const associatedSection = opcode.sections?.find(section => section.id === "associatednetworks");
    
    // Extract network names from the content
    const getNetworksFromContent = () => {
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
        const allNetworks = getAltRollupNetworks();
        return allNetworks.filter(network => 
            networkNames.some(name => 
                network.slug.toLowerCase().includes(name) || 
                network.title.toLowerCase().includes(name) ||
                name.includes(network.slug.toLowerCase())
            )
        );
    };

    const networks = getNetworksFromContent();
    const topThree = networks.slice(0, 3);
    const remainingCount = networks.length - 3;

    // If no networks found, show fallback
    if (networks.length === 0) {
        return (
            <div className="text-muted-foreground text-sm">
                No networks
            </div>
        );
    }

    return (
        <SupportNetworksModal networks={networks}>
            <div className="flex flex-nowrap gap-2 items-center cursor-pointer hover:opacity-80 transition-opacity">
                {topThree.map((network) => (
                    <div key={network.slug} className="flex items-center">
                        <ImageWithFallback
                            slug={network.slug}
                            folder="logos"
                            altText={`${network.title} logo`}
                            width={20}
                            height={20}
                        />
                    </div>
                ))}
                {remainingCount > 0 && (
                    <div className="flex items-center">
                        <span className="text-xs text-muted-foreground">+{remainingCount}</span>
                    </div>
                )}
            </div>
        </SupportNetworksModal>
    );
};

const OpcodeTable = ({ data, headers, title, description, icon, isOpcode = false }: Props) => {
    const [status, setStatus] = useQueryState("status", { defaultValue: "softforks" });

    const [sortBy, setSortBy] = useQueryState("sortBy", { defaultValue: "Name" });
    const [sortOrder, setSortOrder] = useQueryState("sortOrder", { defaultValue: "asc" });


    // Different headers based on current status
    const usecaseHeaders = [
        { name: "Use Case", showSorting: true, mobileLabel: "Use Case" },
        { name: "Soft Forks", showSorting: false, mobileLabel: "Soft Forks" },
        { name: "Throughput Multiple", showSorting: false, mobileLabel: "Throughput Multiple", className: "hidden md:table-cell" },
        { name: "Associated Networks", showSorting: false, mobileLabel: "Associated Networks", className: "hidden md:table-cell" },
    ];

    const softforkHeaders = headers.map((header, index) => {
        // Hide all columns except Name and Components on mobile for soft forks view
        if (index > 1) {
            return { ...header, className: "hidden md:table-cell" };
        }
        return header;
    });

    const fullHeaders = status === "usecases" ? usecaseHeaders : softforkHeaders;

    // Headers are now handled via CSS responsive classes

    const sortAndFilterData = useMemo(() => {
        const sorted = [...data].sort((a, b) => {
            let valueA: any, valueB: any;
            switch (sortBy) {
                case "Name":
                case "Use Case":
                    valueA = a.title.toLowerCase();
                    valueB = b.title.toLowerCase();
                    break;
                case "Components":
                    valueA = a.sections?.find(s => s.id === "Components")?.content?.length || 0;
                    valueB = b.sections?.find(s => s.id === "Components")?.content?.length || 0;
                    break;
                case "Primitives":
                    valueA = a.sections?.find(s => s.id === "Primitive")?.content?.length || 0;
                    valueB = b.sections?.find(s => s.id === "Primitive")?.content?.length || 0;
                    break;
                case "Tech Analysis":
                    valueA = a.sections?.find(s => s.id === "Techanalysis")?.content?.length || 0;
                    valueB = b.sections?.find(s => s.id === "Techanalysis")?.content?.length || 0;
                    break;
                case "Applications":
                    valueA = a.sections?.find(s => s.id === "applications")?.content?.length || 0;
                    valueB = b.sections?.find(s => s.id === "applications")?.content?.length || 0;
                    break;
                case "Soft Forks":
                    valueA = a.sections?.find(s => s.id === "Softforks")?.content?.length || 0;
                    valueB = b.sections?.find(s => s.id === "Softforks")?.content?.length || 0;
                    break;
                case "Throughput Multiple":
                    valueA = a.sections?.find(s => s.id === "throughputmultiple")?.content?.length || 0;
                    valueB = b.sections?.find(s => s.id === "throughputmultiple")?.content?.length || 0;
                    break;
                case "Associated Networks":
                    valueA = OPCODE_SUPPORT_NETWORKS[a.slug]?.length || 0;
                    valueB = OPCODE_SUPPORT_NETWORKS[b.slug]?.length || 0;
                    break;
                default:
                    return 0;
            }
            if (valueA < valueB) return sortOrder === "asc" ? -1 : 1;
            if (valueA > valueB) return sortOrder === "asc" ? 1 : -1;
            return 0;
        });

        let filtered = sorted;
        if (status !== "softforks") {
            filtered = filtered.filter(item => {
                switch (status) {
                    case "usecases": return item.entityType === EntityType.UseCase;
                    case "softforks": return item.entityType === EntityType.SingleOp || item.entityType === EntityType.GroupOp;
                    default: return true;
                }
            });
        } else {
            // For "softforks", show SingleOp and GroupOp
            filtered = filtered.filter(item => 
                item.entityType === EntityType.SingleOp || item.entityType === EntityType.GroupOp
            );
        }
        return filtered;
    }, [data, sortBy, sortOrder, status]);

    const handleSort = (header: string) => {
        if (sortBy === header) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortBy(header);
            setSortOrder("asc");
        }
    };

    return (
        <Card className="w-full">
            <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row border-none">
                <div className="flex flex-1 flex-col justify-center px-6 py-5 sm:py-6">
                    <CardTitle className="flex">
                        {icon || <CoinsIcon className="mr-3" />} {title || "Proposed Opcodes"}
                    </CardTitle>
                    <CardDescription>{description || "Learn the tradeoffs for different opcode proposals"}</CardDescription>
                </div>
                <div className="flex">
                    {[
                        { key: "usecases", label: "Usecases", count: data.filter(d => d.entityType === EntityType.UseCase).length },
                        { key: "softforks", label: "Soft Forks", count: data.filter(d => d.entityType === EntityType.SingleOp || d.entityType === EntityType.GroupOp).length },
                    ].map((statusOption) => (
                        <button
                            key={statusOption.key}
                            data-active={status === statusOption.key}
                            className="relative z-30 flex flex-1 flex-col justify-center gap-1 px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:px-8 sm:py-6 min-w-[100px] sm:min-w-[150px]"
                            onClick={() => setStatus(statusOption.key)}
                        >
                            <span className="text-xs text-muted-foreground">
                                {statusOption.label}
                            </span>
                            <span className="text-lg font-bold leading-none sm:text-3xl">
                                {statusOption.count.toLocaleString()}
                            </span>
                        </button>
                    ))}
                </div>
            </CardHeader>
            <CardContent className="p-0">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <TableHeader
                            headers={fullHeaders}
                            onSort={handleSort}
                            sortBy={sortBy}
                            sortOrder={sortOrder}
                        />
                        <tbody>
                            {sortAndFilterData.map((item, idx) => (
                                <tr key={item.slug} className={idx < sortAndFilterData.length - 1 ? "border-b" : ""}>
                                    {status === "usecases" ? (
                                        // Usecases view
                                        <>
                                            {/* Use Case */}
                                            <td className="px-4 py-4 font-semibold whitespace-nowrap">
                                                <div className="flex items-center space-x-2 max-w-[250px]">
                                                    <Link href={`/${isOpcode ? "opcode" : "infrastructure"}/${item.slug}`} className="flex items-center min-w-0 flex-1">
                                                        <OpcodeImage src={`/logos/${item.slug}.png`} title={item.title} />
                                                        <span className="ml-2 truncate">{item.title}</span>
                                                    </Link>
                                                    {item.notice && <div className="w-2 h-2 bg-orange-400 rounded-full" />}    
                                                </div>
                                            </td>
                                            {/* Soft Forks */}
                                            <td className="px-4 py-3">
                                                <SoftForksDialog opcode={item} />
                                            </td>
                                            {/* Throughput Multiple */}
                                            <td className="px-4 py-3 hidden md:table-cell">
                                                <ThroughputMultipleDialog opcode={item} />
                                            </td>
                                            {/* Associated Networks */}
                                            <td className="px-4 py-3 hidden md:table-cell">
                                                <SupportNetworksList opcode={item} />
                                            </td>
                                        </>
                                    ) : (
                                        // Soft Forks view (original)
                                        <>
                                            {/* Name */}
                                            <td className="px-4 py-4 font-semibold whitespace-nowrap">
                                                <div className="flex items-center space-x-2 max-w-[250px]">
                                                    <Link href={`/${isOpcode ? "opcode" : "infrastructure"}/${item.slug}`} className="flex items-center min-w-0 flex-1">
                                                        <OpcodeImage src={`/logos/${item.slug}.png`} title={item.title} />
                                                        <span className="ml-2 truncate">{item.title}</span>
                                                    </Link>
                                                    {item.notice && <div className="w-2 h-2 bg-orange-400 rounded-full" />}    
                                                </div>
                                            </td>
                                            {/* Components */}
                                            <td className="px-4 py-3">
                                                <OpcodesButtonDialog opcode={item} />
                                            </td>
                                            {/* Primitives */}
                                            <td className="px-4 py-3 hidden md:table-cell">
                                                <ApplicationsSummaryDialog opcode={item} />
                                            </td>
                                            {/* Tech Analysis */}
                                            <td className="px-4 py-3 hidden md:table-cell">
                                                <TechAnalysisDialog opcode={item} />
                                            </td>
                                            {/* Applications */}
                                            <td className="px-4 py-3 hidden md:table-cell">
                                                <OpcodeSummaryDialog opcode={item} />
                                            </td>
                                            {/* Support Networks */}
                                            <td className="px-4 py-3 hidden md:table-cell">
                                                <SupportNetworksList opcode={item} />
                                            </td>
                                        </>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>
    );
};

export default OpcodeTable;