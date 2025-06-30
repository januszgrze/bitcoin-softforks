import { InfrastructureProject } from "../content/props";

// Import only the infrastructure files that exist in this repo
import opcatProject from "../content/infrastructures/opcat";
import opctvProject from "../content/infrastructures/opctv";
import lnSymmetryProject from "../content/infrastructures/ln-symmetry";
import c3poProject from "../content/infrastructures/c3po";

// Create the infrastructure objects
const opcat: InfrastructureProject = opcatProject;
const opctv: InfrastructureProject = opctvProject;
const lnSymmetry: InfrastructureProject = lnSymmetryProject;
const c3po: InfrastructureProject = c3poProject;

// Export all available infrastructures
export const allInfrastructures: InfrastructureProject[] = [
    opcat,
    opctv,
    lnSymmetry,
    c3po,
];

export const allInfrastructureSlugs: string[] = allInfrastructures.map(
    (infrastructure) => infrastructure.slug,
);
