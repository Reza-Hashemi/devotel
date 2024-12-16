import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { FirebaseService } from 'src/config/firebase/firebase.service';

@Injectable()
export class FirebaseAuthMiddleware implements NestMiddleware {
    constructor(private readonly firebaseService: FirebaseService) { }

    async use(req: Request, res: Response, next: NextFunction) {
        const authHeader = req.headers['authorization'];
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Authorization header missing or invalid' });
        }

        const token = authHeader.split('Bearer ')[1];

        try {
            const decodedToken = await this.firebaseService.verifyToken(token);
            req['user'] = decodedToken; // Attach user info to the request object
            next();
        } catch (error) {
            throw new UnauthorizedException('Invalid or expired token');
        }
    }
}
