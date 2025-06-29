// =============================================================================
// OPCODE-SPECIFIC CONTENT PROPS
// =============================================================================

// Primitives
export enum PrimitivesTitles {
    Build_The_CTV_Template_Hash_From_The_Stack = "Build The CTV Template Hash From The Stack",
    CommitToTwoStrings = "Commit To Two Strings",
    ConcatenateTwoStrings = "Concatenate Two Strings",
    GenericIntrospection = "Generic Introspection",
    HalfAggregationOfBIP340Signature = "Half Aggregation Of BIP340 Signature",
    IntrospectOutputAmounts = "Introspect Output Amounts",
    MultiStepTransaction = "Multi-step Transactiosn",
    PermissionlessFraudProofs = "Permissionless Fraud Proofs",
    PushTheTaprootInternalKeyOnTheStack = "Push The Taproot Internal Key On The Stack",
    ReplaceableStateInL2s = "Replaceable State In L2s",
    SendAPrecommittedTransaction = "Send A Precommitted Transaction",
    SignAString = "Sign A String",
    StateCarryingUTXOs = "State-carrying UTXOs",
    VectorCommitments = "Vector Commitments",
}

export enum UseCasesTitles {
    BondContracts = "Bond Contracts",
    BondedZeroconfPayments = "Bonded Zeroconf Payments",
    ChannelFactories = "Channel Factories",
    CircleSTARKVerification = "CircleSTARK Verification",
    Coinpools = "Coinpools",
    CommitteelessBitVMBridge = "Committeeless BitVM Bridge",
    CommitteelessBTCStaking = "Committeeless BTC Staking",
    Drivechains = "Drivechains",
    HashrateEscrows = "Hashrate Escrows",
    LessInteractiveArk = "Less Interactive Ark",
    LNSymmetry = "LN-Symmetry",
    MinerValidatedConvenantAttestedTokenProtocols = "Miner Validated Convenant Attested Token Protocols",
    NonInteractiveUTXOOrderbooks = "Non-Interactive UTXO Orderbooks",
    NoncustodialMiningPayoutsWithASingleCoinbaseOutput = "Noncustodial Mining Payouts With A Single Coinbase Output",
    PermissionlessOptimisticBridges = "Permissionless Optimistic Bridges",
    ReduceBitVMAssertTransactionby90 = "Reduce BitVM Assert Transaction by 90%",
    ReduceDLCComputationCosts = "Reduce DLC Computation Costs",
    Spacechains = "Spacechains",
    TimeoutTrees = "Timeout Trees",
    TransferableDLCs = "Transferable DLCs",
    TreeSignatures = "Tree Signatures",
    TrustlessBridges = "Trustless Bridges",
    VaultThatCanCombineAnyAmountUTXOsForWithdrawal = "Vault That Can Combine Any Amount UTXOs For Withdrawal",
    VaultWithEndogenousWithdrawalMiningFee = "Vault With Endogenous Withdrawal Mining Fee",
    VaultWithPartialWithdrawals = "Vault With Partial Withdrawals",
    Vaults = "Vaults",
    WBTCProtocol = "WBTC Protocol",
}

export enum UseCaseContent {
    STARKVERIFIER = "An issue that arises from shared UTXOs, specifically for L2s, is that you need a trusted party to verify offchain state transitions to enable users to withdraw funds relative to their updated balance. The StarkWare team (lead developers of Starknet) are working with L2 Iterative Ventures on developing a STARK verifier directly in Bitcoin Script with OP_CAT.\n\nIn rollups, state differences are compressed together and sent to the Bitcoin L1 with a corresponding validity proof proving that the state transition was executed correctly. Starknet are proposing a mechanism that would verify these STARK proofs proving the validity of L2 state transitions. By verifying offchain state transitions directly in Script, shared UTXOs would be able to process user withdrawals based on their updated balances. Recursive covenants and onchain STARK verification would create trust-minimized bridge programs for L2s.",
}

export enum ComponentTitles {
    BlindMergeMining = "Blind Merge Mining",
    OP2DIV = "OP_2DIV",
    OP_2MUL = "OP_2MUL",
    OP_2SUB = "OP_2SUB",
    OP_AMOUNT = "OP_AMOUNT",
    OP_AND = "OP_AND",
    OP_CAT = "OP_CAT",
    OP_CHECKCONTRACTVERIFY = "OP_CHECKCONTRACTVERIFY",
    OP_CHECKSIGFROMSTACK = "OP_CHECKSIGFROMSTACK",
    OP_CHECKTEMPLATEVERIFY = "OP_CHECKTEMPLATEVERIFY",
    OP_CHECKTXHASHVERIFY = "OP_CHECKTXHASHVERIFY",
    OP_DIV = "OP_DIV",
    OP_DOWNSHIFT = "OP_DOWNSHIFT",
    OP_DRIVECHAIN = "OP_DRIVECHAIN",
    OP_INPUTAMOUNTS = "OP_INPUTAMOUNTS",
    OP_INTERNALKEY = "OP_INTERNALKEY",
    OP_INVERT = "OP_INVERT",
    OP_LEFT = "OP_LEFT",
    OP_MOD = "OP_MOD",
    OP_MUL = "OP_MUL",
    OP_OR = "OP_OR",
    OP_PAIRCOMMIT = "OP_PAIRCOMMIT",
    OP_RIGHT = "OP_RIGHT",
    OP_SUBSTR = "OP_SUBSTR",
    OP_TEMPLATEHASH = "OP_TEMPLATEHASH",
    OP_TWEAKADD = "OP_TWEAKADD",
    OP_TXHASH = "OP_TXHASH",
    OP_UPSHIFT = "OP_UPSHIFT",
    OP_VAULT = "OP_VAULT",
    OP_VAULT_RECOVER = "OP_VAULT_RECOVER",
    OP_XOR = "OP_XOR",
    SIGHASH_ANYPREVOUT = "SIGHASH_ANYPREVOUT",
    SIGHASH_ANYPREVOUTANYSCRIPT = "SIGHASH_ANYPREVOUTANYSCRIPT",
    VarposBudget = "Varpos Budget",
}


