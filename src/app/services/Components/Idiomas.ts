import { ILegendas } from './../../Interfaces/ILegendas';
import { Injectable } from "@angular/core";

enum EIdiomas {        
    'pt' = <any>'Português',
    'en' = <any>'Inglês',
    'es' = <any>'Espanhol',
    'de' = <any>'Alemão',
    'ja' = <any>'Japonês'        
}

@Injectable()

    export class Idiomas {
        private _elemento: JQuery;

        constructor(elemento: JQuery){
            this._elemento = elemento;
        }

        public popularTemplate(data: ILegendas[]){
            this._elemento.empty();
            $.each(data, (index, value) => {
                const dados = `<option value="${value.idioma}" class="active">${EIdiomas[value.idioma]}</option>`;
                this._elemento.append(dados);
            });           
        }

        public ativo() {          
            return this._elemento.find('.active').val() ? this._elemento.find('.active').val().toString() : '';
        }

    }