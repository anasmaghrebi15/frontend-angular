export interface Tache {
  id: string;
  utilisateurId: string;
  titre: string;
  description: string;
  priorite: number; 
  dateEcheance?: Date;
  terminee: boolean;
  dateCreation: Date;
  dateModification: Date;
}

export interface DonneesFormulaireTache {
  titre: string;
  description: string;
  priorite: number;
  dateEcheance?: Date;
}