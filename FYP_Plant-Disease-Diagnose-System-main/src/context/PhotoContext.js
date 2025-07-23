// import React, { createContext, useContext, useState } from 'react';

// const PhotoContext = createContext();

// export const PhotoProvider = ({ children }) => {
//   const [photos, setPhotos] = useState([]);

//   const addPhoto = (uri) => {
//     setPhotos((prev) => [...prev, uri]);
//   };

//   return (
//     <PhotoContext.Provider value={{ photos, addPhoto }}>
//       {children}
//     </PhotoContext.Provider>
//   );
// };

// export const usePhoto = () => {
//   const context = useContext(PhotoContext);
//   if (!context) {
//     throw new Error('usePhoto must be used within a PhotoProvider');
//   }
//   return context;
// };

// export default PhotoContext;

// 2nd Updated
// import React, { createContext, useState, useContext } from 'react';

// const PhotoContext = createContext();

// export const PhotoProvider = ({ children }) => {
//   const [photos, setPhotos] = useState([]);
//   const [currentPhoto, setCurrentPhoto] = useState(null);

//   const addPhoto = (photo) => {
//     setPhotos(prev => [...prev, photo]);
//     setCurrentPhoto(photo);
//   };

//   return (
//     <PhotoContext.Provider value={{ 
//       photos,
//       currentPhoto,
//       addPhoto 
//     }}>
//       {children}
//     </PhotoContext.Provider>
//   );
// };

// export const usePhoto = () => {
//   const context = useContext(PhotoContext);
//   if (!context) {
//     throw new Error('usePhoto must be used within a PhotoProvider');
//   }
//   return context;
// };

// 3rd
import React, { createContext, useState, useContext } from 'react';

const PhotoContext = createContext();

export const PhotoProvider = ({ children }) => {
  const [currentDiagnosis, setCurrentDiagnosis] = useState(null);
  const [diagnosisHistory, setDiagnosisHistory] = useState([]);

  const addDiagnosis = (diagnosis) => {
    const newDiagnosis = {
      ...diagnosis,
      id: Date.now().toString(),
      date: new Date().toISOString()
    };
    setCurrentDiagnosis(newDiagnosis);
    setDiagnosisHistory(prev => [newDiagnosis, ...prev]);
  };

  return (
    <PhotoContext.Provider value={{ currentDiagnosis, diagnosisHistory, addDiagnosis }}>
      {children}
    </PhotoContext.Provider>
  );
};

export const usePhoto = () => {
  const context = useContext(PhotoContext);
  if (!context) {
    throw new Error('usePhoto must be used within a PhotoProvider');
  }
  return context;
};