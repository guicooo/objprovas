import { IServidorSlide } from './../../Interfaces/IServidoresSlide';
import { ISlide } from './../../Interfaces/ISlide.';
import { Injectable } from "@angular/core";

@Injectable()

    export class Slides implements ISlide {

        private _elemento: JQuery;
        public id: string;
        public tempo: string;
        public tipo: string;
        public comando: string;
        public status: boolean;
        public $slide: JQuery;
        public rotulo: string;
        public diretorio: string;
        public descricao: string;
        public criadoEm: Date;
        public alteradoEm: Date;
        public arquivos: string[];
        public servidores: IServidorSlide[];


        constructor(elemento: JQuery) {
            this._elemento = elemento;
            // data ? this.popularTemplate(data) : null;            
        }

        public popularTemplate(data: ISlide, index: number) {
            this._elemento.empty();
            this.tempo = data.tempo;
            this.comando = data.comando;
            this.tipo = data.tipo;
            this.status = data.status;
            this.id = data.id;

            // Verifica se é JPG ou um IFrame, se for true é JPG senao iframe.
            if(this.verificarComando(data.comando))
                this._elemento.append(`<div class='box-slide'><img tempo='${data.tempo}' tipo='${data.tipo}' id='${index}' comando=${data.comando} src='${data.comando}'/></div>`);
            else 
                this._elemento.append(`<div class='box-slide'><img tempo='${data.tempo}' tipo='${data.tipo}' id='${index}' comando=${data.comando} src='./Assets/Images/iframe.jpg'/></div>`);
            
            
            this.$slide = this._elemento.find('img');
        }      

        public ativarSlide(target) {
            this.$slide.removeClass('active');
            $(target).addClass('active');
        }

        public verificarComando(comando: string) { 
            return /.jpg/.test(comando) ? true : false;
        }

        /** Função que sincroniza os Slides pegando o tempo atual do video.
         * Filtra a lista de slides, procurando todos os slides que o tempo atual é maior
            Para futuramente pegar o último slide da lista FILTRADA e ativar o mesmo.

             const lstTempo = lstSlide.filter(
                x => tempoVideo > this.timeToSeconds(x.tempo)
            );

            // Remove o ultimo slide da lista ( Teoricamente o que deveria estar ativo. )
            const novoSlide = lstTempo.pop();       

            // Verifica se o elemento que foi encontrado, é diferente do atual, se for ativa se não retorna com o campo null
            // Para verificação fora do componente.
            if(this._elemento.find('.active').attr('id') == novoSlide.id)
            { 
                novoSlide.comando = null;
                return novoSlide;  
            }
                 
            // Remove a classe ativo 
            this.$slide.removeClass('active');

            // Adiciona a classe ativa no Slide "novo"
            $('#' + novoSlide.id).addClass('active');

            // Rola o Scroll para que mantenha sempre o Slide na tela.
            this._elemento.parent().animate({ 'scrollLeft': ($('#' + novoSlide.id).position().left - 9) }, 500);

            // Retorna o caminho da imagem, para ativar no Slide grande.
            return novoSlide.comando; */

        public sincronizarSlide(tempoVideo: number, lstSlide: ISlide[]): ISlide {

            
            const lstTempo = lstSlide.filter(
                x => tempoVideo >= this.timeToSeconds(x.tempo)
            );
            
            const novoSlide = lstTempo.pop(); 
          
            if(!novoSlide)       
                return;
                
            if(this._elemento.find('.active').attr('id') == novoSlide.id)
            { 
                novoSlide.comando = null;
                return novoSlide;  
            }               
           
            this.$slide.removeClass('active');
            $('#' + novoSlide.id).addClass('active');             
            this.mudarScroll(novoSlide.id);
          
            return novoSlide;

        }
       
        public mudarScroll(id: string){
            this._elemento.parent().animate({ 'scrollLeft': ($('#' + id).position().left - 9) }, 500);
        }

        public alterarWidth(qtd: number){
            if ($(window).width() < 768)   
                this._elemento.width(qtd * 145);
            else            
                this._elemento.width(qtd * 180);                        
        }

        /** Converte o tempo string 00:00:00.0000, para segundos */
        private timeToSeconds(tempo) {

            const time = tempo.split(/:/);
            const segundos = time[2].split('.');
            const horas = time[0] * 3600;
            const minutos = time[1] * 60;

            return (horas + minutos + parseFloat(segundos[0]));
        }

        public esconder(param){
            param ? this._elemento.toggleClass('hide-change-video') :  null;
        }    
    }