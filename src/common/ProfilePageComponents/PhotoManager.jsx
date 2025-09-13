import React, { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { db, storage } from "../../firebase";
import { useAuth } from "../../context/AuthContext";
import { Camera, Upload, Trash2, User, X, CheckCircle, AlertCircle, ChevronDown,ChevronUp ,Loader2 } from "lucide-react";
import MultiStepQuestionnaire from '../../common/ProfilePageComponents/Questionaries'
const PhotoManager = () => {
  const { user } = useAuth();
  const [data, setData] = useState({
    profilePhoto: ""
  });
  const [collectionName, setCollectionName] = useState("");
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [processingImage, setProcessingImage] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showFullPhoto, setShowFullPhoto] = useState(false);

  // Remove.bg API Key - Replace with your actual API key
  const REMOVE_BG_API_KEY = 'Fz856UNUgtdj2LgpFjd1PXMz'; // Get from https://www.remove.bg/api

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

  // Remove background using Remove.bg API
  const removeBackgroundAutomatically = async (file) => {
    if (!REMOVE_BG_API_KEY || REMOVE_BG_API_KEY === 'YOUR_REMOVE_BG_API_KEY') {
      console.warn('Remove.bg API key not configured, uploading original image');
      return null;
    }
    
    setProcessingImage(true);
    
    try {
      const formData = new FormData();
      formData.append('image_file', file);
      formData.append('size', 'auto');
      
      const response = await fetch('https://api.remove.bg/v1.0/removebg', {
        method: 'POST',
        headers: {
          'X-Api-Key': REMOVE_BG_API_KEY,
        },
        body: formData
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.errors?.[0]?.title || `API error: ${response.status}`);
      }
      
      const blob = await response.blob();
      
      // Convert blob to file for upload
      const processedFile = new File([blob], `no-bg-${file.name}`, {
        type: 'image/png'
      });
      
      return processedFile;
      
    } catch (error) {
      console.error('Background removal failed:', error);
      // Return null to use original file
      return null;
    } finally {
      setProcessingImage(false);
    }
  };

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const error = validateFile(file);
      if (error) {
        return;
      }
      
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      
      // Automatically remove background
      const processedFile = await removeBackgroundAutomatically(file);
      
      // If background removal was successful, automatically upload the processed image
      if (processedFile) {
        await uploadPhotoWithFile(processedFile);
      } else {
        // If background removal failed, upload the original image
        await uploadPhotoWithFile(file);
      }
    }
  };

  const uploadPhotoWithFile = async (fileToUpload) => {
    if (!fileToUpload || !collectionName) return;
    
    setUploading(true);
    
    try {
      const timestamp = Date.now();
      const fileName = `profile_${timestamp}_${fileToUpload.name}`;
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
      setShowUploadModal(false);
      
    } catch (error) {
      console.error("Error uploading photo:", error);
    }
    setUploading(false);
  };

  const deletePhoto = async () => {
    if (!data.profilePhoto) return;
    
    const confirmDelete = window.confirm("Are you sure you want to delete your profile photo?");
    if (!confirmDelete) return;
    
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
      
    } catch (error) {
      console.error("Error deleting photo:", error);
    }
  };

  const openUploadModal = () => {
    setShowUploadModal(true);
    setSelectedFile(null);
    setPreviewUrl("");
  };

  const closeUploadModal = () => {
    setShowUploadModal(false);
    setSelectedFile(null);
    setPreviewUrl("");
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
  };

  if (loading) return (
    <div className="flex items-center  justify-center h-64">
      <div className="animate-spin  rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    </div>
  );


  return (
<div className=" bg-white rounded-lg h-screen overflow-hidden">
      {/* Header */}
      <div className="  ">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900">My Model</h1>
        {/* <p className="text-sm text-gray-600 mt-1">Upload your photo to create your personal model</p> */}
      </div>

      <div className="">
        {/* Instructions Section */}
         <div className="">
      {/* Toggle Button */}
      <div className="justify-end flex">
      {/* <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2  bg-blue-100 text-blue-900 border border-blue-200 px-4 py-2 rounded-lg font-medium hover:bg-blue-200 transition"
      >
        <AlertCircle size={18} />
        {open ? "Hide Photo Guidelines" : "Show Photo Guidelines"}
        {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button> */}

      </div>

      {/* Collapsible Content */}
      {/* {open && (
      
      )} */}
    </div>

        {/* Profile Photo Section */}
        <div className="">

<div className="flex justify-between ml-28 mt-9">

          <div className="">
            {data.profilePhoto ? (
              <div className="relative inline-block">
                <div 
                  // className="w-48 h-64 md:w-56 md:h-72 lg:w-64  lg:h-80 rounded-lg overflow-hidden border border-gray-400  cursor-pointer mx-auto"
                className="w-48 h-64 md:w-56 md:h-72  shadow-[0_4px_12px_rgba(0,0,0,0.08)] lg:w-56 lg:h-[440px]
                rounded-[9999px] overflow-hidden bg-white 
                 flex items-center justify-center mx-auto  "
                  onClick={() => setShowFullPhoto(true)}

                >
                  <img 
                    src={data.profilePhoto} 
                    alt="My Model" 
                    className=" object-cover h-full hover:scale-105 transition-transform duration-200"
                    onError={(e) => {
                      e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='300' viewBox='0 0 200 300'%3E%3Crect width='200' height='300' fill='%23f3f4f6'/%3E%3Ctext x='100' y='150' text-anchor='middle' dy='.3em' font-family='Arial' font-size='16' fill='%236b7280'%3EError Loading%3C/text%3E%3C/svg%3E";
                    }}
                  />

                  
                </div>
                
                {/* <button
                  onClick={deletePhoto}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors shadow-lg"
                  title="Delete photo"
                >
                  <Trash2 size={16} />
                </button> */}

                
              </div>
            ) : (
              <div className="w-48 h-64 md:w-56 md:h-72 lg:w-64 lg:h-80 rounded-lg bg-gray-100 border-4 border-white shadow-xl mx-auto flex items-center justify-center">
                <div className="text-center">
                  <User size={60} className="text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 text-sm">No photo uploaded</p>
                </div>
              </div>
            )}
         
           <button
              onClick={openUploadModal}
              disabled={uploading || processingImage}
              className="flex items-center gap-2 text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed px-6 py-3 rounded-lg font-medium transition-colors mx-auto"
            >
              {uploading || processingImage ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Camera size={20} />
                  {data.profilePhoto ? 'Change Photo' : 'Upload Photo'}
                </>
              )}
            </button>
          </div>
         
