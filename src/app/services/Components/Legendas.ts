import { MediaPlayer } from './../bibliotecas/mediaPlayer';
import { IMarcacoes } from './../../Interfaces/IMarcacoes';
import { ILegendas } from './../../Interfaces/ILegendas';

import { Injectable } from "@angular/core";
/// <reference path="../_todos.d.ts" /> 

(<any>$.fn).hasAttr = function (value: string) : boolean {
    var attr: any = $(this).attr(value);
    return typeof attr !== typeof undefined && attr as boolean !== false;
}

@Injectable()

    export class Legendas implements ILegendas {
        private  _elemento: JQuery;
        public arquivo: string;
        public idioma: string;
        public marcacoes: IMarcacoes[];
        public player: MediaPlayer;    

        public sincLegendaRef: number = 0;
        public sincLegendaPos: number = 0;
        public sincLegendaAltura: number = 18;
        public sincLegendaMover: number = 0;
        public sincLegendaMoverAtual: number = -1; 

        constructor(elemento: JQuery){
            this._elemento = elemento;
        } 

        public sincLegenda (playerGet:MediaPlayer, idiomaSinc?:string) {
            
            let sincLegendaRef: number = this.sincLegendaRef;
            let sincLegendaPos: number = this.sincLegendaPos;
            let sincLegendaAltura: number = this.sincLegendaAltura;
            let sincLegendaMover: number = this.sincLegendaMover;
            let sincLegendaMoverAtual: number = this.sincLegendaMoverAtual; 
            let self = this;

            $($(`#${idiomaSinc}`).get(this.sincLegendaPos)).find('> div').each(function (indice: number) {
                var tAtual = Math.floor(playerGet.getTempoAtual());
                var separador: boolean = (<any>$(this)).hasAttr('legenda-separador');
                var tInicio: number = separador ? -100 : self.tempoNum($(this).attr('inicio')) - 1;
                var tFim: number = separador ? -100 : self.tempoNum($(this).attr('fim')) - 1;
                var tDuracao = tFim - tInicio;
                var altura: number = $(this).height();
                var linhas: number = Math.floor(altura / sincLegendaAltura);
                var tFracao = tDuracao / linhas;

                //verifica se o tempo atual do video é maior do que o artributo de Inicio do serviço
                if (tAtual < tInicio) {
                    
                    if (sincLegendaMoverAtual != sincLegendaMover) {
                        sincLegendaMoverAtual = sincLegendaMover;
                        $(this).parent().stop().animate({
                            'margin-top': (sincLegendaMover * -1)
                        }, 400);
                        // console.warn('esperando...' + tAtual + ' | ' + tInicio);
                    }
                    
                    return false;

                } else if (tAtual >= tInicio && tAtual <= tFim) {                                       
               
                    for (var x: number = 1; x <= linhas; x++) {
                        if (tAtual <= (tInicio + tFracao * x)) {
                            sincLegendaMover += (sincLegendaAltura * x);
                            break;
                        }
                    }
                    // console.log('sincLegendaMoverAtual: ' + sincLegendaMoverAtual);
                    // console.log('sincLegendaMover: ' + sincLegendaMover);
                    if (sincLegendaMoverAtual != sincLegendaMover) {
                        sincLegendaMoverAtual = sincLegendaMover;
                        $(this).parent().stop().animate({
                            'margin-top': (sincLegendaMover * -1)
                        }, 400);
                        // console.warn('Movendo...');
                    }
                    return false;
                } else {
                    sincLegendaMover += altura;
                    // console.warn('Próximo...');
                }
            });
            sincLegendaMover = -1;
            //console.warn('sincLegendaMover...: ' + sincLegendaMover);

            this.sincLegendaRef = sincLegendaRef;
            this.sincLegendaPos = sincLegendaPos;
            this.sincLegendaAltura = sincLegendaAltura;
            this.sincLegendaMover = sincLegendaMover;
            this.sincLegendaMoverAtual = sincLegendaMoverAtual; 
        };

        public verificaTempo(playerGet:any, idiomaAtivo?:string){
            this.player = playerGet;  
                var emNumero: string = this.player.getTempoAtual().toString();
                var emTexto: string = this.tempoStr(this.player.getTempoAtual());
    
                $('#tempo').html(emTexto + ' / ' + emNumero);

                this.sincLegenda(playerGet, idiomaAtivo);
        }

        tempoNum(tempo: string): number {
            var valores: string[] = $.trim(tempo).split(':');
            return ((parseInt(valores[0]) * 60) + parseInt(valores[1])) * 60 + parseInt(valores[2]);
        }

        public popularTemplate(data: ILegendas, playerGet:MediaPlayer){
            
            
            var conta = 0;
            let dados:JQuery;
            let self = this;
            $('.ttml-item.ttml-item-active').remove();
            
            
            this._elemento.append(`<div id="${data.idioma}" class="ttml-item ttml-item-active" idioma-legenda="${data.idioma}" url-legenda=""><div>`);    
            
           $.each(data.marcacoes, (index, value) => {  
               
                dados = $('<div inicio="' + value.inicio + '" fim="' + value.termino + '" >' + value.texto + '</div>');
                dados.on({
                    'click': function () {
                        
                        var valor: any = self.tempoNum($(this).attr('inicio'));
                        playerGet.setTempoAtual(valor);
                    }
                });
                this._elemento.find(`#${data.idioma}`).append(dados);
                this._elemento.find(`#${data.idioma}`).append('<div legenda-separador>&emsp;</div>');  
                
            });   
        } 

        public sincronizarLegenda(tempoVideo: number){
            // const arrLegendas = this._elemento.find('p');
            // const offSet =  this._elemento.find('p').get(0).offsetTop * -1;
            //  $.each(arrLegendas, (index, value) => {
 
            //     if(tempoVideo > this.timeToSeconds(arrLegendas.get(index).attributes['inicio'].value) 
            //         && tempoVideo <  this.timeToSeconds(arrLegendas.get(index).attributes['fim'].value))                
            //     {   
            //        this._elemento.find('.active').html(this._elemento.find('.active').text());
            //        this._elemento.find('p').removeClass('active');
            //        arrLegendas[index].className = "legenda active";
            //        this._elemento.animate({scrollTop:this._elemento.find('.legenda.active')[0].offsetTop + offSet + 20}, '500');
            //     }
 
            //  });                 
        
        } 

        public atualizarIndicador(legendaAtiva, tempoVideo: number) {
            // const elemento  = <JQuery>legendaAtiva;
            // const palavras = elemento.text().toString().split(" ")
            // const qtdPalavras = elemento.text().toString().split(" ").length;  
            // const qtdVirgulas = elemento.text().toString().split(",").length;          
            // const tempoInicio = elemento.attr('inicio');
            // const tempoFim = elemento.attr('fim');
            // const difTempo =  this.timeToSeconds(tempoFim) - this.timeToSeconds(tempoInicio);
            // const difTempoAtual = (tempoVideo - this.timeToSeconds(tempoInicio));
            // const tempoPorPalavras = (difTempo / qtdPalavras);
            // let qtd = (difTempoAtual / tempoPorPalavras) + 3 + (qtdVirgulas/2);
            // const paragrafo =  this._elemento.find('.legenda.active');

            // let textoAtual = '';
 
            // if(qtd < 0)
            //     return;          
 
            // if(qtd >  qtdPalavras)
            //     qtd = qtdPalavras;
                   
            // for(var x = 0; x < parseInt(qtd.toFixed(0)); x = x + 1){               
            //     textoAtual = textoAtual + ' ' + palavras[x].trim();
            // };           
            
            // const complemento = paragrafo.text().trim().replace(textoAtual.trim(), "");
            
            // complemento 
            //         ?  this._elemento.find('.legenda.active').html("<b style=\"color:yellow\">" + textoAtual +  "</b>" + complemento)         
            //         :  this._elemento.find('.legenda.active').html("<b style=\"color:yellow\">" + textoAtual +  "</b>");    
            
        }

        public retornarLegendaAtiva(){
            return this._elemento.find('.active');
        }

        /** Busca qual legendas dentre o array de legendas carregados do serviço,
         *  está "ativo" de acordo com o DropDown de idiomas. */
        public legendaAtiva(idioma: string, array: ILegendas[]) :  ILegendas {             
            return array.filter(x => x.idioma == idioma).pop();
        }

        /** Converte o tempo string 00:00:00.0000, para segundos */
        private timeToSeconds(tempo) {

            const time = tempo.split(/:/);
            const segundos = time[2].split('.');
            const horas = time[0] * 3600;
            const minutos = time[1] * 60;

            return (horas + minutos + parseFloat(segundos[0]));
        }  

        tempoStr(tempo: number): string {
            var segundos, minutos, horas: any;
            tempo = Math.floor(tempo);
            segundos = tempo % 60;
            tempo = (tempo - segundos) / 60;
            minutos = tempo % 60;
            tempo = (tempo - minutos) / 60;
            horas = tempo;
        
            segundos = segundos < 10 ? "0" + segundos : segundos;
            minutos = minutos < 10 ? "0" + minutos : minutos;
            horas = horas < 10 ? "0" + horas : horas
        
            return horas + ':' + minutos + ':' + segundos;
        }
    }