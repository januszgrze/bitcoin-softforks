import { InfrastructureProject } from "../content/props";

import opcatProject from "../content/infrastructures/opcat";
import opctvProject from "../content/infrastructures/opctv";
import lnSymmetryProject from "../content/infrastructures/ln-symmetry";
import c3poProject from "../content/infrastructures/c3po";

const opcat: InfrastructureProject = opcatProject;
const opctv: InfrastructureProject = opctvProject; 
const lnSymmetry: InfrastructureProject = lnSymmetryProject;
const c3po: InfrastructureProject = c3poProject;

export const allOpcodes: InfrastructureProject[] = [opcat, opctv, lnSymmetry, c3po];

export const allOpcodesSlugs: string[] = allOpcodes.map(
    (infrastructure) => infrastructure.slug,
);