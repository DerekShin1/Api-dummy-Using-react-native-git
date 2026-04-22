import React from 'react';
import { View, Text, Switch, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useSettings } from '../context/settingpagecontext';

export default function Settings() {
  const { settings, updateSetting } = useSettings();
  const isDark = settings.theme === 'dark';

  return (
    <ScrollView style={[styles.container, { backgroundColor: isDark ? '#111' : '#FAF8F5' }]}>
      <Text style={[styles.heading, { color: isDark ? '#FFF' : '#000' }]}>Settings</Text>

      {/* Theme */}
      <View style={styles.row}>
        <Text style={{ color: isDark ? '#FFF' : '#000' }}>Dark Mode</Text>
        <Switch
          value={isDark}
          onValueChange={(v) => updateSetting('theme', v ? 'dark' : 'light')}
        />
      </View>

      {/* Notifications */}
      <View style={styles.row}>
        <Text style={{ color: isDark ? '#FFF' : '#000' }}>Notifications</Text>
        <Switch
          value={settings.notifications}
          onValueChange={(v) => updateSetting('notifications', v)}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  heading: { fontSize: 24, fontWeight: '700', marginBottom: 24 },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#E8E0D4',
  },
});