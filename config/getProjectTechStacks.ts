import TechProject from "@/models/TechProject";
import TechStack from "@/models/TechStack";

/**
 * Mendapatkan list TechStack yang ID-nya terdapat di dalam project_stacks
 * @param projectInstance Instance dari TechProject
 */
export async function getProjectTechStacks(projectInstance: TechProject) {
  if (
    !projectInstance.project_stacks ||
    projectInstance.project_stacks.length === 0
  ) {
    return [];
  }

  const stacks = await TechStack.findAll({
    where: {
      id: projectInstance.project_stacks, // pakai array langsung di `where`
    },
    attributes: ["stack_used", "color"],
  });

  return stacks;
}
