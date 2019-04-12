import { Injectable } from "@angular/core";

/// <reference path="../_todos.d.ts" />


(<any>$.fn).hasAttr = function (value: string) : boolean {
    var attr: any = $(this).attr(value);
    return typeof attr !== typeof undefined && attr as boolean !== false;
}

export interface JQuery {
    hasAttr(value: string): boolean
}

@Injectable()

    export class Auxiliares {

    

    ehNulo(valor) {
        return !(typeof valor !== typeof undefined && valor as boolean !== false);
    }

    ehNuloOuVazio(valor) {
        return this.ehNulo(valor) || $.trim(valor) == '';
    }

    naoEhNulo(valor) {
        return !this.ehNulo(valor);
    }

    naoEhNuloOuVazio(valor) {
        return !this.ehNuloOuVazio(valor);
    }

    corrigirData(valor) {

        if (this.naoEhNulo(valor)) {
            var data:Date = new Date();
            var regra = new RegExp('^[0-9]+$');
            var valores: any[] = $.trim(valor).replace(/[ ]{2,}/ig, ' ').replace(/[ ]/ig, '/').split('/');
            valores[0] = this.ehNuloOuVazio(valores[0]) ? data.getDate() : regra.test(valores[0]) ? parseInt(valores[0]) : data.getDate();
            valores[1] = this.ehNuloOuVazio(valores[1]) ? (data.getMonth() + 1) : regra.test(valores[1]) ? parseInt(valores[1]) : (data.getMonth() + 1);
            valores[2] = this.ehNuloOuVazio(valores[2]) ? data.getFullYear() : regra.test(valores[2]) ? valores[2] : data.getFullYear();
            
            valores[0] = valores[0] < 10 ? '0' + valores[0] : valores[0].toString();
            valores[1] = valores[1] < 10 ? '0' + valores[1] : valores[1].toString();
            valores[2] = valores[2].length == 1 ? '0' + valores[2] : valores[2].toString();
    
            if (valores[2].length == 3) {
                valores[2] = '0' + valores[2];
            } else if (valores[2].length == 2) {
                if (valores[0] != '00' || valores[1] != '00' || valores[2] != '00') {
                    valores[2] = data.getFullYear().toString().substr(0, 2) + valores[2];
                } else {
                    valores[2] = '00' + valores[2];
                }
            }

            valor = valores[0] + '/' + valores[1] + '/' + valores[2];
        }

        return valor;
    }

    corrigirHora(valor) {
        var regra = new RegExp('^[0-9]+$');
        var minutos: any = 0;
        var horas: any = 0;
        var segundos: any = 0;
        var valores: string[] = [];

        valor = $.trim(valor);
        if (valor != '') {
            valor = valor.replace(/[^0-9: ]+/ig, ' ');
            valor = valor.replace(/[ ]{2,}/ig, ' ');
            valor = $.trim(valor);
            if (regra.test(valor)) {
                minutos = parseInt(valor);
            } else {
                valores = valor.split(':');
                horas = regra.test(valores[0]) ? parseInt(valores[0]) : 0;
                minutos = regra.test(valores[1]) ? parseInt(valores[1]) : 0;
                segundos = regra.test(valores[2]) ? parseInt(valores[2]) : 0;
            }
            minutos = minutos + ((segundos - (segundos % 60)) / 60);
            horas = horas + ((minutos - (minutos % 60)) / 60);
            segundos = segundos % 60;
            minutos = minutos % 60;
            horas = horas < 10 ? "0" + horas : horas;
            minutos = minutos < 10 ? "0" + minutos : minutos;
            segundos = segundos < 10 ? "0" + segundos : segundos;
            valor = horas + ':' + minutos + ':' + segundos;

            return valor;
        }
    }

    tempoStr(tempo) {
        var segundos, minutos, horas;
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

    tempoNum(tempo) {
        var valores = $.trim(tempo).split(':');
        return ((parseInt(valores[0]) * 60) + parseInt(valores[1])) * 60 + parseInt(valores[2]);
    }

    htmlTrim(valor) {
        if (valor != null && valor) {
            var pattern = "^(\b|(&nbsp;)*|[ ]*)+";
            pattern = pattern + "|(\b|(&nbsp;)*|[ ]*)+$";
            var reg = new RegExp(pattern, "igm");
            valor = valor.replace(reg, '');
            // Hack para IE ----------------------
            pattern = "^(<[\\/ ]*br[\\/ ]*>)+";
            reg = new RegExp(pattern, "igm");
            valor = valor.replace(reg, '');
            pattern = "(<[\\/ ]*br[\\/ ]*>)+$";
            reg = new RegExp(pattern, "igm");
            valor = valor.replace(reg, '');
            // ------------------------------------
            valor = $.trim(valor);
        }
        return valor;
    }

    urlAmigavel(valor) {
        if (valor != null && valor) {
            valor = $.trim(valor.toLowerCase());
            valor = valor.replace(/[âãàáä]/ig, 'a');
            valor = valor.replace(/[êèéë]/ig, 'e');
            valor = valor.replace(/[îìíï]/ig, 'i');
            valor = valor.replace(/[ôõòóö]/ig, 'o');
            valor = valor.replace(/[ûùúü]/ig, 'u');
            valor = valor.replace(/[ç]/ig, 'c');
            valor = valor.replace(/[^a-z0-9]+/ig, '_');
            valor = valor.replace(/-{2,}/ig, '_');
            valor = valor.replace(/^_+/ig, '');
            valor = valor.replace(/_+$/ig, '');
        }
        return valor;
    }

    Guid() {
        function S4() {
            return (((1+Math.random())*0x10000)|0).toString(16).substring(1); 
        }
        return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
    }
}

// Create Base64 Object
var Base64 = { _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", encode: function (e) { var t = ""; var n, r, i, s, o, u, a; var f = 0; e = Base64._utf8_encode(e); while (f < e.length) { n = e.charCodeAt(f++); r = e.charCodeAt(f++); i = e.charCodeAt(f++); s = n >> 2; o = (n & 3) << 4 | r >> 4; u = (r & 15) << 2 | i >> 6; a = i & 63; if (isNaN(r)) { u = a = 64 } else if (isNaN(i)) { a = 64 } t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr.charAt(a) } return t }, decode: function (e) { var t = ""; var n, r, i; var s, o, u, a; var f = 0; e = e.replace(/[^A-Za-z0-9+/=]/g, ""); while (f < e.length) { s = this._keyStr.indexOf(e.charAt(f++)); o = this._keyStr.indexOf(e.charAt(f++)); u = this._keyStr.indexOf(e.charAt(f++)); a = this._keyStr.indexOf(e.charAt(f++)); n = s << 2 | o >> 4; r = (o & 15) << 4 | u >> 2; i = (u & 3) << 6 | a; t = t + String.fromCharCode(n); if (u != 64) { t = t + String.fromCharCode(r) } if (a != 64) { t = t + String.fromCharCode(i) } } t = Base64._utf8_decode(t); return t }, _utf8_encode: function (e) { e = e.replace(/rn/g, "n"); var t = ""; for (var n = 0; n < e.length; n++) { var r = e.charCodeAt(n); if (r < 128) { t += String.fromCharCode(r) } else if (r > 127 && r < 2048) { t += String.fromCharCode(r >> 6 | 192); t += String.fromCharCode(r & 63 | 128) } else { t += String.fromCharCode(r >> 12 | 224); t += String.fromCharCode(r >> 6 & 63 | 128); t += String.fromCharCode(r & 63 | 128) } } return t }, _utf8_decode: function (e) { var t = ""; var n = 0; var c1, c2, c3; var r = c1 = c2 = 0; while (n < e.length) { r = e.charCodeAt(n); if (r < 128) { t += String.fromCharCode(r); n++ } else if (r > 191 && r < 224) { c2 = e.charCodeAt(n + 1); t += String.fromCharCode((r & 31) << 6 | c2 & 63); n += 2 } else { c2 = e.charCodeAt(n + 1); c3 = e.charCodeAt(n + 2); t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63); n += 3 } } return t } }

if (!window.btoa) {
    window.btoa = function (input): string {
        return Base64.encode(input);
    }
}
