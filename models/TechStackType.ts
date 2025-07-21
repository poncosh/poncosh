import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import sequelize from "@/config/database";

class TechStackType extends Model<
  InferAttributes<TechStackType>,
  InferCreationAttributes<TechStackType>
> {
  declare id: string;
  declare type: string | null;
  static associate(models: any) {
    TechStackType.hasMany(models.TechStack, {
      foreignKey: "type_id",
      sourceKey: "id",
    });
  }
}

TechStackType.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "TECH_STACK_TYPES",
    tableName: "TECH_STACK_TYPES",
    timestamps: false,
  }
);

export default TechStackType;
