import { IMedia } from './../../Interfaces/IMedia';
import { Injectable } from "@angular/core";
/// <reference path="../../typings/azuremediaplayer.d.ts" />  

export interface IMediaPlayerOpcoes extends amp.Player.Options {
    classe?: string,
    texto?: string,
    width?: number | string,
    height?: number | string 
}

export interface IMediaPlayerVideo {
    src: string,
    type: string
}

@Injectable()

    export class MediaPlayer {

        private _elemento: JQuery;
        private _azureMediaPlayer: amp.Player;
        // Vídeo -------------------
        private _video: IMediaPlayerVideo;

        getVideo(): IMediaPlayerVideo {
            return this._video;
        }

        setVideo(valor: IMediaPlayerVideo): MediaPlayer {
            this._video = $.extend(this._video, valor);
            //console.log(this._video)
            this._azureMediaPlayer.pause();
            this._azureMediaPlayer.src([this._video]);
            // this._azureMediaPlayer.play();
            return this;
        }

        apple(midia : IMedia[]) : any {   
               
            let obj = {
                midia: null,
                apple: false
            }

            if(midia.length > 1 && /iPad|iPhone|iPod/.test(navigator.userAgent)) {
                obj.midia = midia[0];
                obj.apple = true;
            } else if(midia.length > 1 && !/iPad|iPhone|iPod/.test(navigator.userAgent)) {
                obj.midia = midia[0];
                obj.apple = false;
            } else {
                obj.midia = midia[0];
                obj.apple = false;
            }

            return obj;               
        }

        // Controles ---------------------
        play(): MediaPlayer {
            this._azureMediaPlayer.play();
            return this;
        }

        pause(): MediaPlayer {
            this._azureMediaPlayer.pause();
            return this;
        }

        dispose() {
            this._azureMediaPlayer.dispose();
        }

        stop(): MediaPlayer {
            this._azureMediaPlayer.currentTime(0);
            this._azureMediaPlayer.pause();
            return this;
        }

        pausado() : boolean { 
            return this._azureMediaPlayer.paused(); 
        } 

        getTempoAtual(): number {
            return this._azureMediaPlayer.currentTime();
        }

        setTempoAtual(segundos: number): MediaPlayer {
            this._azureMediaPlayer.currentTime(segundos);
            return this;
        }

        ended() : boolean {
            return this._azureMediaPlayer.ended();
        }

        avancar(segundos: number): MediaPlayer {
            segundos = this._azureMediaPlayer.currentTime() + segundos;
            this._azureMediaPlayer.currentTime(segundos);
            return this;
        }

        voltar(segundos: number): MediaPlayer {
            segundos = this._azureMediaPlayer.currentTime() - segundos;
            this._azureMediaPlayer.currentTime(segundos);
            return this;
        }

        mudo(valor: boolean): MediaPlayer {
            this._azureMediaPlayer.muted(valor);
            return this;
        }

        setVolume(percentual: number): MediaPlayer {
            this._azureMediaPlayer.volume(percentual);
            return this;
        }

        getVolume(): number {
            return this._azureMediaPlayer.volume();
        }

        // Opções
        private _opcoes: IMediaPlayerOpcoes;

        getOpcoes(): IMediaPlayerOpcoes {
            return this._opcoes;
        }

        setOpcoes(valor: IMediaPlayerOpcoes): MediaPlayer {
            this._opcoes = $.extend(this._opcoes, valor);
            this._azureMediaPlayer.options(this._opcoes);
            return this;
        }

        isFullScreen() {
            return this._azureMediaPlayer.isFullscreen();
        }

        fadeIn(time: number) {
            this._elemento.parent().fadeIn(time);
        }

        fadeOut(time: number) {
            this._elemento.parent().fadeOut(time);
        }

        getDuracao() : number {
            return this._azureMediaPlayer.duration();
        }

        // Construtor
        public constructor(id: string, opcoes?: IMediaPlayerOpcoes) {
            var _ref: JQuery = $('#' + id);
            console.log(_ref)
            this._elemento = _ref;
            opcoes = $.extend({
                techOrder: ["azureHtml5JS", "flashSS", "html5FairPlayHLS", "silverlightSS", "html5"],
                nativeControlsForTouch: false,
                width: "100%",
                height: "340px",
                controls: true,
                autoplay: true,
                logo: { "enabled": false }
            }, opcoes);
            
            amp.options.flashSS.swf = "//amp.azure.net/libs/amp/latest/techs/StrobeMediaPlayback.2.0.swf";
            amp.options.silverlightSS.xap = "//amp.azure.net/libs/amp/latest/techs/SmoothStreamingPlayer.xap";
            
            this._azureMediaPlayer = amp(id, opcoes);
            this._opcoes = $.extend(this._azureMediaPlayer.options(), opcoes);
        }

        public toggleClass() {
            $(".video-change").toggleClass("hide-change-video");
        }
    }