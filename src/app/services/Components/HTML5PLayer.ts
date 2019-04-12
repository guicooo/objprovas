import { IHTML5Player } from './../../Interfaces/IHTML5Player';
import { Injectable } from "@angular/core";

@Injectable()

    export class HTML5Player implements IHTML5Player{
        private _elemento: JQuery;
        private _source: JQuery;       
        private _video: HTMLVideoElement;
        
        constructor(elemento: JQuery){
            this._elemento = elemento;
            this.montarTemplate();
            this._source = this._elemento.find('source');
            this._video = <HTMLVideoElement><any>document.getElementById("player");
        }

        private montarTemplate(){
            const dados = `<video id="player" controls="controls" autoplay="autoplay" tabindex="1">                	        
                                <source src="" type="">                                                    
                           </video>`;

            this._elemento.append(dados);
        }
        public pausado() : boolean{ 
            return this._video.paused; 
        } 
        public mostrar(){
            this._source.fadeIn(300);
        }

        public esconder(){
            this._elemento.find('source').attr('src', '')
            this._source.fadeOut(300);
        }

        public getTempoAtual(){
            return this._video.currentTime;
        }

        public setTempoAtual(segundos: number){
            this._video.currentTime = segundos;          
        }

        public play() {           
           this._video.play();
        }

        public pause() {           
            this._video.pause();
        }

        public toggleClass(){
            $(".video-change").toggleClass("hide-change-video");
        }

        get src() : string { 
            return this._source.attr('src');
        } 

        set src(src:string) { 
            this._source.attr('src', src);
        }  

        get type() : string { 
            return this._source.attr('type');
        } 

        set type(type:string) { 
            this._source.attr('type', type);
        }  

    }