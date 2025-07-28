import Blog from "@/models/Blog";
import { populateBlogStacks } from "@/config/populateBlogStack";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const pageRaw = searchParams.get("page");
  const pageNew = parseInt(pageRaw ?? "1") || 1;
  const pageSize = 5;
  const offset = (pageNew - 1) * pageSize;

  const result = await Blog.findAndCountAll({
    limit: pageSize,
    offset: offset,
    order: [["created_at", "DESC"]],
    attributes: { exclude: ["id"] },
  });

  const blogsWithStacks = await populateBlogStacks(result.rows);

  return new Response(
    JSON.stringify({
      data: blogsWithStacks,
      total: result.count,
      page: pageNew,
      pageSize,
      totalPages: Math.ceil(result.count / pageSize),
    }),
    { headers: { "Content-Type": "application/json" } }
  );
}
