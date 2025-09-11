import React, { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { db, storage } from "../../firebase";
import { useAuth } from "../../context/AuthContext";
import { Camera, Upload, Trash2, User, X, CheckCircle, AlertCircle, Scissors } from "lucide-react";

const PhotoManager = () => {
  const { user } = useAuth();
  const [data, setData] = useState({
    profilePhoto: ""
  });
  const [collectionName, setCollectionName] = useState("");
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [removingBg, setRemovingBg] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [processedPreviewUrl, setProcessedPreviewUrl] = useState("");
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showFullPhoto, setShowFullPhoto] = useState(false);
  const [processedBlob, setProcessedBlob] = useState(null);

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      try {
        // Try fetching from b2c_users first
        let ref = doc(db, "b2c_users", user.uid);
        let snap = await getDoc(ref);

        if (snap.exists()) {
          setCollectionName("b2c_users");
          setData({ 
            profilePhoto: "",
            ...snap.data() 
          });
        } else {
          // If not found, try B2BBulkOrders_users
          ref = doc(db, "B2BBulkOrders_users", user.uid);
          snap = await getDoc(ref);
          if (snap.exists()) {
            setCollectionName("B2BBulkOrders_users");
            setData({ 
              profilePhoto: "",
              ...snap.data() 
            });
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
      setLoading(false);
    };

    fetchData();
  }, [user]);

  const validateFile = (file) => {
    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    
    if (!allowedTypes.includes(file.type)) {
      return "Please select a valid image file (JPG, PNG, or GIF)";
    }
    
    if (file.size > maxSize) {
      return "File size must be less than 5MB";
    }
    
    return null;
  };

  const removeBackground = async (imageFile) => {
    try {
      setRemovingBg(true);
      
      // Try Remove.bg first
      const formData = new FormData();
      formData.append('image_file', imageFile);
      formData.append('size', 'auto');

      const removeBgResponse = await fetch('https://api.remove.bg/v1.0/removebg', {
        method: 'POST',
        headers: {
          'X-Api-Key': 'nKY5RdiBBARJWYBnme6M6RdJ', // Your API key
        },
        body: formData,
      });

      if (!removeBgResponse.ok) {
        throw new Error(`Remove.bg failed: ${removeBgResponse.status}`);
      }

      const removedBgBlob = await removeBgResponse.blob();
      return removedBgBlob;
    } catch (error) {
      console.error('Background removal failed:', error);
      throw error;
    } finally {
      setRemovingBg(false);
    }
  };

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const error = validateFile(file);
      if (error) {
        alert(error);
        return;
      }
      
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      
      // Reset processed preview
      setProcessedPreviewUrl("");
      setProcessedBlob(null);
    }
  };

  const handleRemoveBackground = async () => {
    if (!selectedFile) return;
    
    try {
      const processedBlob = await removeBackground(selectedFile);
      setProcessedBlob(processedBlob);
      
      // Create preview URL for processed image
      const processedUrl = URL.createObjectURL(processedBlob);
      setProcessedPreviewUrl(processedUrl);
      
      alert("Background removed successfully!");
    } catch (error) {
      console.error("Error removing background:", error);
      alert("Failed to remove background. You can still upload the original image.");
    }
  };

  const uploadPhoto = async () => {
    if (!selectedFile || !collectionName) return;
    
    setUploading(true);
    try {
      const timestamp = Date.now();
      let fileToUpload, fileName;
      
      // Use processed image if available, otherwise use original
      if (processedBlob) {
        fileToUpload = processedBlob;
        fileName = `profile_${timestamp}_processed_${selectedFile.name.split('.')[0]}.png`;
      } else {
        fileToUpload = selectedFile;
        fileName = `profile_${timestamp}_${selectedFile.name}`;
      }
      
      const storageRef = ref(storage, `users/${user.uid}/photos/${fileName}`);
      
      // Upload file to Firebase Storage
      const snapshot = await uploadBytes(storageRef, fileToUpload);
      const downloadURL = await getDownloadURL(snapshot.ref);
      
      // Delete old profile photo if exists
      if (data.profilePhoto) {
        try {
          const oldPhotoRef = ref(storage, data.profilePhoto);
          await deleteObject(oldPhotoRef);
        } catch (error) {
          console.log("Old photo not found or already deleted");
        }
      }
      
      // Update Firestore document
      const docRef = doc(db, collectionName, user.uid);
      await updateDoc(docRef, {
        profilePhoto: downloadURL
      });
      
      setData(prev => ({
        ...prev,
        profilePhoto: downloadURL
      }));
      
      // Reset form
      setSelectedFile(null);
      setPreviewUrl("");
      setProcessedPreviewUrl("");
      setProcessedBlob(null);
      setShowUploadModal(false);
      alert("Profile photo uploaded successfully!");
      
    } catch (error) {
      console.error("Error uploading photo:", error);
      alert("Error uploading photo. Please try again.");
    }
    setUploading(false);
  };

  const deletePhoto = async () => {
    if (!data.profilePhoto) return;
    
    try {
      // Delete from Firebase Storage
      const photoRef = ref(storage, data.profilePhoto);
      await deleteObject(photoRef);
      
      // Update Firestore document
      const docRef = doc(db, collectionName, user.uid);
      await updateDoc(docRef, {
        profilePhoto: ""
      });
      
      setData(prev => ({
        ...prev,
        profilePhoto: ""
      }));
      
      alert("Photo deleted successfully!");
    } catch (error) {
      console.error("Error deleting photo:", error);
      alert("Error deleting photo. Please try again.");
    }
  };

  const openUploadModal = () => {
    setShowUploadModal(true);
    setSelectedFile(null);
    setPreviewUrl("");
    setProcessedPreviewUrl("");
    setProcessedBlob(null);
  };

  const closeUploadModal = () => {
    setShowUploadModal(false);
    setSelectedFile(null);
    setPreviewUrl("");
    setProcessedPreviewUrl("");
    setProcessedBlob(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    if (processedPreviewUrl) {
      URL.revokeObjectURL(processedPreviewUrl);
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm">
      {/* Header */}
      <div className="px-4 md:px-6 py-4 border-b border-gray-200">
        <h1 className="text-xl md:text-2xl font-semibold text-gray-900">My Model</h1>
        <p className="text-sm text-gray-600 mt-1">Upload your photo to create your personal model</p>
      </div>

      <div className="p-4 md:p-6">
        {/* Instructions Section */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h3 className="text-lg font-medium text-blue-900 mb-3 flex items-center gap-2">
            <AlertCircle size={20} />
            Photo Guidelines
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle size={16} className="text-green-600" />
                <span className="text-gray-700">Full body photo required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={16} className="text-green-600" />
                <span className="text-gray-700">Stand straight facing camera</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={16} className="text-green-600" />
                <span className="text-gray-700">Good lighting, clear image</span>
              </div>
              <div className="flex items-center gap-2">
                <Scissors size={16} className="text-purple-600" />
                <span className="text-gray-700">Background removal available</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle size={16} className="text-green-600" />
                <span className="text-gray-700">Maximum file size: 5MB</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={16} className="text-green-600" />
                <span className="text-gray-700">Formats: JPG, PNG, GIF</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={16} className="text-green-600" />
                <span className="text-gray-700">Auto background removal</span>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Photo Section */}
        <div className="text-center">
          <div className="mb-6">
            {data.profilePhoto ? (
              <div className="relative inline-block">
                <div 
                  className="w-48 h-64 md:w-56 md:h-72 lg:w-64 lg:h-80 rounded-lg bg-gray-100 overflow-hidden border-4 border-white shadow-xl cursor-pointer mx-auto"
                  onClick={() => setShowFullPhoto(true)}
                >
                  <img 
                    src={data.profilePhoto} 
                    alt="My Model" 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                    onError={(e) => {
                      e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='300' viewBox='0 0 200 300'%3E%3Crect width='200' height='300' fill='%23f3f4f6'/%3E%3Ctext x='100' y='150' text-anchor='middle' dy='.3em' font-family='Arial' font-size='16' fill='%236b7280'%3EError Loading%3C/text%3E%3C/svg%3E";
                    }}
                  />
                </div>
                <button
                  onClick={deletePhoto}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors shadow-lg"
                  title="Delete photo"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ) : (
              <div className="w-48 h-64 md:w-56 md:h-72 lg:w-64 lg:h-80 rounded-lg bg-gray-100 border-4 border-white shadow-xl mx-auto flex items-center justify-center">
                <div className="text-center">
                  <User size={60} className="text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 text-sm">No photo uploaded</p>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-3">
            <button
              onClick={openUploadModal}
              className="flex items-center gap-2 text-white bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-medium transition-colors mx-auto"
            >
              <Camera size={20} />
              {data.profilePhoto ? 'Change Photo' : 'Upload Photo'}
            </button>
            
            {data.profilePhoto && (
              <p className="text-sm text-gray-500">
                Click on the photo to view full size
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Upload Your Photo</h3>
              <button
                onClick={closeUploadModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Choose Full Body Photo
                </label>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-10 h-10 mb-3 text-gray-400" />
                      <p className="text-sm text-gray-700 text-center">
                        <span className="font-semibold">Click to upload</span> your full body photo
                      </p>
                      <p className="text-xs text-gray-500 mt-1">Max 5MB • JPG, PNG, GIF</p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleFileSelect}
                    />
                  </label>
                </div>
              </div>

              {selectedFile && (
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Selected File</p>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600">{selectedFile.name}</p>
                    <p className="text-xs text-gray-500">
                      {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                </div>
              )}

              {/* Preview Section */}
              {(previewUrl || processedPreviewUrl) && (
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Preview</p>
                  <div className="flex gap-4 justify-center">
                    {previewUrl && (
                      <div className="text-center">
                        <p className="text-xs text-gray-500 mb-2">Original</p>
                        <div className="w-32 h-40 bg-gray-100 overflow-hidden border border-gray-200 rounded-lg">
                          <img 
                            src={previewUrl} 
                            alt="Original" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    )}
                    
                    {processedPreviewUrl && (
                      <div className="text-center">
                        <p className="text-xs text-purple-600 mb-2">Background Removed</p>
                        <div className="w-32 h-40 bg-gray-100 overflow-hidden border border-purple-200 rounded-lg">
                          <img 
                            src={processedPreviewUrl} 
                            alt="Processed" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Background Removal Button */}
              {selectedFile && !processedPreviewUrl && (
                <div className="mb-4">
                  <button
                    onClick={handleRemoveBackground}
                    disabled={removingBg}
                    className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium mx-auto"
                  >
                    <Scissors size={16} />
                    {removingBg ? 'Removing Background...' : 'Remove Background'}
                  </button>
                  <p className="text-xs text-gray-500 text-center mt-2">
                    Optional: Remove background for better results
                  </p>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={uploadPhoto}
                  disabled={!selectedFile || uploading}
                  className="flex-1 bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                >
                  {uploading ? 'Uploading...' : processedPreviewUrl ? 'Upload Processed Photo' : 'Upload Photo'}
                </button>
                <button
                  onClick={closeUploadModal}
                  className="px-4 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Full Photo Modal */}
      {showFullPhoto && data.profilePhoto && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={() => setShowFullPhoto(false)}
              className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <X size={24} />
            </button>
            <img 
              src={data.profilePhoto} 
              alt="My Model - Full View" 
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
              onClick={() => setShowFullPhoto(false)}
            />
          </div>  
          
        </div>
      )}
    </div>
  );
};

export default PhotoManager;