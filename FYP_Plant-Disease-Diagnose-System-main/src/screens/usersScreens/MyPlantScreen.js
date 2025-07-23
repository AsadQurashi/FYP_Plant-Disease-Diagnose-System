import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  ActivityIndicator 
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { BASE_URL } from '@env';

const USER_ID = 1;

const PlantsScreen = ({ navigation }) => {
  const [diagnosisHistory, setDiagnosisHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const parsePredictionResult = (result) => {
    if (!result) return { confidence: 0, cure_suggestions: '', imageUri: null };
    
    if (typeof result === 'object') return result;
    
    try {
      return JSON.parse(result);
    } catch (e) {
      console.warn('Failed to parse prediction result:', e);
      return {
        cure_suggestions: result,
        confidence: 0,
        imageUri: null
      };
    }
  };

  const getImageUrl = (path) => {
    if (!path) return null;
    return path.startsWith('http') ? path : `${BASE_URL}/${path.replace(/^\/+/, '')}`;
  };

  useEffect(() => {
    const fetchDiagnosisHistory = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`http://10.71.155.34:5000/api/predictions?user_id=${USER_ID}`);
        if (!response.ok) {
          throw new Error(`Server error: ${response.status}`);
        }

        const data = await response.json();
        
        const transformed = data.map(item => {
          const parsed = parsePredictionResult(item.prediction_result);
          const imageUri = getImageUrl(parsed.imageUri || item.raw_image_path);

          return {
            id: item.id,
            diagnosis: item.plant_disease || parsed.plant_disease || 'Unknown Diagnosis',
            confidence: typeof parsed.confidence === 'number' ? parsed.confidence : 0,
            imageUri,
            cureSuggestions: parsed.cure_suggestions || '',
            date: item.timestamp || new Date().toISOString(),
            rawResult: item.prediction_result,
            rawImagePath: item.raw_image_path
          };
        });

        setDiagnosisHistory(transformed);
      } catch (err) {
        console.error('API Error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDiagnosisHistory();
  }, []);

  const currentDiagnosis = diagnosisHistory.length > 0 ? diagnosisHistory[0] : null;

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2e7d32" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Icon name="error-outline" size={40} color="#d32f2f" />
        <Text style={styles.errorText}>Error loading data</Text>
        <Text style={styles.errorSubtext}>{error}</Text>
        <TouchableOpacity 
          style={styles.retryButton}
          onPress={() => {
            setError(null);
            setLoading(true);
          }}
        >
          <Text style={styles.retryText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🌱 Plant Health History</Text>

      {currentDiagnosis ? (
        <TouchableOpacity
          style={styles.currentDiagnosisCard}
          onPress={() => navigation.navigate('DiagnosisResult', { diagnosis: currentDiagnosis })}
        >
          {currentDiagnosis.imageUri ? (
            <Image 
              source={{ uri: currentDiagnosis.imageUri }} 
              style={styles.image}
              onError={() => console.log('Image load failed')}
            />
          ) : (
            <View style={styles.imagePlaceholder}>
              <Icon name="image-not-supported" size={80} color="#ccc" />
            </View>
          )}
          <View style={styles.diagnosisInfo}>
            <Text style={styles.diagnosisText} numberOfLines={1}>
              {currentDiagnosis.diagnosis}
            </Text>
            {/* <Text style={styles.confidenceText}>
              Confidence: {(currentDiagnosis.confidence * 100).toFixed(1)}%
            </Text> */}
            <Text style={styles.dateText}>
              {new Date(currentDiagnosis.date).toLocaleDateString()}
            </Text>
          </View>
          <Icon name="chevron-right" size={24} color="#777" />
        </TouchableOpacity>
      ) : (
        <View style={styles.noDiagnosisContainer}>
          <Icon name="photo-camera" size={50} color="#ccc" />
          <Text style={styles.noDiagnosisText}>No plant diagnoses yet</Text>
          <Text style={styles.noDiagnosisSubtext}>
            Capture or upload plant photos to check for diseases
          </Text>
          <TouchableOpacity
            style={styles.newDiagnosisButton}
            onPress={() => navigation.navigate('CameraScreen')}
          >
            <Text style={styles.newDiagnosisButtonText}>New Diagnosis</Text>
          </TouchableOpacity>
        </View>
      )}

      {diagnosisHistory.length > 1 && (
        <>
          <Text style={styles.historyTitle}>Previous Diagnoses</Text>
          {diagnosisHistory.slice(1).map((diagnosis) => (
            <TouchableOpacity
              key={diagnosis.id}
              style={styles.historyItem}
              onPress={() => navigation.navigate('DiagnosisResult', { diagnosis })}
            >
              {diagnosis.imageUri ? (
                <Image 
                  source={{ uri: diagnosis.imageUri }} 
                  style={styles.historyImage}
                  onError={() => console.log('Image load failed')}
                />
              ) : (
                <View style={styles.historyImagePlaceholder}>
                  <Icon name="image-not-supported" size={60} color="#ccc" />
                </View>
              )}
              <View style={styles.historyInfo}>
                <Text style={styles.historyDiagnosis} numberOfLines={1}>
                  {diagnosis.diagnosis}
                </Text>
                <Text style={styles.historyDate}>
                  {new Date(diagnosis.date).toLocaleDateString()}
                </Text>
              </View>
              <Icon name="chevron-right" size={20} color="#777" />
            </TouchableOpacity>
          ))}
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f5f9f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: '#d32f2f',
    marginTop: 10,
    marginBottom: 5,
  },
  errorSubtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#2e7d32',
    padding: 10,
    borderRadius: 5,
  },
  retryText: {
    color: 'white',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginBottom: 20,
    textAlign: 'center',
  },
  currentDiagnosisCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  imagePlaceholder: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  diagnosisInfo: {
    flex: 1,
    marginLeft: 15,
    marginRight: 10,
  },
  diagnosisText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0B5D51',
  },
  confidenceText: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
  dateText: {
    fontSize: 12,
    color: '#777',
    marginTop: 4,
  },
  noDiagnosisContainer: {
    alignItems: 'center',
    padding: 40,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 20,
  },
  noDiagnosisText: {
    fontSize: 18,
    color: '#666',
    marginTop: 15,
  },
  noDiagnosisSubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 20,
  },
  newDiagnosisButton: {
    backgroundColor: '#2e7d32',
    padding: 12,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
  },
  newDiagnosisButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2e7d32',
    marginBottom: 15,
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
  },
  historyImage: {
    width: 60,
    height: 60,
    borderRadius: 6,
    resizeMode: 'cover',
  },
  historyImagePlaceholder: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    backgroundColor: '#f0f0f0',
  },
  historyInfo: {
    flex: 1,
    marginLeft: 12,
    marginRight: 10,
  },
  historyDiagnosis: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  historyDate: {
    fontSize: 12,
    color: '#777',
    marginTop: 4,
  },
});

export default PlantsScreen;