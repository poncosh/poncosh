import TechStack from "@/models/TechStack";
import TechStackType from "@/models/TechStackType";

const configTechStack = {
  TechStack,
  TechStackType,
};

// Panggil fungsi associate agar relasi aktif
Object.values(configTechStack).forEach((model: any) => {
  if (typeof model.associate === "function") {
    model.associate(configTechStack);
  }
});

export default configTechStack;
