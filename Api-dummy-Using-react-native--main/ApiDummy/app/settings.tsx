import React, { useMemo, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';

import { useSettings } from '../src/context/settingpagecontext';
import { fontSizeMap } from '@/constants/theme';

type Theme = 'light' | 'dark';
type FontSize = 'sm' | 'md' | 'lg' | 'xl';
type ContrastMode = 'normal' | 'high';
type TabKey = 'general' | 'accessibility';

export default function SettingsMenu() {
  const { settings, updateSetting, resetSettings } = useSettings();
  const [activeTab, setActiveTab] = useState<TabKey>('general');
  const [saved, setSaved] = useState(false);

  const textSize = fontSizeMap[settings.fontSize as FontSize] ?? fontSizeMap.md;
  const isDark = settings.theme === 'dark';

  const ios = {
    background: isDark ? '#000000' : '#F2F2F7',
    card: isDark ? '#1C1C1E' : '#FFFFFF',
    groupedCard: isDark ? '#1C1C1E' : '#FFFFFF',
    separator: isDark ? '#38383A' : '#C6C6C8',
    label: isDark ? '#FFFFFF' : '#000000',
    secondaryLabel: isDark ? '#8E8E93' : '#6D6D72',
    tertiaryFill: isDark ? '#2C2C2E' : '#E9E9ED',
    accent: '#007AFF',
    destructive: '#FF3B30',
  };

  const styles = useMemo(
    () =>
      StyleSheet.create({
        root: {
          flex: 1,
          backgroundColor: ios.background,
        },
        content: {
          paddingBottom: 40,
        },
        navHeader: {
          paddingHorizontal: 20,
          paddingTop: 18,
          paddingBottom: 12,
          backgroundColor: ios.background,
        },
        navTitle: {
          fontSize: 34,
          fontWeight: '700',
          color: ios.label,
          letterSpacing: -0.6,
        },
        navSubtitle: {
          marginTop: 4,
          fontSize: 15,
          color: ios.secondaryLabel,
        },
        segmentedWrap: {
          marginHorizontal: 16,
          marginTop: 10,
          marginBottom: 22,
          backgroundColor: ios.tertiaryFill,
          borderRadius: 10,
          padding: 2,
          flexDirection: 'row',
        },
        segmentedButton: {
          flex: 1,
          paddingVertical: 8,
          borderRadius: 8,
        },
        segmentedButtonActive: {
          backgroundColor: ios.card,
        },
        segmentedText: {
          textAlign: 'center',
          fontSize: 13,
          fontWeight: '600',
          color: ios.secondaryLabel,
        },
        segmentedTextActive: {
          color: ios.label,
        },
        sectionHeader: {
          paddingHorizontal: 20,
          paddingBottom: 6,
          paddingTop: 8,
        },
        sectionHeaderText: {
          fontSize: 13,
          fontWeight: '600',
          color: ios.secondaryLabel,
          textTransform: 'uppercase',
        },
        group: {
          marginHorizontal: 16,
          marginBottom: 28,
          backgroundColor: ios.groupedCard,
          borderRadius: 14,
          overflow: 'hidden',
        },
        row: {
          minHeight: 50,
          paddingHorizontal: 16,
          paddingVertical: 12,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: ios.groupedCard,
        },
        rowLeft: {
          flex: 1,
          paddingRight: 12,
        },
        rowTitle: {
          fontSize: textSize,
          color: ios.label,
        },
        rowDescription: {
          marginTop: 2,
          fontSize: Math.max(12, textSize - 2),
          color: ios.secondaryLabel,
        },
        separatorInset: {
          height: StyleSheet.hairlineWidth,
          backgroundColor: ios.separator,
          marginLeft: 16,
        },
        inlineChoices: {
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: 8,
          marginTop: 10,
        },
        chip: {
          paddingHorizontal: 12,
          paddingVertical: 7,
          borderRadius: 999,
          backgroundColor: ios.tertiaryFill,
        },
        chipActive: {
          backgroundColor: ios.accent,
        },
        chipText: {
          fontSize: 13,
          fontWeight: '600',
          color: ios.label,
        },
        chipTextActive: {
          color: '#FFFFFF',
        },
        infoText: {
          marginHorizontal: 20,
          marginTop: -18,
          marginBottom: 20,
          fontSize: 13,
          color: ios.secondaryLabel,
          lineHeight: 18,
        },
        footerArea: {
          marginHorizontal: 16,
          gap: 12,
        },
        actionButton: {
          minHeight: 50,
          borderRadius: 14,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: ios.card,
        },
        actionButtonPrimary: {
          backgroundColor: ios.accent,
        },
        actionButtonDestructive: {
          backgroundColor: ios.card,
        },
        actionText: {
          fontSize: textSize,
          fontWeight: '600',
          color: ios.label,
        },
        actionTextPrimary: {
          color: '#FFFFFF',
        },
        actionTextDestructive: {
          color: ios.destructive,
        },
        savedText: {
          textAlign: 'center',
          fontSize: 13,
          color: ios.secondaryLabel,
        },
      }),
    [
      ios.background,
      ios.card,
      ios.groupedCard,
      ios.separator,
      ios.label,
      ios.secondaryLabel,
      ios.tertiaryFill,
      textSize,
    ]
  );

  const saveFeedback = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const renderChoiceChips = (
    values: string[],
    currentValue: string,
    onSelect: (value: string) => void,
    labels?: Record<string, string>
  ) => (
    <View style={styles.inlineChoices}>
      {values.map((value) => {
        const selected = currentValue === value;
        return (
          <Pressable
            key={value}
            style={[styles.chip, selected && styles.chipActive]}
            onPress={() => onSelect(value)}>
            <Text style={[styles.chipText, selected && styles.chipTextActive]}>
              {labels?.[value] ?? value}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );

  const GeneralSection = () => (
    <>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionHeaderText}>Appearance</Text>
      </View>

      <View style={styles.group}>
        <View style={styles.row}>
          <View style={styles.rowLeft}>
            <Text style={styles.rowTitle}>Theme</Text>
            {renderChoiceChips(
              ['light', 'dark'],
              settings.theme,
              (value) => updateSetting('theme', value as Theme),
              { light: 'Light', dark: 'Dark' }
            )}
          </View>
        </View>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionHeaderText}>Preferences</Text>
      </View>

      <View style={styles.group}>
        <View style={styles.row}>
          <View style={styles.rowLeft}>
            <Text style={styles.rowTitle}>Notifications</Text>
            <Text style={styles.rowDescription}>
              Allow alerts and updates from the app
            </Text>
          </View>
          <Switch
            value={!!settings.notifications}
            onValueChange={(value) => updateSetting('notifications', value)}
          />
        </View>
      </View>
    </>
  );

  const AccessibilitySection = () => (
    <>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionHeaderText}>Vision</Text>
      </View>

      <View style={styles.group}>
        <View style={styles.row}>
          <View style={styles.rowLeft}>
            <Text style={styles.rowTitle}>Text Size</Text>
            <Text style={styles.rowDescription}>
              Adjust text across the app for easier reading
            </Text>
            {renderChoiceChips(
              ['sm', 'md', 'lg', 'xl'],
              settings.fontSize,
              (value) => updateSetting('fontSize', value as FontSize),
              { sm: 'Small', md: 'Medium', lg: 'Large', xl: 'Extra Large' }
            )}
          </View>
        </View>

        <View style={styles.separatorInset} />

        <View style={styles.row}>
          <View style={styles.rowLeft}>
            <Text style={styles.rowTitle}>Increase Contrast</Text>
            <Text style={styles.rowDescription}>
              Improve color separation between interface elements
            </Text>
            {renderChoiceChips(
              ['normal', 'high'],
              settings.contrastMode,
              (value) => updateSetting('contrastMode', value as ContrastMode),
              { normal: 'Off', high: 'On' }
            )}
          </View>
        </View>

        <View style={styles.separatorInset} />

        <View style={styles.row}>
          <View style={styles.rowLeft}>
            <Text style={styles.rowTitle}>Focus Indicators</Text>
            <Text style={styles.rowDescription}>
              Make focused and selected items easier to identify
            </Text>
          </View>
          <Switch
            value={!!settings.focusIndicators}
            onValueChange={(value) => updateSetting('focusIndicators', value)}
          />
        </View>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionHeaderText}>Mobility</Text>
      </View>

      <View style={styles.group}>
        <View style={styles.row}>
          <View style={styles.rowLeft}>
            <Text style={styles.rowTitle}>Reduce Motion</Text>
            <Text style={styles.rowDescription}>
              Reduce animations and motion effects throughout the app
            </Text>
          </View>
          <Switch
            value={!!settings.reduceMotion}
            onValueChange={(value) => updateSetting('reduceMotion', value)}
          />
        </View>

        <View style={styles.separatorInset} />

        <View style={styles.row}>
          <View style={styles.rowLeft}>
            <Text style={styles.rowTitle}>Larger Touch Targets</Text>
            <Text style={styles.rowDescription}>
              Increase control touch areas for easier interaction
            </Text>
          </View>
          <Switch
            value={!!settings.adaptiveControls}
            onValueChange={(value) => updateSetting('adaptiveControls', value)}
          />
        </View>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionHeaderText}>Hearing</Text>
      </View>

      <View style={styles.group}>
        <View style={styles.row}>
          <View style={styles.rowLeft}>
            <Text style={styles.rowTitle}>No Hearing Settings Yet</Text>
            <Text style={styles.rowDescription}>
              Add options here later such as captions, sound balance, or visual
              alerts
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionHeaderText}>Speech</Text>
      </View>

      <View style={styles.group}>
        <View style={styles.row}>
          <View style={styles.rowLeft}>
            <Text style={styles.rowTitle}>Screen Reader Support</Text>
            <Text style={styles.rowDescription}>
              Improve labels, announcements, and navigation for spoken feedback
              tools
            </Text>
          </View>
          <Switch
            value={!!settings.screenReader}
            onValueChange={(value) => updateSetting('screenReader', value)}
          />
        </View>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionHeaderText}>Cognitive</Text>
      </View>

      <View style={styles.group}>
        <View style={styles.row}>
          <View style={styles.rowLeft}>
            <Text style={styles.rowTitle}>No Cognitive Settings Yet</Text>
            <Text style={styles.rowDescription}>
              Add options here later such as simplified layouts, reading aids,
              or reduced distractions
            </Text>
          </View>
        </View>
      </View>
    </>
  );

  return (
    <ScrollView style={styles.root} contentContainerStyle={styles.content}>
      <View style={styles.navHeader}>
        <Text style={styles.navTitle}>Settings</Text>
        <Text style={styles.navSubtitle}>
          Manage how the app looks and behaves.
        </Text>
      </View>

      <View style={styles.segmentedWrap}>
        <Pressable
          style={[
            styles.segmentedButton,
            activeTab === 'general' && styles.segmentedButtonActive,
          ]}
          onPress={() => setActiveTab('general')}>
          <Text
            style={[
              styles.segmentedText,
              activeTab === 'general' && styles.segmentedTextActive,
            ]}>
            General
          </Text>
        </Pressable>

        <Pressable
          style={[
            styles.segmentedButton,
            activeTab === 'accessibility' && styles.segmentedButtonActive,
          ]}
          onPress={() => setActiveTab('accessibility')}>
          <Text
            style={[
              styles.segmentedText,
              activeTab === 'accessibility' && styles.segmentedTextActive,
            ]}>
            Accessibility
          </Text>
        </Pressable>
      </View>

      {activeTab === 'general' ? <GeneralSection /> : <AccessibilitySection />}

      <Text style={styles.infoText}>
        Changes apply across the app immediately while it is open.
      </Text>

      <View style={styles.footerArea}>
        {saved ? <Text style={styles.savedText}>Saved</Text> : null}

        <Pressable
          style={[styles.actionButton, styles.actionButtonPrimary]}
          onPress={saveFeedback}>
          <Text style={[styles.actionText, styles.actionTextPrimary]}>
            Save
          </Text>
        </Pressable>

        <Pressable
          style={[styles.actionButton, styles.actionButtonDestructive]}
          onPress={resetSettings}>
          <Text style={[styles.actionText, styles.actionTextDestructive]}>
            Reset All Settings
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}