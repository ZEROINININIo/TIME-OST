
export type Language = 'zh-CN' | 'zh-TW' | 'en';

export interface Track {
  id: string;
  title: string;
  artist: string;
  sources: string[]; // Support fallback urls
  cover?: string; // Optional cover art or icon
  description?: Record<Language, string>;
}

export interface CharacterStats {
  strength: number;
  intelligence: number;
  agility: number;
  mental: number;
  resonance: number;
}

export interface CharacterTranslation {
  name: string;
  role: string;
  tags: string[];
  quote: string;
  description: string[];
}

export interface Character {
  id: string;
  alias?: string;
  themeColor?: string;
  stats: CharacterStats;
  translations: Record<Language, CharacterTranslation>;
}

export interface SideCharacterTranslation {
  name: string;
  enName: string;
  role: string;
  tags: string[];
  quote: string;
  description: string[];
}

export interface SideCharacterData {
  id: string;
  group: string;
  isLocked?: boolean;
  translations: Record<Language, SideCharacterTranslation>;
}

export interface ChapterTranslation {
  title: string;
  summary?: string;
  content: string;
}

export interface Chapter {
  id: string;
  date: string;
  status: 'published' | 'locked';
  translations: Record<Language, ChapterTranslation>;
}

export interface SideStoryVolume {
  id: string;
  title: string;
  titleEn: string;
  status: 'unlocked' | 'locked' | 'corrupted';
  chapters: Chapter[];
}

export interface LoreTranslation {
  title: string;
  content: string[];
}

export interface LoreEntry {
  id: string;
  category: string;
  translations: Record<Language, LoreTranslation>;
}

export interface NovelData {
  title: string;
  subtitle: string;
  intro: string;
  characters: Character[];
  lore: LoreEntry[];
  chapters: Chapter[];
}
