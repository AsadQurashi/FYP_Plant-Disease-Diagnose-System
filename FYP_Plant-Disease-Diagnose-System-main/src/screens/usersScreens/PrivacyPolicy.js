import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const PrivacyPolicy = () => {
  return (
    <ScrollView style={styles.scrollView}>
      <Text style={styles.header}>Privacy Policy</Text>
      <Text style={styles.content}>
        This Privacy Policy explains how we collect, use, and protect your information when you use our Plant Disease Prediction System application.
        {"\n\n"}
        <Text style={styles.subHeader}>1. Information We Collect{"\n"}</Text>
        - <Text style={styles.bold}>Personal Information:</Text> If you choose to create an account, we may collect your name, email address, and other details you provide.{"\n"}
        - <Text style={styles.bold}>Image Data:</Text> Images uploaded for disease prediction are processed but not stored permanently.{"\n"}
        - <Text style={styles.bold}>Device Information:</Text> We may collect information about your device, such as operating system, device type, and unique identifiers.{"\n\n"}

        <Text style={styles.subHeader}>2. How We Use Your Information{"\n"}</Text>
        - To provide plant disease predictions based on uploaded images.{"\n"}
        - To improve the functionality and performance of the app.{"\n"}
        - To communicate with you regarding updates and features.{"\n\n"}

        <Text style={styles.subHeader}>3. Sharing Your Information{"\n"}</Text>
        - We do not share your personal information with third parties unless required by law or with your consent.{"\n"}
        - Anonymized data may be used for research and development purposes.{"\n\n"}

        <Text style={styles.subHeader}>4. Data Security{"\n"}</Text>
        - We use industry-standard measures to protect your data.{"\n"}
        - However, no system can be 100% secure, and we cannot guarantee absolute security.{"\n\n"}

        <Text style={styles.subHeader}>5. Your Rights{"\n"}</Text>
        - You may request access to, correction of, or deletion of your personal data.{"\n"}
        - Contact us via the app to exercise your rights.{"\n\n"}

        <Text style={styles.subHeader}>6. Changes to This Policy{"\n"}</Text>
        - We may update this policy from time to time. Changes will be notified through the app.
      </Text>
    </ScrollView>
  );
};

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

export default PrivacyPolicy;
