export const Step = {
  Files: 0,
  Categorize: 1,
  Check: 2,
  Save: 3,
} as const;

export type CaisseEpargne = {
  "Date de comptabilisation": string;
  "Libelle simplifie": string;
  "Libelle operation": string;
  Reference: string | undefined;
  "Informations complementaires": string | undefined;
  "Type operation": string;
  Categorie: string;
  "Sous categorie": string;
  Debit: string | undefined;
  Credit: string | undefined;
  "Date operation": Date;
  "Date de valeur": Date;
  "Pointage operation": string;
};

export type Row = {
  date: Date;
  value: number;
  label: string;
  mainCategory: string | undefined;
  subCategory: string | undefined;
  edited: boolean;
};

export type TierT = {
  label: string;
  type: (typeof DebitOrCredit)[keyof typeof DebitOrCredit];
  mainCategory: string | undefined;
  subCategory: string | undefined;
  edited: boolean;
};

export const DebitOrCredit = {
  Debit: 0 as const,
  Credit: 1 as const,
};

export const ressources = {
  Revenus: [
    "Salaire",
    "Pension de retraite",
    "Pension d'invalidité",
    "Pension alimentaire",
    "Rente viagère",
    "Revenus locatifs",
  ] as const,
  Allocations: [
    "Allocation adulte handicapé",
    "Allocations familiales",
    "Allocation logement",
    "Allocation chômage",
    "Revenu de solidarité active",
    "Autres",
  ] as const,
  "Revenus mobiliers": ["Revenus mobiliers"] as const,
  "Autres revenus": [
    "Vente d'un bien immobilier",
    "Vente d'un bien mobilier",
    "Remboursements (CPAM, Mutuelle)",
    "Autres",
  ] as const,
};

export type RessourcesKeys = keyof typeof ressources;

export const depenses = {
  "Dépenses de la vie courante": [
    "Habillement",
    "Alimentation",
    "Loisirs - vacances",
    "Frais médicaux",
    "Frais de scolarité",
    "Argent de poche",
    "Autres",
  ] as const,
  Logement: [
    "Loyer",
    "Frais d'hébergement",
    "Electricité",
    "Gaz",
    "Eau",
    "Téléphone",
  ] as const,
  "Frais de maintien à domicile": [
    "Aide ménagère",
    "Employé(e) de maison",
    "Autres",
  ] as const,
  "Frais d'assurance": [
    "Habitation",
    "Automobile",
    "Santé (ex: mutuelle)",
    "Autres",
  ] as const,
  "Impôts et taxes": [
    "Impôt sur les revenus",
    "Taxe d'habitation",
    "Taxe foncière",
    "Redevance télévision",
  ] as const,
  "Achats importants": ["Immeuble", "Automobile", "Meuble", "Autres"] as const,
  "Frais bancaires et pertes financières": [
    "Frais bancaires et pertes financières",
  ] as const,
  "Travaux divers et réparations": [
    "Travaux d'aménagement immobilier",
    "Réparations d'entretien",
    "Autres",
  ] as const,
  "Emprunts en cours": ["Organisme prêteur", "Nature de l'emprunt"] as const,
  "Autres dépenses": [
    "Emoluments du gérant privé de la mesure de protection",
    "Autres",
  ] as const,
};
export type DepensesKeys = keyof typeof depenses;
// export type DepensesValues = (typeof depenses)[keyof typeof depenses]
