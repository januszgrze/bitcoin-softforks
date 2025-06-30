import { Component } from "lucide-react";
import { 
    ComponentTitles,
    PrimitivesTitles,
    UseCasesTitles, 
    UseCaseContent,
    SoftForkTitles
} from "../opcode-props";
import { Scripts } from "../opcode-script-props";
import {
    InfrastructureProject,
    Purpose,
    AssessmentCategory,
    Type,
    LiveStatus,
    EntityType,
    Notice,
    Site,
} from "../props";

const lnSymmetry: InfrastructureProject = {
    type: Type.Infrastructure,
    slug: "lnsymmetry",
    title: "LN-Symmetry",
    entityType: EntityType.UseCase,
    live: LiveStatus.BIP,
    staking: false,
    liquidStaking: false,
    bridge: false,
    underReview: true,
    riskFactors: ["", ""],
    nativeToken: "BTC",
    purpose: Purpose.EcashMint,
    associatedLayers: "Layer 1, Sidesystems, Alternative Networks",
    notice: undefined,
    bitcoinOnly: true,
    links: [
        {
            text: Site.Website,
            url: "https://github.com/sCrypt-Inc/awesome-op-cat",
        },
        {
            text: Site.Docs,
            url: "https://github.com/sCrypt-Inc/awesome-op-cat",
        },
        {
            text: Site.GitHub,
            url: "https://github.com/sCrypt-Inc/awesome-op-cat",
        },
        {
            text: Site.GitHub,
            url: "https://github.com/sCrypt-Inc/awesome-op-cat",
        },
    ],
    description:
        "OP_CAT is an opcode that was removed from bitcoin script. It's been proposed to be re-added into script. Its key feature is that it concatenates two data elements.",
    sections: [
        {
            id: "Softforks",
            title: "Soft Forks",
            content: [
                 {
                    title: SoftForkTitles.C3PO,
                    content: SoftForkTitles.C3PO,
                 },
            ],
        },
        {
            id: "throughputmultiple",
            title: "Throughput Multiple",
            content: [
                 {
                    title: "Placeholder text",
                    content: "Placeholder text",
                 },
            ],
        },
        {
            id: "associatednetworks",
            title: "Associated Networks",
            content: [
                {
                    title: "The following networks would leverage this use case",
                    content: "starknet, base, optimism, bob, scroll, taiko, zksync",
                },
            ],
        },
    ],
};



export default lnSymmetry;