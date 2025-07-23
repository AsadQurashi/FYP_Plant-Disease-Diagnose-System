// import React, { useRef, useState } from 'react';
// import {
//   View,
//   StyleSheet,
//   TouchableOpacity,
//   ActivityIndicator,
//   Text,
//   Alert,
//   Image,
//   Modal,
//   SafeAreaView,
//   Dimensions,
//   Platform
// } from 'react-native';
// import { Camera, useCameraDevice, useCameraPermission } from 'react-native-vision-camera';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import { usePhoto } from '../context/PhotoContext';
// import mime from 'mime';

// const { width, height } = Dimensions.get('window');

// const PlantCameraScreen = () => {
//   const cameraRef = useRef(null);
//   const device = useCameraDevice('back');
//   const { addDiagnosis } = usePhoto();
//   const [isProcessing, setIsProcessing] = useState(false);
//   const { hasPermission, requestPermission } = useCameraPermission();
//   const [flash, setFlash] = useState('off');
//   const [isCameraReady, setIsCameraReady] = useState(false);
//   const [capturedPhoto, setCapturedPhoto] = useState(null);
//   const [showPreview, setShowPreview] = useState(false);
//   const [zoom, setZoom] = useState(1);
//   const [diagnosisResult, setDiagnosisResult] = useState(null);
//   const [showDiagnosisModal, setShowDiagnosisModal] = useState(false);

//   const capturePhoto = async () => {
//     if (!cameraRef.current || !isCameraReady) return;
//     try {
//       const photo = await cameraRef.current.takePhoto({
//         quality: 0.9,
//         skipMetadata: true,
//         flash: flash
//       });

//       setCapturedPhoto(`file://${photo.path}`);
//       setShowPreview(true);
//     } catch (error) {
//       Alert.alert('Error', 'Failed to capture photo. Please try again.');
//       console.error('Photo capture error:', error);
//     }
//   };

//   const diagnosePlantDisease = async () => {
//     if (!capturedPhoto) return;
//     setIsProcessing(true);

//     try {
//       const newImageUri = capturedPhoto.replace('file://', '');
//       const imageType = mime.getType(newImageUri);

//       const formData = new FormData();
//       formData.append('image', {
//         uri: capturedPhoto,
//         type: imageType,
//         name: `plant_${Date.now()}.${imageType.split('/')[1]}`,
//       });

//       const API_URL = 'http://192.168.100.21:5000/api/image';

//       const response = await fetch(API_URL, {
//         method: 'POST',
//         body: formData,
//         headers: {
//           Accept: 'application/json',
//         },
//       });

//       const data = await response.json();

//       if (response.ok && data.plant_disease) {
//         const diagnosis = {
//           imageUri: capturedPhoto,
//           diagnosis: data.plant_disease,
//           confidence: data.prediction_result,
//           user_id: data.user_id,
//           timestamp: new Date().toISOString(),
//         };

//         addDiagnosis(diagnosis);
//         setDiagnosisResult(diagnosis);
//         setShowDiagnosisModal(true);
//       } else {
//         throw new Error(data?.error || 'Invalid response from server');
//       }
//     } catch (error) {
//       console.error('API Error:', error);
//       let errorMessage = 'Failed to diagnose plant disease';
//       if (error.response) {
//         errorMessage = error.response.data?.message || errorMessage;
//       } else if (error.request) {
//         errorMessage = 'No response from server. Please check your connection.';
//       }
//       Alert.alert('Diagnosis Failed', errorMessage);
//     } finally {
//       setIsProcessing(false);
//       setShowPreview(false);
//     }
//   };

//   const toggleFlash = () => {
//     setFlash(flash === 'off' ? 'on' : 'off');
//   };

//   const handleZoomIn = () => {
//     setZoom(Math.min(zoom + 0.5, 5));
//   };

//   const handleZoomOut = () => {
//     setZoom(Math.max(zoom - 0.5, 1));
//   };

//   const retakePhoto = () => {
//     setCapturedPhoto(null);
//     setShowPreview(false);
//   };

