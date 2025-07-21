export default interface TechStackInt {
  id: string;
  type: string;
  TECH_STACKs: Array<{
    id: string;
    type_id: string;
    stack_used: string;
    stack_picture: string;
    color: string;
  }>;
}
