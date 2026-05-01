import { Category } from '../models/models';
import { WritableSignal } from '@angular/core';

export const DEFAULT_OPTION = '---' as const;

export const ressources = {
  Revenus: [
    DEFAULT_OPTION,
    'Salaire',
    'Pension de retraite',
    "Pension d'invalidité",
    'Pension alimentaire',
    'Rente viagère',
    'Revenus locatifs',
  ] as const,
  Allocations: [
    DEFAULT_OPTION,
    'Allocation adulte handicapé',
    'Allocations familiales',
    'Allocation logement',
    'Allocation chômage',
    'Revenu de solidarité active',
    'Autres',
  ] as const,
  'Revenus mobiliers': [DEFAULT_OPTION, 'Revenus mobiliers'] as const,
  'Autres revenus': [
    DEFAULT_OPTION,
    "Vente d'un bien immobilier",
    "Vente d'un bien mobilier",
    'Remboursements (CPAM, Mutuelle)',
    'Autres',
  ] as const,
};
export type RessourcesKeys = keyof typeof ressources;

export const depenses = {
  'Dépenses de la vie courante': [
    DEFAULT_OPTION,
    'Habillement',
    'Alimentation',
    'Loisirs - vacances',
    'Frais médicaux',
    'Frais de scolarité',
    'Argent de poche',
    'Autres',
  ] as const,
  Logement: [
    DEFAULT_OPTION,
    'Loyer',
    "Frais d'hébergement",
    'Electricité',
    'Gaz',
    'Eau',
    'Téléphone',
  ] as const,
  'Frais de maintien à domicile': [
    DEFAULT_OPTION,
    'Aide ménagère',
    'Employé(e) de maison',
    'Autres',
  ] as const,
  "Frais d'assurance": [
    DEFAULT_OPTION,
    'Habitation',
    'Automobile',
    'Santé (ex: mutuelle)',
    'Autres',
  ] as const,
  'Impôts et taxes': [
    DEFAULT_OPTION,
    'Impôt sur les revenus',
    "Taxe d'habitation",
    'Taxe foncière',
    'Redevance télévision',
  ] as const,
  'Achats importants': [DEFAULT_OPTION, 'Immeuble', 'Automobile', 'Meuble', 'Autres'] as const,
  'Frais bancaires et pertes financières': [
    DEFAULT_OPTION,
    'Frais bancaires et pertes financières',
  ] as const,
  'Travaux divers et réparations': [
    DEFAULT_OPTION,
    "Travaux d'aménagement immobilier",
    "Réparations d'entretien",
    'Autres',
  ] as const,
  'Emprunts en cours': [DEFAULT_OPTION, 'Organisme prêteur', "Nature de l'emprunt"] as const,
  'Autres dépenses': [
    DEFAULT_OPTION,
    'Emoluments du gérant privé de la mesure de protection',
    'Autres',
  ] as const,
};
export type DepensesKeys = keyof typeof depenses;

export type Operation = {
  type: 'credit' | 'debit';
  id: string;
  edited: WritableSignal<boolean>;
  date: Date;
  label: string;
  label_: string;
  value: number;
  category: Category;
  comment: WritableSignal<string>;
};
export type Entity = {
  type: 'credit' | 'debit';
  edited: WritableSignal<boolean>;
  label: string;
  category: Category;
};
