import { makeAutoObservable } from "mobx";
import { inject, reloadPage, singleshot, Subject, Operator } from "react-declarative";

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import AlertService from "./AlertService";
import RouterService from "./RouterService";

import parseErrorMessage from "../../../utils/parseErrorMessage";

import { CC_FIREBASE_CONFIG } from "../../../config/params";

import TYPES from "../../types";

const firebaseApp = firebase.initializeApp(CC_FIREBASE_CONFIG);

const db = firebase.firestore(firebaseApp);
const auth = firebase.auth(firebaseApp);

const currentUser$ = new Subject<firebase.User | null>();

export class FirebaseService {

    private readonly alertService = inject<AlertService>(TYPES.alertService);
    private readonly routerService = inject<RouterService>(TYPES.routerService);

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

    public getAuthState = async () => {
        try {
            return await new Promise((resolve, reject) =>
                this.app.auth().onAuthStateChanged((currentUser) => {
                    if (currentUser) {
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                },
                    (error) => reject(error)
                ));
        } catch {
            return false;
        }
    };

    public register = async ({ email, password }: { email: string, password: string }) => {
        let isOk = true;
        try {
            await auth.createUserWithEmailAndPassword(email, password);
        } catch (error) {
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
        } catch (error) {
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
        const isSignedIn = await this.getAuthState();
        if (!isSignedIn) {
            this.routerService.push('/login_page');
        }
        currentUser$
            .operator(Operator.count())
            .connect(({ count, value: currentUser }) => {
                if (!currentUser && count > 1) {
                    reloadPage();
                }
            });
        auth.onAuthStateChanged(currentUser$.next);
        window.addEventListener('offline', () => {
            reloadPage();
        });
    });

};

export default FirebaseService;