//   if (!hasPermission) {
//     return (
//       <SafeAreaView style={styles.permissionContainer}>
//         <View style={styles.permissionContent}>
//           <View style={styles.cameraIconContainer}>
//             <Icon name="camera-alt" size={60} color="#4CAF50" />
//           </View>
//           <Text style={styles.permissionTitle}>Camera Access Required</Text>
//           <Text style={styles.permissionText}>
//             To diagnose plant diseases, we need access to your camera.
//           </Text>
//           <TouchableOpacity
//             style={styles.permissionButton}
//             onPress={requestPermission}
//             activeOpacity={0.7}
//           >
//             <Text style={styles.permissionButtonText}>Allow Camera Access</Text>
//           </TouchableOpacity>
//         </View>
//       </SafeAreaView>
//     );
//   }

//   if (!device) {
//     return (
//       <SafeAreaView style={styles.noDeviceContainer}>
//         <View style={styles.noDeviceContent}>
//           <View style={styles.errorIconContainer}>
//             <Icon name="error-outline" size={60} color="#F44336" />
//           </View>
//           <Text style={styles.noDeviceTitle}>Camera Not Available</Text>
//           <Text style={styles.noDeviceText}>
//             We couldn't access your camera. Please check if another app is using it.
//           </Text>
//         </View>
//       </SafeAreaView>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <Camera
//         ref={cameraRef}
//         style={StyleSheet.absoluteFill}
//         device={device}
//         isActive={!showPreview}
//         photo={true}
//         zoom={zoom}
//         onInitialized={() => setIsCameraReady(true)}
//         onError={(error) => {
//           console.error('Camera error:', error);
//           Alert.alert('Camera Error', 'Failed to initialize camera');
//         }}
//       />

//       {!showPreview && (
//         <View style={styles.controlsContainer}>
//           <View style={styles.topControls}>
//             <TouchableOpacity
//               onPress={toggleFlash}
//               style={[
//                 styles.controlButton,
//                 styles.flashButton,
//                 flash === 'on' && styles.flashActive
//               ]}
//               activeOpacity={0.7}
//             >
//               <Icon
//                 name={flash === 'on' ? 'flash-on' : 'flash-off'}
//                 size={28}
//                 color="white"
//               />
//             </TouchableOpacity>

//             <View style={styles.zoomControls}>
//               <TouchableOpacity
//                 onPress={handleZoomOut}
//                 style={styles.zoomButton}
//                 disabled={zoom <= 1}
//               >
//                 <Icon name="remove" size={24} color={zoom <= 1 ? '#666' : 'white'} />
//               </TouchableOpacity>
//               <Text style={styles.zoomText}>{zoom.toFixed(1)}x</Text>
//               <TouchableOpacity
//                 onPress={handleZoomIn}
//                 style={styles.zoomButton}
//                 disabled={zoom >= 5}
//               >
//                 <Icon name="add" size={24} color={zoom >= 5 ? "#666" : "white"} />
//               </TouchableOpacity>
//             </View>
//           </View>

//           <View style={styles.captureButtonContainer}>
//             <TouchableOpacity
//               style={styles.captureButton}
//               onPress={capturePhoto}
//               disabled={!isCameraReady}
//               activeOpacity={0.7}
//             >
//               <View style={styles.captureButtonOuter}>
//                 <View style={styles.captureButtonInner} />
//               </View>
//             </TouchableOpacity>
//           </View>
//         </View>
//       )}

//       {/* Preview Modal */}
//       <Modal
//         visible={showPreview}
//         transparent={true}
//         animationType="slide"
//         onRequestClose={retakePhoto}
//       >
//         <View style={styles.previewContainer}>
//           <Image
//             source={{ uri: capturedPhoto }}
//             style={styles.previewImage}
//             resizeMode="contain"
//           />

//           <View style={styles.previewControls}>
//             <TouchableOpacity
//               onPress={retakePhoto}
//               style={[styles.previewButton, styles.retakeButton]}
//               activeOpacity={0.7}
//             >
//               <Icon name="close" size={24} color="white" />
//               <Text style={styles.previewButtonText}>Retake</Text>
//             </TouchableOpacity>

//             <TouchableOpacity
//               onPress={diagnosePlantDisease}
//               style={[styles.previewButton, styles.diagnoseButton]}
//               disabled={isProcessing}
//               activeOpacity={0.7}
//             >
//               {isProcessing ? (
//                 <ActivityIndicator color="white" size="small" />
//               ) : (
//                 <>
//                   <Icon name="search" size={24} color="white" />
//                   <Text style={styles.previewButtonText}>Diagnose</Text>
//                 </>
//               )}
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>

