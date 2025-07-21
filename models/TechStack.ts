import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  ForeignKey,
} from "sequelize";
import sequelize from "@/config/database";
import TechStackType from "./TechStackType";

class TechStack extends Model<
  InferAttributes<TechStack>,
  InferCreationAttributes<TechStack>
> {
  declare id: string;
  declare type_id: ForeignKey<TechStackType["id"]> | null;
  declare stack_used: string | null;
  declare stack_picture: string | null;
  declare color: string | null;
  static associate(models: any) {
    TechStack.belongsTo(models.TechStackType, {
      foreignKey: "type_id",
      targetKey: "id",
    });
  }
}

TechStack.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    type_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: TechStackType,
        key: "id",
      },
    },
    stack_used: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    stack_picture: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "TECH_STACKS",
    tableName: "TECH_STACKS",
    timestamps: false,
  }
);

export default TechStack;
