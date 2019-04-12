import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as $ from 'jquery';
import { Injectable } from '@angular/core';
import { AppService } from '../services/app.service';

@Injectable()
export class Service {
       
    public url = window.location.href.indexOf('/apad') > -1 ? '//www.objetivo.br/prova/api/' : 'http://200.174.103.116/objetivoprova/api/' ;
    public requestOptions = { headers:  new HttpHeaders ({
        'Content-Type': 'application/x-www-form-urlencoded',
        'appKey': 'YPpj++OV7AckYkJ7lLL1OJPO+rCJPXv1GggdgV8aFsPxDXNLN3OIF2k8GQfUAboY',
        'userKey': localStorage.getItem('token') ? localStorage.getItem('token') : '',
        'chavePublica': '32D69BD2-9E51-4199-AD01-7C6758DC0C8C',
        'Cache-Control': 'no-cache'
    })};

    constructor(private _appService: AppService) { }

    requestOptionsUpdated() {
        return { headers:  new HttpHeaders ({
            'Content-Type': 'application/x-www-form-urlencoded',
            'appKey': 'YPpj++OV7AckYkJ7lLL1OJPO+rCJPXv1GggdgV8aFsPxDXNLN3OIF2k8GQfUAboY',
            'userKey': localStorage.getItem('token') ? localStorage.getItem('token') : '',
            'chavePublica': '32D69BD2-9E51-4199-AD01-7C6758DC0C8C',
            'Cache-Control': 'no-cache'
        })};
    }
   
    tratarObjeto(obj) {
        var newObj = '';
        let array = Object.getOwnPropertyNames(obj);
        $.each(array, (index, value) => { newObj += value + '=' + obj[value] + "&"})
        return newObj;
    }
   
}