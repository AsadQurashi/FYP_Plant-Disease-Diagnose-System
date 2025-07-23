export const diagnosePlant = async (photo) => {
  const formData = new FormData();
  formData.append('image', {
    uri: photo.uri,
    type: photo.type || 'image/jpeg',
    name: photo.fileName || `plant_${Date.now()}.jpg`,
  });

  const response = await fetch('http://192.168.100.21:5000/api/image', {
    method: 'POST',
    body: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Diagnosis failed');
  }

  return await response.json();
};