<div className="w-full ">

<MultiStepQuestionnaire />
</div>

</div>
          <div className="">
          
            
            {/* {data.profilePhoto && (
              <p className="text-sm text-gray-500">
                Click on the photo to view full size
              </p>
            )}
   */}

            
          </div>
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 backdrop-blur bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden ">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Upload Your Photo</h3>
              <button
                onClick={closeUploadModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                disabled={uploading || processingImage}
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6">
              {/* Upload Section */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Choose Full Body Photo
                </label>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-3 animate-fadeIn">
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
                <div className="flex items-center mt-7 justify-center w-full">
                  <label className={`flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors ${
                    uploading || processingImage ? 'opacity-50 cursor-not-allowed' : ''
                  }`}>

                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      {uploading || processingImage ? (
                        <>
                          <Loader2 className="w-10 h-10 mb-3 text-blue-600 animate-spin" />
                          <p className="text-sm text-blue-700 text-center font-medium">
                            Uploading...
                          </p>
                          <p className="text-xs text-gray-500 mt-1">Please wait</p>
                        </>
                      ) : (
                        <>
                          <Upload className="w-10 h-10 mb-3 text-gray-400" />
                          <p className="text-sm text-gray-700 text-center">
                            <span className="font-semibold">Click to upload</span> your full body photo
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            Max 5MB • JPG, PNG, GIF • Background will be auto-removed
                          </p>
                        </>
                      )}
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleFileSelect}
                      disabled={uploading || processingImage}
                    />
                  </label>
                </div>
              </div>

              {/* Preview Section */}
              {previewUrl && (
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Preview</p>
                  <div className="w-full h-48 bg-gray-100 overflow-hidden border border-gray-200 rounded-lg">
                    <img 
                      src={previewUrl} 
                      alt="Preview" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={closeUploadModal}
                  disabled={uploading || processingImage}
                  className="px-4 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                >
                  {(uploading || processingImage) ? 'Uploading...' : 'Close'}
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