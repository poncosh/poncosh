import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import sequelize from "@/config/database";

class SystemParameter extends Model<
  InferAttributes<SystemParameter>,
  InferCreationAttributes<SystemParameter>
> {
  declare id: number;
  declare name: string | null;
  declare value: string | null;
}

SystemParameter.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    value: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "SYSTEM_PARAMETERS",
    tableName: "SYSTEM_PARAMETERS",
    timestamps: false,
  }
);

export default SystemParameter;
