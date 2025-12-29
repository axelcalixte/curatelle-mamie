import { Category } from '../models/models';
import { WritableSignal } from '@angular/core';

export const ressources = {
  Revenus: [
    'Salaire',
    'Pension de retraite',
    "Pension d'invalidité",
    'Pension alimentaire',
    'Rente viagère',
    'Revenus locatifs',
  ] as const,
  Allocations: [
    'Allocation adulte handicapé',
    'Allocations familiales',
    'Allocation logement',
    'Allocation chômage',
    'Revenu de solidarité active',
    'Autres',
  ] as const,
  'Revenus mobiliers': ['Revenus mobiliers'] as const,
  'Autres revenus': [
    "Vente d'un bien immobilier",
    "Vente d'un bien mobilier",
    'Remboursements (CPAM, Mutuelle)',
    'Autres',
  ] as const,
};
export type RessourcesKeys = keyof typeof ressources;

export const depenses = {
  'Dépenses de la vie courante': [
    'Habillement',
    'Alimentation',
    'Loisirs - vacances',
    'Frais médicaux',
    'Frais de scolarité',
    'Argent de poche',
    'Autres',
  ] as const,
  Logement: ['Loyer', "Frais d'hébergement", 'Electricité', 'Gaz', 'Eau', 'Téléphone'] as const,
  'Frais de maintien à domicile': ['Aide ménagère', 'Employé(e) de maison', 'Autres'] as const,
  "Frais d'assurance": ['Habitation', 'Automobile', 'Santé (ex: mutuelle)', 'Autres'] as const,
  'Impôts et taxes': [
    'Impôt sur les revenus',
    "Taxe d'habitation",
    'Taxe foncière',
    'Redevance télévision',
  ] as const,
  'Achats importants': ['Immeuble', 'Automobile', 'Meuble', 'Autres'] as const,
  'Frais bancaires et pertes financières': ['Frais bancaires et pertes financières'] as const,
  'Travaux divers et réparations': [
    "Travaux d'aménagement immobilier",
    "Réparations d'entretien",
    'Autres',
  ] as const,
  'Emprunts en cours': ['Organisme prêteur', "Nature de l'emprunt"] as const,
  'Autres dépenses': ['Emoluments du gérant privé de la mesure de protection', 'Autres'] as const,
};
export type DepensesKeys = keyof typeof depenses;

export type Operation = {
  type: 'credit' | 'debit';
  edited: WritableSignal<boolean>;
  date: Date;
  label: string;
  label_: string;
  value: number;
  category: Category;
};
export type Entity = {
  type: 'credit' | 'debit';
  edited: WritableSignal<boolean>;
  label: string;
  category: Category;
};
