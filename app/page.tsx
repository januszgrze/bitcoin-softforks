"use client";

import { useEffect, useState } from "react";
import OpcodeChart from "@/components/charts/opcode-chart";
import CtaCardOpcode from "@/components/cta-card-opcodes";
import OpcodeTable from "@/components/tables/opcode-table";
import InfoCardGridOpcode from "@/components/info-card-grid-opcode";
import { allOpcodes } from "@/util/opcode_index";
import { GitForkIcon } from "lucide-react";

export default function Home() {
    // Prevent hydration mismatch by only rendering dynamic content after client hydration
    const [isClient, setIsClient] = useState(false);
    
    useEffect(() => {
        setIsClient(true);
    }, []);

    const sortedOpcodes = allOpcodes.sort((a, b) =>
        a.title.toLowerCase().localeCompare(b.title.toLowerCase()),
    );

    const opcodeTypeFilters = [
        ...new Set(
            sortedOpcodes.map(
                (infrastructure) => infrastructure.entityType,
            ),
        ),
    ];

    const opcodeHeaders = [
        { name: "Name", showSorting: true, mobileLabel: "Name" },
        { name: "Components", showSorting: true, mobileLabel: "Components" },
        { name: "Primitives", showSorting: true, mobileLabel: "Primitives" },
        { name: "Tech Analysis", showSorting: true, mobileLabel: "Tech Analysis" },
        { name: "Applications", showSorting: true, mobileLabel: "Applications" },
        {
            name: "Associated Networks",
            showSorting: true,
            mobileLabel: "Networks",
        },
    ];

    return (
        <div className="mx-auto space-y-8 pt-8">
            {/* Opcode Table */}
            <div className="lg:flex mb-4 justify-center w-full lg:max-w-5xl mx-auto">
                <OpcodeTable
                    data={sortedOpcodes}
                    headers={opcodeHeaders}
                    title="Proposed Opcodes"
                    description="Learn the tradeoffs for different opcode proposals"
                    icon={<GitForkIcon className="mr-3" />}
                    isOpcode
                />
            </div>
            
            {/* Info Cards */}
            <div className="mb-8 max-w-5xl mx-auto">
                <InfoCardGridOpcode />
            </div>
            
            {/* Opcode Chart */}
            {isClient && (
                <div className="mb-8 max-w-5xl mx-auto">
                    <OpcodeChart />
                </div>
            )}
            
            {/* CTA section */}
            {isClient && <CtaCardOpcode />}
        </div>
    );
}
