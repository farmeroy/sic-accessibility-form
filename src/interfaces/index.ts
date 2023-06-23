export interface ISection {
  title: string;
  items: ListItem[];
  uuid: string;
  sectionScore: number;
}
export interface ListItem {
  content: string;
  label: string;
  checked: boolean;
  id: string;
  uuid: string;
}
