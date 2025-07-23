import React from 'react';
import { Text, StyleSheet, ScrollView } from 'react-native';

const AboutApp = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>🌿 About Plant Diagnose System</Text>
      
      <Text style={styles.paragraph}>
        🌱 The **Plant Diagnose System** is a smart and intuitive mobile app designed to help you detect plant diseases using your camera 📷.
      </Text>

      <Text style={styles.paragraph}>
        🧠 Powered by advanced **machine learning** and **image processing**, this app identifies plant diseases from leaf photos and suggests actionable treatment and prevention tips.
      </Text>

      <Text style={styles.paragraph}>
        🌍 Whether you're a home gardener, hobbyist, or agricultural professional — this app gives you the tools to ensure your plants thrive with real-time insights and smart recommendations.
      </Text>

      <Text style={styles.paragraph}>
        ✨ **Key Features:**
        {'\n'}✅ AI-based plant disease detection
        {'\n'}📖 Personalized plant health records
        {'\n'}🌦️ Weather-aware diagnosis
        {'\n'}🧪 Instant treatment suggestions
        {'\n'}🔐 Secure and user-friendly design
      </Text>

      <Text style={styles.footer}>
        🔖 Version 1.0.0{'\n'}
        © {new Date().getFullYear()} Plant Diagnose Team. All rights reserved.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F9FAFB',
    flexGrow: 1,
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 15,
    color: '#1F2937',
  },
  paragraph: {
    fontSize: 16,
    color: '#374151',
    marginBottom: 15,
    lineHeight: 24,
  },
  footer: {
    fontSize: 14,
    color: '#9CA3AF',
    marginTop: 30,
    textAlign: 'center',
  },
});

export default AboutApp;
