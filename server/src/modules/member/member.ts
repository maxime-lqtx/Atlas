// interface pour la bdd
export interface IMember {
  projectId: number;
  userId: number;
  role: "admin" | "editor" | "viewer";
  joined_at: Date;
}

// interface pour afficher les info
export interface IMemberWithUser extends IMember {
  firstname: string;
  lastname: string;
  email: string;
}
