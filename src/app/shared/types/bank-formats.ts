export type CaisseEpargne = {
  'Date de comptabilisation': string;
  'Libelle simplifie': string;
  'Libelle operation': string;
  Reference: string | undefined;
  'Informations complementaires': string | undefined;
  'Type operation': string;
  Categorie: string;
  'Sous categorie': string;
  Debit: string;
  Credit: string;
  'Date operation': Date;
  'Date de valeur': Date;
  'Pointage operation': string;
};
