"use client";

import AggregatedOpcodeChart from "./aggregated-opcode-chart";

export default function OpcodeChart() {
    return (
        <AggregatedOpcodeChart
            title="Proposed opcodes"
            description="See what developers prefer for a possible bitcoin soft fork"
            chartHeight="h-64"
        />
    );
}