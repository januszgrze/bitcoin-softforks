import { InfrastructureProject } from "../content/props";

import opcatProject from "../content/infrastructures/opcat";
import opctvProject from "../content/infrastructures/opctv";
import lnSymmetryProject from "../content/infrastructures/ln-symmetry";

const opcat: InfrastructureProject = opcatProject;
const opctv: InfrastructureProject = opctvProject; 
const lnSymmetry: InfrastructureProject = lnSymmetryProject;

export const allOpcodes: InfrastructureProject[] = [opcat, opctv, lnSymmetry];

export const allOpcodesSlugs: string[] = allOpcodes.map(
    (infrastructure) => infrastructure.slug,
);