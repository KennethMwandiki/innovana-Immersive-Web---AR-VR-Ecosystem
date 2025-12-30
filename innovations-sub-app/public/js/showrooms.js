// Showrooms Data Module using Firestore & Storage SDKs (Serverless)
import { auth } from './auth.js';
import { db, collection, addDoc, getDocs, deleteDoc, doc, query, where, onSnapshot, storage, ref, uploadBytes, getDownloadURL } from '../firebase-config.js';

/**
 * Uploads a 3D model file to Firebase Storage
 * @param {File} file - The .glb or .gltf file object
 * @returns {Promise<string>} - The download URL of the uploaded model
 */
async function uploadModel(file) {
    if (!auth.currentUser) throw new Error('Auth required');
    
    // Create a unique filename: models/USER_ID/TIMESTAMP_FILENAME
    const storageRef = ref(storage, `models/${auth.currentUser.uid}/${Date.now()}_${file.name}`);
    
    try {
        const snapshot = await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(snapshot.ref);
        return downloadURL;
    } catch (error) {
        console.error('Storage upload failed:', error);
        throw new Error('Failed to upload 3D model. Please try again.');
    }
}

// Create Showroom
export async function createShowroom(name, modelFile) {
    if (!auth.currentUser) {
        throw new Error('You must be signed in to create a showroom');
    }

    if (!modelFile) {
        throw new Error('Please select a 3D model file (.glb or .gltf)');
    }

    // Basic file type validation
    const validExtensions = ['.glb', '.gltf'];
    const fileExt = modelFile.name.substring(modelFile.name.lastIndexOf('.')).toLowerCase();
    if (!validExtensions.includes(fileExt)) {
        throw new Error('Invalid file type. Only .glb and .gltf are supported.');
    }

    try {
        // 1. Upload the file to Firebase Storage
        const downloadURL = await uploadModel(modelFile);

        // 2. Save the metadata to Firestore
        const showroomData = {
            name: name,
            ownerId: auth.currentUser.uid,
            createdAt: new Date().toISOString(),
            modelUrl: downloadURL,
            fileName: modelFile.name
        };

        const docRef = await addDoc(collection(db, 'showrooms'), showroomData);
        return { id: docRef.id, ...showroomData };
    } catch (error) {
        console.error('Error in showroom creation flow:', error);
        throw error;
    }
}

// Delete Showroom
export async function deleteShowroom(showroomId) {
    try {
        await deleteDoc(doc(db, 'showrooms', showroomId));
        return true;
    } catch (error) {
        console.error('Error deleting showroom:', error);
        throw error;
    }
}

// Subscribe to Showrooms (Real-time)
export function subscribeShowrooms(callback) {
    const q = query(collection(db, 'showrooms'));
    return onSnapshot(q, (snapshot) => {
        const showrooms = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        callback(showrooms);
    });
}

// Generate AR Experience Link
export function generateARLink(modelUrl) {
    const baseUrl = window.location.origin;
    // For local testing, we might need to handle absolute URLs
    const arUrl = `${baseUrl}/ar-viewer.html?model=${encodeURIComponent(modelUrl)}`;
    return arUrl;
}
