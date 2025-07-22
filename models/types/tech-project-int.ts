export default interface TechProjectInt {
  id: string;
  project_name: string;
  project_description: string;
  project_stacks: Array<{
    stack_used: string;
    color: string;
  }>;
  project_portfolios: string[];
  link: string | null;
  roles: string[];
}
