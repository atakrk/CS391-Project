import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
import axios from "axios";

const firebaseConfig = {
  apiKey: "AIzaSyAAWS0lPa0SMGq-qYv3rMBdoGsrDwLxxmg",
  authDomain: "project-rubric.firebaseapp.com",
  projectId: "project-rubric",
  storageBucket: "project-rubric.appspot.com",
  messagingSenderId: "21333202304",
  appId: "1:21333202304:web:29932440a52ac40f7a5d65",
};

export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseDb = getFirestore(firebaseApp);

export const firebaseEndpoint = axios.create({
  baseURL: `https://firestore.googleapis.com/v1/projects/${firebaseConfig.projectId}/databases/(default)/documents`,
});

export const getFieldsOfDocument = (document) => {
  let fields;

  Object.keys(document?.fields)?.forEach((field) => {
    fields = {
      ...fields,
      [field]: Object.values(document.fields[field])[0] || "",
    };
  });

  return fields;
};
