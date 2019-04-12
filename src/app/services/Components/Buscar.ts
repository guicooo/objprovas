import { ILegendas } from './../../Interfaces/ILegendas';
import { IMarcacoes } from './../../Interfaces/IMarcacoes';
import { Injectable } from "@angular/core";

@Injectable()

    export class Buscar {

        private _elemento: JQuery;       
        public $buscar: JQuery;
        public $input: JQuery;
        public $p: JQuery;

        constructor(elemento: JQuery){
            this._elemento = elemento;
            this.$input = $('.buscar-aba').find('input');
            this.$buscar = $('.btn-default');
        }
        private montarTemplate(data: IMarcacoes[], texto: string){         
          
            $.each(data, (index, value) => {  
                const dados = `<p class="legenda" inicio="${value.inicio}" fim="${value.termino}">${value.texto.replace(new RegExp('(' + texto + ')', 'gi'), '<b>' + texto + '</b>')}</p>`;
                this._elemento.append(dados);
            });  
            // console.log(this._elemento)
            this.$p = this._elemento.find('p');
            
            
        }

        public buscarPalavra(paragrafos: ILegendas, texto: string){
            this._elemento.empty();
            const arrays = paragrafos.marcacoes.filter(x => x.texto.toLowerCase().indexOf(texto.toLowerCase().trim()) != -1);
           
            if(arrays.length > 0)
                this.montarTemplate(arrays, texto);
            else
                this._elemento.append('<div class="alert alert-danger" role="alert">Nenhum resultado foi encontrado!</div>')
        }

        private vincularEvent() {
            // Evento de keypress no enter
            $(window).keydown((e) => {       
                if (e.which ===  13)   
                    this.$buscar.trigger('click');
            });
        } 
    }

