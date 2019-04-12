import { Injectable } from '@angular/core';
import { Shared } from '../Components/Shared';

@Injectable()
  export class Service{ 

    private _url : string; 
    private _headers : any; 
    private _body : any;
    private _type : string; 
    private _async : boolean;
    private _baseURL : string;
    private _contentType : string;
    private _apiary : string;
    private _chaveAcesso: string;
    private _shared: Shared;
    constructor(
    
      url:string, 
      type:string,  
      body?:any, 
      headers?:any,  
      async?: boolean, 
      contentType?: string, 
      apiary?: boolean,
      ){ 
      
      this._baseURL = 'http://tvweb3.unip.br/api/';
      // this._baseURL = 'http://200.174.103.116/portaltvweb/api/';  

      // this._baseURL = '/api/'; // usar esse para PRODUÇÃO por causa do https
      
      // this._baseURL = '/portaltvweb/api/';   
      
      this._shared = new Shared();
      this._apiary = apiary ? this._baseURL = '' : this._baseURL;      
      this._url = url;       
      this._type = type; 
      this._headers = headers; 
      this._body = body;    
      this._async = async != false ? true : false;       
      this._contentType =  contentType ? contentType : 'application/x-www-form-urlencoded';
      this._chaveAcesso = this._shared.getCookie('login') ? JSON.parse(this._shared.getCookie('login')).chaveAcesso: '';
      this._shared = new Shared();
    } 
  
    get url() : string { 
      return this._url; 
    } 

    set url(url:string) { 
      this._url = url; 
    }  
  
    get headers() : Object { 
      return this._headers; 
    } 

    set headers(headers:Object) { 
      this._headers = headers; 
    } 
  
    get body() : any { 
      return this._body; 
    } 

    set body(body:any) { 
      this._body = body; 
    } 
  
    public executar(contentType?:any): any { 
         
      return $.ajax({ url: this._baseURL + this._url,
                    method: this._type,        
                    headers: this._headers ? this._headers : {         
                      "chavePublica":"32D69BD2-9E51-4199-AD01-7C6758DC0C8C",
                      "chaveAcesso": this._chaveAcesso,
                      "origem": document.referrer
                    },
                    processData: false,
                    contentType: contentType != undefined || null ? contentType : this._contentType,
                    async: this._async,
                    data: this._body ? this._body : undefined
                  }).done((data) => { this._shared.verificaValorNulo(data)});       
    } 

 

  }     
  