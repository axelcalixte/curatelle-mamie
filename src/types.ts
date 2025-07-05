export const Step = {
  "Categorize": 0,
  "Check": 1,
  "Save": 2
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

export type Autres = { [key: string]: number };

export const Revenus = {
  SALAIRE: "Salaire" as const,
  RETRAITE: "Pension de retraite" as const,
  INVALIDITE: "Pension d'invalidité" as const,
  ALIMENTAIRE: "Pension alimentaire" as const,
  RENTE: "Rente viagère" as const,
  LOCATIF: "Revenus locatifs" as const,
};

export const Allocations = {
  HANDICAPE: "Allocation adulte handicapé" as const,
  FAMILIALE: "Allocations familiales" as const,
  LOGEMENT: "Allocation logement" as const,
  CHOMAGE: "Allocation chômage" as const,
  RSA: "Revenu de solidarité active" as const,
  AUTRES: "Autres" as const,
};

export const RevenusMobiliers = {
  REVENUSMOBILIERS: "Revenus mobiliers" as const,
};

export const AutresRessources = {
  VENTEIMMOBILIER: "Vente d'un bien immobilier" as const,
  VENTEMOBILIER: "Vente d'un bien mobilier" as const,
  REMBOURSEMENTS: "Remboursements (CPAM, Mutuelle)" as const,
  AUTRES: "Autres" as const,
};

export const RessourcesNames = {
  revenus: "Revenus" as const,
  allocations: "Allocations" as const,
  mobiliers: "Revenus mobiliers" as const,
  autres: "Autres ressources" as const,
};

export type Ressource = "revenus" | "allocations" | "mobiliers" | "autres";

export type RessourcesT = Record<Ressource, string>;

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

export const DepensesVieCourante = {
  HABILLEMENT: "Habillement" as const,
  ALIMENTATION: "Alimentation" as const,
  VACANCES: "Loisirs - vacances" as const,
  MEDICAL: "Frais médicaux" as const,
  SCOLARITE: "Frais de scolarité" as const,
  POCHE: "Argent de poche" as const,
  AUTRES: "Autres" as const,
};

export const Logement = {
  LOYER: "Loyer" as const,
  HEBERGEMENT: "Frais d'hébergement" as const,
  ELECTRICITE: "Electricité" as const,
  GAZ: "Gaz" as const,
  EAU: "Eau" as const,
  TELEPHONE: "Téléphone" as const,
};

export const FraisAssurance = {
  HABITATION: "Habitation" as const,
  AUTOMOBILE: "Automobile" as const,
  MUTUELLE: "Santé (ex: mutuelle)" as const,
  AUTRES: "Autres" as const,
};

export const FraisMaintienDomicile = {
  MENAGERE: "Aide ménagère" as const,
  EMPLOYE: "Employé(e) de maison" as const,
  AUTRES: "Autres" as const,
};

export const ImpotsEtTaxes = {
  REVENUS: "Impôt sur les revenus" as const,
  HABITATION: "Taxe d'habitation" as const,
  FONCIERE: "Taxe foncière" as const,
  TELEVISION: "Redevance télévision" as const,
};

export const AchatsImportants = {
  IMMEUBLE: "Immeuble" as const,
  AUTOMOBILE: "Automobile" as const,
  MEUBLE: "Meuble" as const,
  AUTRES: "Autres" as const,
};

export const FraisBancairesEtPertesFinancieres = {
  FRAISBANCAIRES: "Frais bancaires et pertes financières" as const,
};

export const TravauxDiversEtReparation = {
  AMENAGEMENT: "Travaux d'aménagement immobilier" as const,
  REPARATIONS: "Réparations d'entretien" as const,
  AUTRES: "Autres" as const,
};

export const EmpruntsEnCours = {
  PRETEUR: "Organisme prêteur" as const,
  NATURE: "Nature de l'emprunt" as const,
};

export const AutresDepenses = {
  EMOLUMENTS: "Emoluments du gérant privé de la mesure de protection" as const,
  AUTRE: "Autres" as const,
};

export const DepensesNames = {
  DepensesVieCourante: "Dépenses de la vie courante" as const,
  Logement: "Logement" as const,
  FraisAssurance: "Frais d'assurance" as const,
  FraisMaintienDomicile: "Frais de maintien à domicile" as const,
  ImpotsEtTaxes: "Impôts et taxes" as const,
  AchatsImportants: "Achats importants" as const,
  FraisBancairesEtPertesFinancieres:
    "Frais bancaires et pertes financières" as const,
  TravauxDiversEtReparation: "Travaux divers et réparations" as const,
  EmpruntsEnCours: "Emprunts en cours" as const,
  AutresDepenses: "Autres dépenses" as const,
};

export type Depense =
  | "DepensesVieCourante"
  | "Logement"
  | "FraisAssurance"
  | "FraisMaintienDomicile"
  | "ImpotsEtTaxes"
  | "AchatsImportants"
  | "FraisBancairesEtPertesFinancieres"
  | "TravauxDiversEtReparation"
  | "EmpruntsEnCours"
  | "AutresDepenses";

export type DepensesT = Record<Depense, string>;

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
