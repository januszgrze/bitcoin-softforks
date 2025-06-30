import { InfrastructureProject } from "../content/props";

// For now, keeping this empty since this is a bitcoin-softforks focused repo
// The main infrastructure content is in the opcode-focused files

export const allMore: InfrastructureProject[] = [];

export const allMoreSlugs: string[] = allMore.map(
    (infrastructure) => infrastructure.slug,
);
