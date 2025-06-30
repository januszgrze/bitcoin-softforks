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

const c3po: InfrastructureProject = {
    type: Type.Infrastructure,
    slug: "c3po",
    title: "C3PO",
    entityType: EntityType.GroupOp,
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
        "C3PO is a proposed soft fork that includes adding OP_CTV, OP_CAT, and OP_CSFS into bitcoin Script. These opcodes support a number of use cases for bitcoin application developers.",
    sections: [
        {
            id: "Components",
            title: "Components",
            content: [
                 {
                    title: ComponentTitles.OP_CAT,
                    content: ComponentTitles.OP_CAT,
                 },
                 {
                    title: ComponentTitles.OP_CHECKTEMPLATEVERIFY,
                    content: ComponentTitles.OP_CHECKTEMPLATEVERIFY,
                 },
                 {
                    title: ComponentTitles.OP_CHECKSIGFROMSTACK,
                    content: ComponentTitles.OP_CHECKSIGFROMSTACK,
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
                 {
                    title: PrimitivesTitles.SignAString,
                    content: PrimitivesTitles.SignAString,
                 },
                 {
                    title: PrimitivesTitles.SendAPrecommittedTransaction,
                    content: PrimitivesTitles.SendAPrecommittedTransaction,
                 },
            ],
        },
        {
            id: "applications",
            title: "Applications",
            content: [
                {
                    title: UseCasesTitles.BondContracts,
                    content: UseCasesTitles.BondContracts,
                },
                {
                    title: UseCasesTitles.BondedZeroconfPayments,
                    content: UseCasesTitles.BondedZeroconfPayments,
                },
                {
                    title: UseCasesTitles.CommitteelessBTCStaking,
                    content: UseCasesTitles.CommitteelessBTCStaking,
                },
                {
                    title: UseCasesTitles.CommitteelessBitVMBridge,
                    content: UseCasesTitles.CommitteelessBitVMBridge,
                },
                {
                    title: UseCasesTitles.LessInteractiveArk,
                    content: UseCasesTitles.LessInteractiveArk,
                },
                {
                    title: UseCasesTitles.LNSymmetry,
                    content: UseCasesTitles.LNSymmetry,
                },
                {
                    title: UseCasesTitles.MinerValidatedConvenantAttestedTokenProtocols,
                    content: UseCasesTitles.MinerValidatedConvenantAttestedTokenProtocols,
                },
                {
                    title: UseCasesTitles.NonInteractiveUTXOOrderbooks,
                    content: UseCasesTitles.NonInteractiveUTXOOrderbooks,
                },
                {
                    title: UseCasesTitles.PermissionlessOptimisticBridges,
                    content: UseCasesTitles.PermissionlessOptimisticBridges,
                },
                {
                    title: UseCasesTitles.Spacechains,
                    content: UseCasesTitles.Spacechains,
                },
                {
                    title: UseCasesTitles.TimeoutTrees,
                    content: UseCasesTitles.TimeoutTrees,
                },
                {
                    title: UseCasesTitles.TrustlessBridges,
                    content: UseCasesTitles.TrustlessBridges,
                },
                {
                    title: UseCasesTitles.Vaults,
                    content: UseCasesTitles.Vaults,
                },
                {
                    title: UseCasesTitles.ReduceDLCComputationCosts,
                    content: UseCasesTitles.ReduceDLCComputationCosts,
                },
                {
                    title: UseCasesTitles.ReduceBitVMAssertTransactionby90,
                    content: UseCasesTitles.ReduceBitVMAssertTransactionby90,
                },
                {
                    title: UseCasesTitles.CircleSTARKVerification,
                    content: UseCasesTitles.CircleSTARKVerification,
                },
                {
                    title: UseCasesTitles.WBTCProtocol,
                    content: UseCasesTitles.WBTCProtocol,
                },
                {
                    title: UseCasesTitles.NoncustodialMiningPayoutsWithASingleCoinbaseOutput,
                    content: UseCasesTitles.NoncustodialMiningPayoutsWithASingleCoinbaseOutput,
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
            id: "associatednetworks",
            title: "Associated Networks",
            content: [
                {
                    title: "The following networks would leverage this use case",
                    content: "starknet, base, optimism, bob, scroll, taiko, zksync",
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



export default c3po;