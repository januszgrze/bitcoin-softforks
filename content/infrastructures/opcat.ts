import { Component } from "lucide-react";
import { 
    ComponentTitles,
    PrimitivesTitles,
    UseCasesTitles, 
    UseCaseContent,
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

const opcat: InfrastructureProject = {
    type: Type.Infrastructure,
    slug: "opcat",
    title: "OP_CAT",
    entityType: EntityType.SingleOp,
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
            id: "Components",
            title: "Components",
            content: [
                 {
                    title: ComponentTitles.OP_CAT,
                    content: ComponentTitles.OP_CAT,
                 },
            ],
        },
        {
            id: "Primitive",
            title: "Primitives",
            content: [
                 {
                    title: PrimitivesTitles.ConcatenateTwoStrings,
                    content: PrimitivesTitles.ConcatenateTwoStrings,
                 },
                 {
                    title: PrimitivesTitles.VectorCommitments,
                    content: PrimitivesTitles.VectorCommitments,
                 },
                 {
                    title: PrimitivesTitles.CommitToTwoStrings,
                    content: PrimitivesTitles.CommitToTwoStrings,
                 },
            ],
        },
        {
            id: "applications",
            title: "Applications",
            content: [
                {
                    title: "Placeholder text",
                    content: "Placeholder text",
                 },
            ],
        },
        {
            id: "Techanalysis",
            title: "Tech Analysis",
            content: [
                 {
                    title: "Placeholder text",
                    content: "Placeholder text",
                 },
            ],
        },
        {
            id: "script-functionality",
            title: "Script Functionality",
            content: [
                {
                    title: "Example SNARK verifier",
                    content: Scripts.STARKVERIFIERCAT,
                },
            ],
        },
        {
            id: "stakeholderresources",
            title: "Stakeholder Resources",
            content: [
                {
                    title: "Learn how OP_CAT impacts you",
                    content:
                        "Each softfork proposal impacts different stakeholders differently. Check out the resources below to learn this proposal would impact you.",
                },
            ],
        },
    ],
};



export default opcat;