import { makeAutoObservable } from "mobx";
import { inject, reloadPage, singleshot } from "react-declarative";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import AlertService from "./AlertService";

import parseErrorMessage from "../../../utils/parseErrorMessage";

import { CC_FIREBASE_CONFIG } from "../../../config/params";

import TYPES from "../../types";

const firebaseApp = firebase.initializeApp(CC_FIREBASE_CONFIG);

const db = firebase.firestore(firebaseApp);
const auth = firebase.auth(firebaseApp);

export class FirebaseService {

    private readonly alertService = inject<AlertService>(TYPES.alertService);

    get isAuthorized() {
        return !!auth.currentUser;
    }

    get db() {
        return db;
    };

    get auth() {
        return auth;
    };

    get currentUser() {
        return auth.currentUser!;
    };

    get app() {
        return firebaseApp;
    }

    constructor() {
        makeAutoObservable(this);
    };

    public register = async ({ email, password }: { email: string, password: string }) => {
        let isOk = true;
        try {
            await auth.createUserWithEmailAndPassword(email, password);
        } catch(error) {
            const msg = parseErrorMessage(error);
            this.alertService.notify(msg);
            isOk = false;
        } finally {
            return isOk;
        }
    };

    public login = async ({ email, password }: { email: string, password: string }) => {
        let isOk = true;
        try {
            await auth.signInWithEmailAndPassword(email, password);
        } catch(error) {
            const msg = parseErrorMessage(error);
            this.alertService.notify(msg);
            isOk = false;
        } finally {
            return isOk;
        }
    };

    public logout = async () => {
        await auth.signOut();
        reloadPage();
    };

    public prefetch = singleshot(async () => {
        auth.useDeviceLanguage();
        await auth.setPersistence("session");
        auth.onAuthStateChanged(() => {
            console.log('Sign in complete');
        });
    });

};

export default FirebaseService;
