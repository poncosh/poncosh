import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import sequelize from "@/config/database";

class TechProject extends Model<
  InferAttributes<TechProject>,
  InferCreationAttributes<TechProject>
> {
  declare id: string;
  declare project_name: string | null;
  declare project_description: string | null;
  declare project_stacks: string | null; // or a specific type if you know the structure
  declare project_portfolios: string[] | null;
}

TechProject.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    project_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    project_description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    project_stacks: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    project_portfolios: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "TECH_PROJECTS",
    tableName: "TECH_PROJECTS",
    timestamps: false,
  }
);

export default TechProject;
