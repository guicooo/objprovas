import { Injectable } from "@angular/core";

@Injectable()

    export class Apoio {
        private _elemento: JQuery;
        private _img: JQuery;
        private _iframe: JQuery;

        constructor(elemento: JQuery){
            this._elemento =  elemento;
            this._img = this._elemento.find('img');
            this._iframe = this._elemento.find('iframe');            
        }

        public trocarSlide(src: string){
            this._img.parent().fadeIn(300);
            this._iframe.parent().fadeOut(100);           
            this._img.attr('src', src);
        }

        public trocarIframe(src: string, width?: string, height?: string){
            this._iframe.attr('src', src);
            this._iframe.parent().fadeIn(300);
            this._img.parent().fadeOut(100);
            width ? this._iframe.attr('width', width) : null;
            height ?  this._iframe.attr('height', height) : null;
        }
        
        public toggleClass(){
            this._elemento.toggleClass('hide-change-video');
        }

        public aparecer(){
            this._elemento.removeClass('hide-change-video');
        }

        public esconder(){
            this._elemento.addClass('hide-change-video');
        }
    }