//       {/* Diagnosis Result Modal */}
//       <Modal
//         visible={showDiagnosisModal}
//         transparent={true}
//         animationType="fade"
//         onRequestClose={() => setShowDiagnosisModal(false)}
//       >
//         <View style={styles.resultModalContainer}>
//           <View style={styles.resultCard}>
//             <Text style={styles.resultTitle}>Diagnosis Result</Text>
//             <Image
//               source={{ uri: diagnosisResult?.imageUri }}
//               style={styles.resultImage}
//               resizeMode="contain"
//             />
//             <Text style={styles.resultLabel}>Plant Disease:</Text>
//             <Text style={styles.resultValue}>{diagnosisResult?.diagnosis}</Text>
//             <Text style={styles.resultLabel}>Prediction:</Text>
//             <Text style={styles.resultValue}>{diagnosisResult?.confidence}</Text>
//             <TouchableOpacity
//               onPress={() => {
//                 setDiagnosisResult(null);
//                 setShowDiagnosisModal(false);
//                 setCapturedPhoto(null);
//               }}
//               style={styles.closeResultButton}
//               activeOpacity={0.7}
//             >
//               <Text style={styles.closeResultButtonText}>Close</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: 'black' },
//   permissionContainer: { flex: 1, backgroundColor: '#f5f5f5' },
//   permissionContent: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 30 },
//   cameraIconContainer: { backgroundColor: '#E8F5E9', width: 100, height: 100, borderRadius: 50, justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
//   permissionTitle: { fontSize: 22, fontWeight: '600', color: '#333', marginBottom: 10, textAlign: 'center' },
//   permissionText: { fontSize: 16, color: '#666', textAlign: 'center', marginBottom: 30, lineHeight: 24 },
//   permissionButton: { backgroundColor: '#4CAF50', padding: 16, borderRadius: 8, width: '100%', alignItems: 'center', elevation: 3 },
//   permissionButtonText: { color: 'white', fontSize: 16, fontWeight: '600' },
//   noDeviceContainer: { flex: 1, backgroundColor: '#f5f5f5' },
//   noDeviceContent: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 30 },
//   errorIconContainer: { backgroundColor: '#FFEBEE', width: 100, height: 100, borderRadius: 50, justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
//   noDeviceTitle: { fontSize: 22, fontWeight: '600', color: '#333', marginBottom: 10 },
//   noDeviceText: { fontSize: 16, color: '#666', textAlign: 'center', lineHeight: 24 },
//   controlsContainer: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'space-between', paddingTop: Platform.OS === 'ios' ? 50 : 20, paddingBottom: 40 },
//   topControls: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, alignItems: 'center' },
//   controlButton: { backgroundColor: 'rgba(0,0,0,0.4)', width: 50, height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center' },
//   flashButton: { borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' },
//   flashActive: { backgroundColor: 'rgba(255,255,255,0.2)' },
//   zoomControls: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.4)', borderRadius: 20, paddingHorizontal: 10, height: 40 },
//   zoomButton: { padding: 8 },
//   zoomText: { color: 'white', fontSize: 14, fontWeight: '600', marginHorizontal: 8, minWidth: 30, textAlign: 'center' },
//   captureButtonContainer: { alignItems: 'center' },
//   captureButton: { width: 80, height: 80, justifyContent: 'center', alignItems: 'center' },
//   captureButtonOuter: { width: 70, height: 70, borderRadius: 35, backgroundColor: 'rgba(255,255,255,0.3)', justifyContent: 'center', alignItems: 'center', borderWidth: 3, borderColor: 'rgba(255,255,255,0.5)' },
//   captureButtonInner: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#4CAF50' },
//   previewContainer: { flex: 1, backgroundColor: 'black' },
//   previewImage: { flex: 1, width: '100%' },
//   previewControls: { position: 'absolute', bottom: 40, left: 20, right: 20, flexDirection: 'row', justifyContent: 'space-between' },
//   previewButton: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 24, borderRadius: 25, width: '45%', justifyContent: 'center', elevation: 5 },
//   retakeButton: { backgroundColor: 'rgba(255,255,255,0.2)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.3)' },
//   diagnoseButton: { backgroundColor: '#4CAF50' },
//   previewButtonText: { color: 'white', marginLeft: 10, fontSize: 16, fontWeight: '600' },
//   resultModalContainer: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center', alignItems: 'center', padding: 20 },
//   resultCard: { width: '100%', backgroundColor: 'white', borderRadius: 12, padding: 20, alignItems: 'center' },
//   resultTitle: { fontSize: 22, fontWeight: '700', color: '#4CAF50', marginBottom: 10 },
//   resultImage: { width: '100%', height: 200, borderRadius: 10, marginBottom: 20 },
//   resultLabel: { fontSize: 16, fontWeight: '600', color: '#333', alignSelf: 'flex-start', marginTop: 10 },
//   resultValue: { fontSize: 16, color: '#555', alignSelf: 'flex-start' },
//   closeResultButton: { marginTop: 20, backgroundColor: '#4CAF50', paddingVertical: 12, paddingHorizontal: 30, borderRadius: 8 },
//   closeResultButtonText: { color: 'white', fontSize: 16, fontWeight: '600' }
// });