export interface Link {
    text: string;
    url: string;
}

export interface SectionContent {
    title: string;
    content: string;
}

export interface OpcodeSection {
    id: string;
    title: string;
    content: SectionContent[];
}

// Opcode-specific enums and types
export enum OpcodeStatus {
    PROPOSED = "Proposed",
    BIP_DRAFTED = "Bip Drafted", 
    ACTIVATION_CLIENT = "Activation Client",
    REJECTED = "Rejected",
    WITHDRAWN = "Withdrawn"
}

export enum OpcodeType {
    SINGLE_OPCODE = "Single Opcode",
    GROUP_OPCODES = "Group of Opcodes",
    SIGNATURE_HASH = "Signature Hash",
    SCRIPT_UPGRADE = "Script Upgrade"
}

export enum BIPStatus {
    DRAFT = "Draft",
    PROPOSED = "Proposed", 
    FINAL = "Final",
    ACTIVE = "Active",
    REJECTED = "Rejected",
    WITHDRAWN = "Withdrawn",
    DEFERRED = "Deferred"
}

export enum OpcodePurpose {
    COVENANTS = "Covenants",
    INTROSPECTION = "Introspection", 
    ARITHMETIC = "Arithmetic",
    CRYPTOGRAPHY = "Cryptography",
    VAULT = "Vault",
    SCALING = "Scaling",
    PRIVACY = "Privacy",
    GENERAL = "General"
}

export interface TechnicalSpecs {
    bipNumber?: number;
    bipStatus?: BIPStatus;
    activationMethod?: string;
    codeExample?: string;
    scriptSize?: string;
    gasComplexity?: string;
    backwards_compatible?: boolean;
}

export interface UseCaseExample {
    title: string;
    description: string;
    codeExample?: string;
    benefits: string[];
    limitations?: string[];
}

export interface DeveloperSentiment {
    totalResponses: number;
    strongSupport: number;
    acceptable: number;
    needsWork: number;
    weakSupport: number;
    underReview: number;
    oppose: number;
    insufficient: number;
    lastUpdated?: string;
}

export interface StakeholderImpact {
    miners?: string;
    developers?: string;
    users?: string;
    exchanges?: string;
    businesses?: string;
}

export interface SecurityConsiderations {
    riskLevel: "Low" | "Medium" | "High";
    concerns: string[];
    mitigations: string[];
    auditStatus?: string;
}

export interface NetworkSupport {
    testingNetworks: string[];
    signalingSupport: string[];
    implementations: string[];
}

// Main Opcode Project interface
export interface OpcodeProject {
    // Basic Info
    slug: string;
    title: string;
    description: string;
    opcodeType: OpcodeType;
    purpose: OpcodePurpose[];
    
    // Status & Development
    status: OpcodeStatus;
    technicalSpecs: TechnicalSpecs;
    
    // Content Sections
    sections: OpcodeSection[];
    useCases: UseCaseExample[];
    
    // Community & Support
    developerSentiment?: DeveloperSentiment;
    stakeholderImpact?: StakeholderImpact;
    networkSupport?: NetworkSupport;
    
    // Security & Risks
    securityConsiderations: SecurityConsiderations;
    
    // External Links
    links: Link[];
    
    // Metadata
    lastUpdated: string;
    tags?: string[];
    relatedOpcodes?: string[];
    
    // Display Options
    featured?: boolean;
    underReview?: boolean;
    bitcoinOnly: boolean;
}

// Standard section IDs for consistency
export const STANDARD_SECTIONS = {
    OVERVIEW: "overview",
    USE_CASES: "use-cases", 
    TECHNICAL_SPECS: "technical-specs",
    SCRIPT_FUNCTIONALITY: "script-functionality",
    SECURITY: "security",
    IMPLEMENTATION: "implementation",
    STAKEHOLDER_RESOURCES: "stakeholder-resources",
    HISTORY: "history"
} as const;

// Standard purposes
export const PURPOSES = {
    COVENANTS: "Enable covenant functionality for Bitcoin",
    INTROSPECTION: "Allow scripts to examine transaction details",
    ARITHMETIC: "Enhance arithmetic operations in script", 
    CRYPTOGRAPHY: "Add cryptographic primitives",
    VAULT: "Enable vault-like custody solutions",
    SCALING: "Improve Bitcoin's scalability",
    PRIVACY: "Enhance transaction privacy",
    GENERAL: "General script improvements"
} as const; 