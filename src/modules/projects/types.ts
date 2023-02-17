export interface ProjectProps {
  name: string;
  key: string;
  created_at: number;
}

export interface ItemProps {
  text: string;
  added_at: number;
}

export interface GroupProps extends ProjectProps {
  key: string;
  id: number;
  items: ItemProps[];
}
