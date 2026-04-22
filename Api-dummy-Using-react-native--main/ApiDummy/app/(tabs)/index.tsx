import React, { useEffect, useMemo, useState } from 'react';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';

import { useSettings } from '@/src/context/settingpagecontext';
import { fontSizeMap, getAppColors } from '@/constants/theme';

const fetchWithTimeout = async (url: string, options = {}, timeoutMs = 10000) => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(url, { ...options, signal: controller.signal });

    if (!res.ok) {
      const text = await res.text().catch(() => '');
      throw new Error(`HTTP ${res.status}: ${text || res.statusText}`);
    }

    const ct = res.headers.get('content-type') || '';
    if (ct.includes('application/json')) return await res.json();
    return await res.text();
  } finally {
    clearTimeout(id);
  }
};

export default function Index() {
  const { settings } = useSettings();
  const colors = getAppColors(settings);
  const textSize = fontSizeMap[settings.fontSize] ?? fontSizeMap.md;
  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          padding: 24,
          justifyContent: 'center',
          backgroundColor: colors.background,
        },
        title: {
          fontSize: textSize + 8,
          fontWeight: 'bold',
          marginBottom: 12,
          color: colors.text,
        },
        text: {
          marginBottom: 12,
          color: colors.textMuted,
          fontSize: textSize,
        },
      }),
    [colors, textSize]
  );

  const [activity, setActivity] = useState('Nothing yet');

  const onGet = async () => {
    try {
      const data = await fetchWithTimeout('https://www.boredapi.com/api/activity');
      setActivity(data?.activity ?? 'No activity field');
    } catch (e: any) {
      Alert.alert('GET failed', e.message);
    }
  };

  const onPost = async () => {
    try {
      await fetchWithTimeout('https://httpbin.org/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ hello: 'world' }),
      });
      Alert.alert('POST OK', 'Posted JSON successfully.');
    } catch (e: any) {
      Alert.alert('POST failed', e.message);
    }
  };

  useEffect(() => {
    onGet();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>HTTP Demo</Text>
      <Text style={styles.text}>Activity: {activity}</Text>

      <Button title="GET activity" onPress={onGet} />
      <View style={{ height: 10 }} />
      <Button title="POST example" onPress={onPost} />
    </View>
  );
}