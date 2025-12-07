// Showrooms Data Module using Firestore SDK (Serverless)
import { auth } from './auth.js';
import { db, collection, addDoc, getDocs, deleteDoc, doc, query, where } from '../firebase-config.js';

// Create Showroom
export async function createShowroom(name, modelFile) {
    if (!auth.currentUser) {
        throw new Error('You must be signed in to create a showroom');
    }

    try {
        // In this serverless version, we save directly to Firestore.
        // File upload (modelFile) would go to Firebase Storage (not implemented in this step).
        // We will store a mock model URL for now.

        const showroomData = {
            name: name,
            ownerId: auth.currentUser.uid,
            createdAt: new Date().toISOString(),
            modelUrl: '#' // Placeholder, requires Firebase Storage implementation
        };

        const docRef = await addDoc(collection(db, 'showrooms'), showroomData);

        return { id: docRef.id, ...showroomData };
    }

    try {
        await deleteDoc(doc(db, 'showrooms', showroomId));
        return true;
    } catch (error) {
        console.error('Error deleting showroom:', error);
        throw error;
    }
}

// Generate AR Experience Link
export function generateARLink(modelUrl) {
    // Create a shareable AR link with the model URL
    const baseUrl = window.location.origin;
    const arUrl = `${baseUrl}/ar-viewer.html?model=${encodeURIComponent(modelUrl)}`;
    return arUrl;
}
