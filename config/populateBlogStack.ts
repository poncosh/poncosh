import TechStack from "@/models/TechStack";

type StackView = {
  stack_used: string;
  color: string;
};

export async function populateBlogStacks(blogs: any[]): Promise<any[]> {
  const allStacks = await TechStack.findAll({
    attributes: ["id", "stack_used", "color"],
  });

  const stackMap = new Map<string, StackView>();
  for (const stack of allStacks) {
    stackMap.set(stack.id, {
      stack_used: stack.stack_used as string,
      color: stack.color as string,
    });
  }

  return blogs.map((blog) => {
    const rawIds: string[] = blog.blog_stack || [];
    const enrichedStacks = rawIds
      .map((id) => stackMap.get(id))
      .filter((s): s is StackView => !!s); // filter undefined

    return {
      ...blog.toJSON(), // penting biar bisa serialize
      blog_stack: enrichedStacks,
    };
  });
}
