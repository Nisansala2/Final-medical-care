// data.ts
import { Medicine, Category } from './type';

export const categories: Category[] = [
  { id: 'rare', name: 'Rare Diseases', icon: '🧬', count: 245 },
  { id: 'oncology', name: 'Oncology', icon: '🎗️', count: 189 },
  { id: 'orphan', name: 'Orphan Drugs', icon: '💊', count: 156 },
  { id: 'specialty', name: 'Specialty Meds', icon: '⚕️', count: 312 },
  { id: 'imported', name: 'Imported Drugs', icon: '🌍', count: 78 },
  { id: 'compounded', name: 'Compounded', icon: '🧪', count: 134 }
];

export const featuredMedicines: Medicine[] = [
  {
    id: 1,
    name: 'Kalydeco (Ivacaftor)',
    category: 'Rare Diseases',
    price: '₹2,45,000',
    originalPrice: '₹2,80,000',
    image: '🧬',
    rating: 4.8,
    reviews: 24,
    availability: 'In Stock',
    description: 'For Cystic Fibrosis (G551D mutation)',
    prescription: true,
    rare: true,
    keywords: ['kalydeco', 'ivacaftor', 'cystic fibrosis', 'rare disease', 'lung', 'genetic']
  },
  {
    id: 2,
    name: 'Spinraza (Nusinersen)',
    category: 'Orphan Drugs',
    price: '₹15,50,000',
    originalPrice: '₹16,00,000',
    image: '💉',
    rating: 4.9,
    reviews: 18,
    availability: 'Limited Stock',
    description: 'For Spinal Muscular Atrophy',
    prescription: true,
    rare: true,
    keywords: ['spinraza', 'nusinersen', 'spinal muscular atrophy', 'sma', 'muscle', 'genetic']
  },
  {
    id: 3,
    name: 'Zolgensma (Onasemnogene)',
    category: 'Gene Therapy',
    price: 'On Request',
    originalPrice: '',
    image: '🧪',
    rating: 5.0,
    reviews: 12,
    availability: 'Special Order',
    description: 'Gene therapy for SMA',
    prescription: true,
    rare: true,
    keywords: ['zolgensma', 'onasemnogene', 'gene therapy', 'sma', 'genetic', 'therapy']
  },
  {
    id: 4,
    name: 'Keytruda (Pembrolizumab)',
    category: 'Oncology',
    price: '₹1,85,000',
    originalPrice: '₹2,10,000',
    image: '🎗️',
    rating: 4.7,
    reviews: 45,
    availability: 'In Stock',
    description: 'Immunotherapy for various cancers',
    prescription: true,
    rare: false,
    keywords: ['keytruda', 'pembrolizumab', 'cancer', 'immunotherapy', 'oncology', 'tumor']
  },
  {
    id: 5,
    name: 'Soliris (Eculizumab)',
    category: 'Rare Diseases',
    price: '₹3,20,000',
    originalPrice: '₹3,50,000',
    image: '🔬',
    rating: 4.6,
    reviews: 31,
    availability: 'In Stock',
    description: 'For Paroxysmal Nocturnal Hemoglobinuria',
    prescription: true,
    rare: true,
    keywords: ['soliris', 'eculizumab', 'pnh', 'hemoglobinuria', 'blood disorder', 'complement']
  },
  {
    id: 6,
    name: 'Replagal (Agalsidase alfa)',
    category: 'Orphan Drugs',
    price: '₹1,95,000',
    originalPrice: '₹2,15,000',
    image: '🧬',
    rating: 4.5,
    reviews: 28,
    availability: 'Limited Stock',
    description: 'For Fabry Disease',
    prescription: true,
    rare: true,
    keywords: ['replagal', 'agalsidase', 'fabry disease', 'enzyme replacement', 'genetic']
  },
  {
    id: 7,
    name: 'Cerdelga (Eliglustat)',
    category: 'Rare Diseases',
    price: '₹4,50,000',
    originalPrice: '₹4,80,000',
    image: '💊',
    rating: 4.7,
    reviews: 22,
    availability: 'In Stock',
    description: 'For Gaucher Disease Type 1',
    prescription: true,
    rare: true,
    keywords: ['cerdelga', 'eliglustat', 'gaucher disease', 'genetic disorder', 'enzyme']
  },
  {
    id: 8,
    name: 'Opdivo (Nivolumab)',
    category: 'Oncology',
    price: '₹2,10,000',
    originalPrice: '₹2,35,000',
    image: '🎗️',
    rating: 4.8,
    reviews: 67,
    availability: 'In Stock',
    description: 'Immunotherapy for melanoma, lung cancer',
    prescription: true,
    rare: false,
    keywords: ['opdivo', 'nivolumab', 'cancer', 'melanoma', 'lung cancer', 'immunotherapy']
  }
];