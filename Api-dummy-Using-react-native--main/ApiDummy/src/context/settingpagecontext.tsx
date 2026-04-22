import React, { createContext, useContext, useMemo, useState } from 'react';

export type ThemeSetting = 'light' | 'dark';
export type FontSizeSetting = 'sm' | 'md' | 'lg' | 'xl';
export type ContrastSetting = 'normal' | 'high';

export type AppSettings = {
  theme: ThemeSetting;
  fontSize: FontSizeSetting;
  contrastMode: ContrastSetting;
  reduceMotion: boolean;
  screenReader: boolean;
  focusIndicators: boolean;
  language: string;
  notifications: boolean;
  adaptiveControls: boolean;
};

export const defaultSettings: AppSettings = {
  theme: 'light',
  fontSize: 'md',
  contrastMode: 'normal',
  reduceMotion: false,
  screenReader: false,
  focusIndicators: true,
  language: 'en',
  notifications: true,
  adaptiveControls: true,
};

type SettingsContextValue = {
  settings: AppSettings;
  setSettings: React.Dispatch<React.SetStateAction<AppSettings>>;
  updateSetting: <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => void;
  resetSettings: () => void;
};

const SettingsContext = createContext<SettingsContextValue | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<AppSettings>(defaultSettings);

  const value = useMemo<SettingsContextValue>(
    () => ({
      settings,
      setSettings,
      updateSetting: (key, value) =>
        setSettings((prev) => ({ ...prev, [key]: value })),
      resetSettings: () => setSettings(defaultSettings),
    }),
    [settings]
  );

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export const useSettings = () => {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error('useSettings must be used inside <SettingsProvider>');
  return ctx;
};