import { useState, useEffect } from 'react';

const useIndexedDB = () => {
  const [db, setDb] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const initDB = async () => {
      try {
        const request = window.indexedDB.open('QuizDB', 1);

        request.onerror = (event) => {
          console.error("Database error:", event.target.error);
        };

        request.onupgradeneeded = (event) => {
          const database = event.target.result;
          if (!database.objectStoreNames.contains('quizAttempts')) {
            const store = database.createObjectStore('quizAttempts', { 
              keyPath: 'id', 
              autoIncrement: true 
            });
            store.createIndex('username', 'username', { unique: false });
            store.createIndex('date', 'date', { unique: false });
          }
        };

        request.onsuccess = (event) => {
          if (isMounted) {
            console.log("Database initialized successfully");
            setDb(event.target.result);
            setIsInitialized(true);
          }
        };
      } catch (error) {
        console.error("Error initializing database:", error);
      }
    };

    initDB();

    return () => {
      isMounted = false;
      if (db) {
        db.close();
      }
    };
  }, []);

  const saveAttempt = async (attemptData) => {
    return new Promise((resolve, reject) => {
      if (!db || !isInitialized) {
        console.error("Database not initialized");
        reject(new Error("Database not initialized"));
        return;
      }

      try {
        const transaction = db.transaction(['quizAttempts'], 'readwrite');
        const store = transaction.objectStore('quizAttempts');

        const attempt = {
          ...attemptData,
          date: new Date().toISOString()
        };

        console.log("Saving attempt:", attempt);

        const request = store.add(attempt);

        request.onsuccess = () => {
          console.log("Attempt saved successfully with ID:", request.result);
          resolve({ ...attempt, id: request.result });
        };

        request.onerror = () => {
          console.error("Error saving attempt:", request.error);
          reject(request.error);
        };

        transaction.oncomplete = () => {
          console.log("Transaction completed");
        };
      } catch (error) {
        console.error("Transaction error:", error);
        reject(error);
      }
    });
  };

  const getAttempts = async () => {
    return new Promise((resolve, reject) => {
      if (!db || !isInitialized) {
        console.error("Database not initialized");
        reject(new Error("Database not initialized"));
        return;
      }

      try {
        const transaction = db.transaction(['quizAttempts'], 'readonly');
        const store = transaction.objectStore('quizAttempts');
        const request = store.getAll();

        request.onsuccess = () => {
          const attempts = request.result || [];
          console.log("Retrieved attempts:", attempts);
          resolve(attempts);
        };

        request.onerror = () => {
          console.error("Error getting attempts:", request.error);
          reject(request.error);
        };
      } catch (error) {
        console.error("Transaction error:", error);
        reject(error);
      }
    });
  };

  return { saveAttempt, getAttempts, isInitialized };
};

export default useIndexedDB;