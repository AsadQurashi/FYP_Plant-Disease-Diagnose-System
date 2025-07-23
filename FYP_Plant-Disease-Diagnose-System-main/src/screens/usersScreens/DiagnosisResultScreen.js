import React, { useState } from 'react';
import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  ScrollView,
  ActivityIndicator
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { BASE_URL } from '@env';

const DiagnosisResultScreen = () => {
  const { params } = useRoute();
  const diagnosis = params?.diagnosis;
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const imageUri = diagnosis?.imageUri || 
    (diagnosis?.rawImagePath ? `${BASE_URL}/${diagnosis.rawImagePath.replace(/^\/+/, '')}` : null);

  const condition = diagnosis?.diagnosis || 'Unknown Condition';
  const confidence = diagnosis?.confidence || 0;
  const treatmentText = diagnosis?.cureSuggestions || 'No treatment suggestions available';

  const treatmentTips = treatmentText
    .split('.')
    .filter(tip => tip.trim().length > 0)
    .map(tip => tip.trim() + '.');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Diagnosis Result</Text>

      <View style={styles.imageContainer}>
        {imageUri ? (
          <>
            <Image 
              source={{ uri: imageUri }} 
              style={styles.image}
              onLoadStart={() => setImageLoading(true)}
              onLoadEnd={() => setImageLoading(false)}
              onError={() => {
                setImageLoading(false);
                setImageError(true);
              }}
            />
            {imageLoading && (
              <ActivityIndicator 
                style={styles.loadingIndicator} 
                size="large" 
                color="#2e7d32" 
              />
            )}
          </>
        ) : (
          <View style={styles.imagePlaceholder}>
            <Icon name="image-not-supported" size={80} color="#ccc" />
          </View>
        )}
        {imageError && (
          <Text style={styles.errorText}>Could not load image</Text>
        )}
      </View>

      <View style={styles.resultContainer}>
        <Text style={styles.resultText}>
          Condition: <Text style={styles.diagnosisText}>{condition}</Text>
        </Text>

        <Text style={styles.confidenceText}>
          Confidence: {(confidence * 100).toFixed(1)}%
        </Text>

        {treatmentTips.length > 0 && (
          <View style={styles.tipsContainer}>
            <Text style={styles.sectionTitle}>Recommended Treatment</Text>
            {treatmentTips.map((tip, index) => (
              <View key={index} style={styles.tipItem}>
                <Icon name="lightbulb-outline" size={20} color="#0B5D51" />
                <Text style={styles.tipText}>{tip}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f5f9f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0B5D51',
    marginBottom: 20,
    textAlign: 'center',
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 20,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    resizeMode: 'contain',
    backgroundColor: '#f0f0f0',
  },
  loadingIndicator: {
    position: 'absolute',
    top: '50%',
  },
  imagePlaceholder: {
    width: '100%',
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
  },
  errorText: {
    color: '#d32f2f',
    marginTop: 10,
    textAlign: 'center',
  },
  resultContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  resultText: {
    fontSize: 18,
    marginBottom: 10,
    color: '#333',
  },
  diagnosisText: {
    fontWeight: 'bold',
    color: '#0B5D51',
  },
  confidenceText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
  },
  tipsContainer: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2e7d32',
    marginBottom: 15,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  tipText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#555',
    flex: 1,
  },
});

export default DiagnosisResultScreen;