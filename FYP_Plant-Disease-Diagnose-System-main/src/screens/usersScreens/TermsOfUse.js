import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const TermsOfUse = () => {
  return (
    <ScrollView style={styles.scrollView}>
      <Text style={styles.header}>Terms of Use</Text>
      <Text style={styles.content}>
        Welcome to the Plant Disease Prediction System. By using this application, you agree to the following terms and conditions:
        {'\n\n'}
        <Text style={styles.subHeader}>1. Acceptance of Terms</Text>
        {'\n'}
        - By accessing and using our app, you agree to comply with these Terms of Use.
        {'\n'}
        - If you do not agree, please refrain from using the application.
        {'\n\n'}
        <Text style={styles.subHeader}>2. Use of the Application</Text>
        {'\n'}
        - The app is intended solely for personal, non-commercial use.
        {'\n'}
        - Do not use the app for any unlawful or harmful purposes.
        {'\n\n'}
        <Text style={styles.subHeader}>3. Intellectual Property</Text>
        {'\n'}
        - All content and features in the app, including algorithms, graphics, and text, are owned by us or licensed to us.
        {'\n'}
        - You may not reproduce, distribute, or modify any part of the app without prior permission.
        {'\n\n'}
        <Text style={styles.subHeader}>4. User Responsibilities</Text>
        {'\n'}
        - You are responsible for the accuracy of the images and data you upload.
        {'\n'}
        - Avoid uploading harmful, inappropriate, or unauthorized content.
        {'\n\n'}
        <Text style={styles.subHeader}>5. Limitation of Liability</Text>
        {'\n'}
        - We are not liable for any damages arising from the use or inability to use the app.
        {'\n'}
        - Predictions provided by the app are for informational purposes only and should not replace professional advice.
        {'\n\n'}
        <Text style={styles.subHeader}>6. Changes to Terms</Text>
        {'\n'}
        - We reserve the right to modify these terms at any time. Continued use of the app constitutes acceptance of the revised terms.
      </Text>
    </ScrollView>
  );
};

export default TermsOfUse;

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#0B5D51',
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  subHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    color: '#0B5D51',
  },
  bold: {
    fontWeight: 'bold',
  },
});
