import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import sequelize from "@/config/database";

class Blog extends Model<InferAttributes<Blog>, InferCreationAttributes<Blog>> {
  declare id: string;
  declare blog_name: string | null;
  declare blog_image: string | null;
  declare blog_description: string | null;
  declare blog_stack: Record<string, any> | null; // adjust if you know the JSON structure
}

Blog.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    blog_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    blog_image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    blog_description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    blog_stack: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "BLOGS",
    tableName: "BLOGS",
    timestamps: false,
  }
);

export default Blog;
