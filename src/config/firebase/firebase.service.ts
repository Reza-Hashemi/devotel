import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';


@Injectable()
export class FirebaseService {
    private defaultApp: admin.app.App;
    constructor() {
        this.defaultApp = admin.initializeApp({
            credential: admin.credential.cert({
                clientEmail: process.env.CLIENT_EMAIL,
                projectId: process.env.PROJECT_ID,
                privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
            }),
        });
    }

    async createCustomToken(uid: string, additionalClaims?: object): Promise<string> {
        return this.defaultApp.auth().createCustomToken(uid, additionalClaims);
    }
    async verifyToken(token: string): Promise<admin.auth.DecodedIdToken> {
        try {
            return await admin.auth().verifyIdToken(token);
        } catch (error) {
            throw new Error('Invalid or expired token');
        }
    }
}