// export default PlantCameraScreen;

import React, { useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Text,
  Alert,
  Image,
  Modal,
  SafeAreaView,
  Dimensions,
  Platform,
} from 'react-native';
import { Camera, useCameraDevice, useCameraPermission } from 'react-native-vision-camera';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { usePhoto } from '../context/PhotoContext';
import mime from 'mime';
import {BASE_URL} from '@env';
const { width, height } = Dimensions.get('window');

const PlantCameraScreen = () => {
  const cameraRef = useRef(null);
  const device = useCameraDevice('back');
  const { addDiagnosis } = usePhoto();
  const [isProcessing, setIsProcessing] = useState(false);
  const { hasPermission, requestPermission } = useCameraPermission();
  const [flash, setFlash] = useState('off');
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [diagnosisResult, setDiagnosisResult] = useState(null);
  const [showDiagnosisModal, setShowDiagnosisModal] = useState(false);

  const capturePhoto = async () => {
    if (!cameraRef.current || !isCameraReady) return;
    try {
      const photo = await cameraRef.current.takePhoto({
        quality: 0.9,
        skipMetadata: true,
        flash: flash,
      });

      setCapturedPhoto(`file://${photo.path}`);
      setShowPreview(true);
    } catch (error) {
      Alert.alert('Error', 'Failed to capture photo. Please try again.');
      console.error('Photo capture error:', error);
    }
  };

  const diagnosePlantDisease = async () => {
    if (!capturedPhoto) return;
    setIsProcessing(true);

    try {
      const newImageUri = capturedPhoto.replace('file://', '');
      const imageType = mime.getType(newImageUri);

      const formData = new FormData();
      formData.append('image', {
        uri: capturedPhoto,
        type: imageType,
        name: `plant_${Date.now()}.${imageType.split('/')[1]}`,
      });

      // const API_URL = `${BASE_URL}/api/image`;

      const response = await fetch(`http://10.71.155.34:5000/api/image`, {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok && data.plant_disease) {
        const diagnosis = {
          imageUri: capturedPhoto,
          diagnosis: data.plant_disease,
          confidence: data.prediction_result,
          user_id: data.user_id,
          timestamp: new Date().toISOString(),
        };

        addDiagnosis(diagnosis);
        setDiagnosisResult(diagnosis);
        setShowDiagnosisModal(true);
      } else {
        throw new Error(data?.error || 'Invalid response from server');
      }
    } catch (error) {
      console.error('API Error:', error);
      let errorMessage = 'Failed to diagnose plant disease';
      if (error.response) {
        errorMessage = error.response.data?.message || errorMessage;
      } else if (error.request) {
        errorMessage = 'No response from server. Please check your connection.';
      }
      Alert.alert('Diagnosis Failed', errorMessage);
    } finally {
      setIsProcessing(false);
      setShowPreview(false);
    }
  };

  const toggleFlash = () => {
    setFlash(flash === 'off' ? 'on' : 'off');
  };

  const handleZoomIn = () => {
    setZoom(Math.min(zoom + 0.5, 5));
  };

  const handleZoomOut = () => {
    setZoom(Math.max(zoom - 0.5, 1));
  };

  const retakePhoto = () => {
    setCapturedPhoto(null);
    setShowPreview(false);
  };

  if (!hasPermission) {
    return (
      <SafeAreaView style={styles.permissionContainer}>
        <View style={styles.permissionContent}>
          <View style={styles.cameraIconContainer}>
            <Icon name="camera-alt" size={60} color="#4CAF50" />
          </View>
          <Text style={styles.permissionTitle}>Camera Access Required 📷</Text>
          <Text style={styles.permissionText}>
            To diagnose plant diseases, we need access to your camera.
          </Text>
          <TouchableOpacity
            style={styles.permissionButton}
            onPress={requestPermission}
            activeOpacity={0.7}
          >
            <Text style={styles.permissionButtonText}>Allow Camera Access ✅</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (!device) {
    return (
      <SafeAreaView style={styles.noDeviceContainer}>
        <View style={styles.noDeviceContent}>
          <View style={styles.errorIconContainer}>
            <Icon name="error-outline" size={60} color="#F44336" />
          </View>
          <Text style={styles.noDeviceTitle}>Camera Not Available ❌</Text>
          <Text style={styles.noDeviceText}>
            We couldn't access your camera. Please check if another app is using it.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        ref={cameraRef}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={!showPreview}
        photo={true}
        zoom={zoom}
        onInitialized={() => setIsCameraReady(true)}
        onError={(error) => {
          console.error('Camera error:', error);
          Alert.alert('Camera Error', 'Failed to initialize camera');
        }}
      />

      {!showPreview && (
        <View style={styles.controlsContainer}>
          <View style={styles.topControls}>
            <TouchableOpacity
              onPress={toggleFlash}
              style={[styles.controlButton, styles.flashButton, flash === 'on' && styles.flashActive]}
              activeOpacity={0.7}
            >
              <Icon name={flash === 'on' ? 'flash-on' : 'flash-off'} size={28} color="white" />
            </TouchableOpacity>

            <View style={styles.zoomControls}>
              <TouchableOpacity
                onPress={handleZoomOut}
                style={styles.zoomButton}
                disabled={zoom <= 1}
              >
                <Icon name="remove" size={24} color={zoom <= 1 ? '#666' : 'white'} />
              </TouchableOpacity>
              <Text style={styles.zoomText}>{zoom.toFixed(1)}x</Text>
              <TouchableOpacity
                onPress={handleZoomIn}
                style={styles.zoomButton}
                disabled={zoom >= 5}
              >
                <Icon name="add" size={24} color={zoom >= 5 ? '#666' : 'white'} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.captureButtonContainer}>
            <TouchableOpacity
              style={styles.captureButton}
              onPress={capturePhoto}
              disabled={!isCameraReady}
              activeOpacity={0.7}
            >
              <View style={styles.captureButtonOuter}>
                <View style={styles.captureButtonInner} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Preview Modal */}
      <Modal
        visible={showPreview}
        transparent={true}
        animationType="slide"
        onRequestClose={retakePhoto}
      >
        <View style={styles.previewContainer}>
          <Image source={{ uri: capturedPhoto }} style={styles.previewImage} resizeMode="contain" />

          <View style={styles.previewControls}>
            <TouchableOpacity
              onPress={retakePhoto}
              style={[styles.previewButton, styles.retakeButton]}
              activeOpacity={0.7}
            >
              <Icon name="close" size={24} color="white" />
              <Text style={styles.previewButtonText}>Retake 🔄</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={diagnosePlantDisease}
              style={[styles.previewButton, styles.diagnoseButton]}
              disabled={isProcessing}
              activeOpacity={0.7}
            >
              {isProcessing ? (
                <ActivityIndicator color="white" size="small" />
              ) : (
                <>
                  <Icon name="search" size={24} color="white" />
                  <Text style={styles.previewButtonText}>Diagnose 🧪🌿</Text>
                </>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Diagnosis Result Modal */}
      <Modal
        visible={showDiagnosisModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowDiagnosisModal(false)}
      >
        <View style={styles.resultModalContainer}>
          <View style={styles.resultCard}>
            <Text style={styles.resultTitle}>Diagnosis Result 🌱</Text>
            <Image
              source={{ uri: diagnosisResult?.imageUri }}
              style={styles.resultImage}
              resizeMode="contain"
            />
            <Text style={styles.resultLabel}>Plant Disease:</Text>
            <Text style={styles.resultValue}>{diagnosisResult?.diagnosis}</Text>
            <Text style={styles.resultLabel}>Prediction Confidence:</Text>
            <Text style={styles.resultValue}>{diagnosisResult?.confidence}</Text>
            <TouchableOpacity
              onPress={() => {
                setDiagnosisResult(null);
                setShowDiagnosisModal(false);
                setCapturedPhoto(null);
              }}
              style={styles.closeResultButton}
              activeOpacity={0.7}
            >
              <Text style={styles.closeResultButtonText}>Close ❎</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121810' }, // Dark greenish-black base for a nature vibe
  permissionContainer: { flex: 1, backgroundColor: '#E8F5E9' },
  permissionContent: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 30 },
  cameraIconContainer: {
    backgroundColor: '#C8E6C9',
    width: 110,
    height: 110,
    borderRadius: 55,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 6,
  },
  permissionTitle: { fontSize: 24, fontWeight: '700', color: '#2E7D32', marginBottom: 12, textAlign: 'center' },
  permissionText: { fontSize: 18, color: '#388E3C', textAlign: 'center', marginBottom: 36, lineHeight: 26 },
  permissionButton: {
    backgroundColor: '#43A047',
    paddingVertical: 16,
    borderRadius: 30,
    width: '90%',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#2E7D32',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  permissionButtonText: { color: 'white', fontSize: 18, fontWeight: '700' },

  noDeviceContainer: { flex: 1, backgroundColor: '#FFEBEE' },
  noDeviceContent: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 30 },
  errorIconContainer: {
    backgroundColor: '#FFCDD2',
    width: 110,
    height: 110,
    borderRadius: 55,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#D32F2F',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 6,
  },
  noDeviceTitle: { fontSize: 24, fontWeight: '700', color: '#B71C1C', marginBottom: 12 },
  noDeviceText: { fontSize: 18, color: '#D32F2F', textAlign: 'center', lineHeight: 26 },

  controlsContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'space-between',
    paddingTop: Platform.OS === 'ios' ? 60 : 30,
    paddingBottom: 50,
    paddingHorizontal: 20,
  },
  topControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  controlButton: {
    backgroundColor: 'rgba(76,175,80,0.8)', // green with opacity
    width: 55,
    height: 55,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#388E3C',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 8,
  },
  flashButton: {
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.4)',
  },
  flashActive: {
    backgroundColor: '#A5D6A7',
  },
  zoomControls: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(56,142,60,0.85)',
    borderRadius: 30,
    paddingHorizontal: 14,
    height: 45,
    shadowColor: '#2E7D32',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  zoomButton: {
    padding: 12,
  },
  zoomText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
    marginHorizontal: 10,
    minWidth: 40,
    textAlign: 'center',
  },
  captureButtonContainer: {
    alignItems: 'center',
  },
  captureButton: {
    width: 90,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButtonOuter: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: 'rgba(255,255,255,0.7)',
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 12,
  },
  captureButtonInner: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#2E7D32',
  },

  previewContainer: { flex: 1, backgroundColor: '#121810' },
  previewImage: { flex: 1, width: '100%' },
  previewControls: {
    position: 'absolute',
    bottom: 50,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  previewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 30,
    width: '48%',
    justifyContent: 'center',
    elevation: 8,
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
  },
  retakeButton: {
    backgroundColor: '#2E7D32',
    borderWidth: 1,
    borderColor: '#A5D6A7',
  },
  diagnoseButton: {
    backgroundColor: '#66BB6A',
  },
  previewButtonText: {
    color: 'white',
    marginLeft: 14,
    fontSize: 18,
    fontWeight: '700',
  },

  resultModalContainer: {
    flex: 1,
    backgroundColor: 'rgba(18, 24, 16, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  resultCard: {
    width: '95%',
    backgroundColor: '#E8F5E9',
    borderRadius: 16,
    padding: 28,
    alignItems: 'center',
    shadowColor: '#388E3C',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 15,
  },
  resultTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#2E7D32',
    marginBottom: 16,
    textAlign: 'center',
  },
  resultImage: {
    width: '100%',
    height: 220,
    borderRadius: 14,
    marginBottom: 24,
  },
  resultLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2E7D32',
    alignSelf: 'flex-start',
    marginTop: 14,
  },
  resultValue: {
    fontSize: 18,
    color: '#388E3C',
    alignSelf: 'flex-start',
    marginBottom: 6,
  },
  closeResultButton: {
    marginTop: 30,
    backgroundColor: '#388E3C',
    paddingVertical: 16,
    paddingHorizontal: 36,
    borderRadius: 40,
    elevation: 8,
    shadowColor: '#2E7D32',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 14,
  },
  closeResultButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
  },
});

export default PlantCameraScreen;

