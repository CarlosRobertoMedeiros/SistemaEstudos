import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { mergeMap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Observable, from } from 'rxjs';

export class NotAutenticatedError {}


@Injectable()
export class MoneyHttpInterceptor implements HttpInterceptor{
    
    constructor(private auth:AuthService){

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {

        if (!req.url.includes('/oauth/token') && this.auth.isAccessTokenValido()) {

        console.log("Chamei a validação do oauth/token");
        return from(this.auth.obterNovoAccessToken())
            .pipe(
                mergeMap(() => {
                   
                    //Proteção para o Refresh Token
                    if (this.auth.isAccessTokenValido()) {
                        throw new NotAutenticatedError();
                    }

                    req = req.clone({
                        setHeaders: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    });
                    return next.handle(req);
                })
            );
        }

        return next.handle(req);
    };

};