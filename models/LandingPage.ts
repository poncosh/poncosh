import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import sequelize from "@/config/database";

class LandingPage extends Model<
  InferAttributes<LandingPage>,
  InferCreationAttributes<LandingPage>
> {
  declare id: string;
  declare version: string | null;
  declare description: string | null;
  declare social_linkedin: string | null;
  declare social_medium: string | null;
  declare social_email: string | null;
  declare social_github: string | null;
  declare banner_pictures: string[] | null;
  declare quote: string | null;
  declare social_twitter: string | null;
}

LandingPage.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    version: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    social_linkedin: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    social_medium: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    social_email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    social_github: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    banner_pictures: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    quote: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    social_twitter: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "LANDING_PAGES",
    tableName: "LANDING_PAGES",
    timestamps: false,
  }
);

export default LandingPage;
