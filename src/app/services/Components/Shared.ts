import { Injectable } from '@angular/core';



@Injectable()

    export class Shared {

        public verificarNavegador() 
        {
            const ua = window.navigator.userAgent;
            const msie = ua.indexOf("MSIE ");
        
            // Verifica apenas as versões abaixo do 11, porque são as que não são compativeis.
            if (msie > 0) 
               window.location.href =  $('body').attr('baseurl') + 'Home/Error'
            
        }

        public secondsToTime(valor: string) {
         
            var sec_num = parseInt(valor, 10); // don't forget the second param
            var hours   = Math.floor(sec_num / 3600);
            var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
            var seconds = sec_num - (hours * 3600) - (minutes * 60);
        
            if (hours   < 10) {hours   = <any>"0"+hours;}
            if (minutes < 10) {minutes = <any>"0"+minutes;}
            if (seconds < 10) {seconds = <any>"0"+seconds;}

           
            return hours+':'+minutes+':'+seconds;
        }

        public timeToSeconds(tempo) {
   
            const time = tempo.split(/:/);
            const segundos = time[2].split('.');
            const horas = time[0] * 3600;
            const minutos = time[1] * 60;
          
            return (horas + minutos + parseFloat(segundos[0]));
        }
        
        /** Esse método converte um event jQuery em um objeto especifico
            Percorre as propriedades para descobrir qual propriedade do objeto existe no event 
            Monta um novo objeto e retorna o mesmo. */
        public converterEvento(event: Event, data: Object) {
            let objeto = {}      
            //console.log(data);
            for (var key in data) {                 
                if ($(event.target).attr(key))                       
                    objeto = $.extend(objeto , { [key]: $(event.target).attr(key) })                
            }
            
            return objeto;
        }
        public getEvento() : string {
            return  window.location.href.substr(window.location.href.lastIndexOf('/') + 1).slice(0, 36);
        }

        public getVideo() : string {
            const Id = new RegExp('[\?&]video=([^&#]*)').exec(location.href);           
            return Id ? Id[1] : '';
        }

        public getTransmissao() : string {
            const Id = new RegExp('[\?&]id=([^&#]*)').exec(location.href);           
            return Id ? Id[1] : '';
        }

        public getID() : string {
            const Id = new RegExp('[\?&]midia=([^&#]*)').exec(location.href);           
            return Id ? '?midia=' + Id[1] : '';
        }

        public getMidiaVideo() : string {
            const Id = new RegExp('[\?&]midia=([^&#]*)').exec(location.href); 
            return Id ? Id[1] : '';
        }
        
        public getLocal() : string {
            const Id = new RegExp('[\?&]diretorio=([^&#]*)').exec(location.href);           
            return Id ? '&diretorio=' + Id[1] : '';
        }

        public getInstituto() : string {
            const instituto = new RegExp('[\?&]instituto=([^&#]*)').exec(location.href);             
            return instituto ? instituto[1] ? instituto[1] : 'default' : null;
        }
        
        public verificarTipo(url: string) : string {
            if(url.match(/(format=m3u8-aapl)/gi))
                return 'application/x-mpegURL';
            else if(url.match(/(.mp4)/gi)) 
                return 'application/vnd.ms-sstr+xml';
            else if(url.match(/(manifest)/gi))
                return 'application/vnd.ms-sstr+xm';     
            else       
                return '';
        }
        
        public ehNulo(valor: any): boolean {
            if(!valor) return true;           
        }

        public verificaValorNulo(data: any) {
           
            $.each(data, (index, value) => {
                // for(let x in value)
                // {   
                //     value[x] != null && value[x] != undefined ? value[x] = value[x] : value[x] = '';
                //     data[index].x = value[x];
                // }                    

                data = value;
            });
          
            return data;
        }

        public ehData(valor: string) : boolean {
          
            if(valor)
            {
                const ano = valor.split("-");
                const count = valor.match(new RegExp("-", "gi"));
                const countT = valor.match(new RegExp("T"));
            
                if(ano[0].length == 4 && ano[0].charAt(0) == "2" && (count && countT) && (count.length == 2 && countT.length == 1))
                    return true;
                else
                    return false;
            }  

            return false;          
        }

        public tratarData(valor: string) {           
            if(valor) {   
                const data = new Date(valor);    
                let mes:any = data.getMonth() + 1;
                let dia: any = data.getDate();
                mes = mes < 10 ? "0" + mes : mes;
                dia = dia < 10 ? '0' + dia : dia;

                valor = dia + '/' + mes + '/' + data.getFullYear(); 
            }
        
            return valor;
        }

        public tratarDateInput(valor: string) {           
            if(valor) {   
                const data = new Date(valor);      
                let mes:any = data.getMonth() + 1;
                let dia:any = data.getDate();
                mes = mes < 10 ? "0" + mes : mes; 
                dia = dia < 10 ? "0" + dia : dia; 

                valor = data.getFullYear() + '-' + mes + '-' + dia; 
             }
        
            return valor;
        }
        public setCookie(nome, valor, minutos?) {    
          
            var expires = "";
            var date = new Date();
            var midnight = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59);
            expires = "; expires=" + midnight.toUTCString();            
            
            valor = encodeURIComponent(valor)                      
            document.cookie = nome + "=" + valor  + expires + ";path=/";          
          
        }

        public getCookie(nome) {
            var name = nome + "=";
           
            var decodedCookie = decodeURIComponent(document.cookie);
            var resultadoSplit = decodedCookie.split(';');

            for(var i = 0; i < resultadoSplit.length; i++) {
                var item = resultadoSplit[i];
                while (item.charAt(0) == ' ') {
                    item = item.substring(1);
                }
                if (item.indexOf(name) == 0) {
                    return item.substring(name.length, item.length);
                }
            }

            return "";
        }

        public checkCookie(nome:string) {
            
            var valor = this.getCookie(nome);
            valor = decodeURIComponent(valor);

            if(valor != "" && valor != null){
                return $.parseJSON(valor);
            }else{
                return "";
            }
        }
        
        public limpaCookie(nome:string) {
            this.setCookie(nome,"",new Date());
        }

        public convertMilisegundos(milisegundos) {
            var ms = milisegundos % 1000;
            milisegundos = (milisegundos - ms) / 1000;
            var secs = milisegundos % 60;
            milisegundos = (milisegundos - secs) / 60;
            var mins = milisegundos % 60;
            var hrs = (milisegundos - mins) / 60;

            return hrs + ':' + mins + ':' + secs + '.' + ms;
        }
        public tratarDataEHora(valor) {
            let data = this.tratarData(valor);
            data += ' ' + this.tratarHora(valor);
            return data;
        }

        public tratarAoVivo(valor: any) : any {
            return <boolean>valor ? 'Sim' : 'Não'
        }
        
        public tratarHora(valor: string) {
            if(valor) 
            {               
                const data = new Date(valor);
                const horas = data.getHours() < 10 ? "0" + data.getHours() : data.getHours();
                const minutos = data.getMinutes() < 10 ? "0" + data.getMinutes() : data.getMinutes();
                const segundos = data.getSeconds() < 10 ? "0" + data.getSeconds() : data.getSeconds();
                return valor = horas + ':' + minutos + ':' + segundos;
            }
            return '';
        }

        public convertMes(mes:number){            
            var month = new Array();
            month[0] = "Janeiro";
            month[1] = "Fevereiro";
            month[2] = "Março";
            month[3] = "Abril";
            month[4] = "Maio";
            month[5] = "Junho";
            month[6] = "Julho";
            month[7] = "Agosto";
            month[8] = "Setembro";
            month[9] = "Outubo";
            month[10] = "Novembro";
            month[11] = "Dezembro";
            return month[mes];
        }

        public ativarLoader(){    
    
            $('body').append(`
              <div class="full-loader">                
                  <div class='demo'>
                      <div class='circle'>
                          <div class='inner'></div>
                      </div>
                      <div class='circle'>
                          <div class='inner'></div>
                      </div>
                      <div class='circle'>
                          <div class='inner'></div>
                      </div>
                      <div class='circle'>
                          <div class='inner'></div>
                      </div>
                      <div class='circle'>
                          <div class='inner'></div>
                      </div>
                  </div>
              </div> `);
            
          }
        
          public desativarLoader(){
            // Remove o Loader da tela com animação.
            $('.full-loader').fadeOut(300, () => {  $('.full-loader').remove(); });
          }
        
          public loader(){   
            // Analisa sozinho as requisições ajax e poem o loader automaticamente.
            $(document)
              .ajaxSend(() => {    
               
                // Verifica se já não possui um Loader na tela.                  
                if($('.full-loader').length === 0) {
                $('body').append(`
                    <div class="full-loader">                
                        <div class='demo'>
                            <div class='circle'>
                                <div class='inner'></div>
                            </div>
                            <div class='circle'>
                                <div class='inner'></div>
                            </div>
                            <div class='circle'>
                                <div class='inner'></div>
                            </div>
                            <div class='circle'>
                                <div class='inner'></div>
                            </div>
                            <div class='circle'>
                                <div class='inner'></div>
                            </div>
                        </div>
                    </div> `);
                }
              }).ajaxStop(() => {    
                // Remove o Loader da tela com animação.
                $('.full-loader').fadeOut(300, () => {  $('.full-loader').remove(); });
              });
            
          }

          public formToJSON(form) {
            const obj = {};
            const elements = form.find('input, select, textarea, input:checkbox');
            for(let i = 0; i < elements.length; i = i + 1) {
              const element = elements[i];
              const name = element.name;
              const value = element.value;
              
              if(name) {
                obj[ name ] = value;
              }
            }
         
            return JSON.stringify(obj);
          }

          public limparFormulario(formulario:JQuery){

            $(document).on('click', '.limpaForm', (event) => {

                event.preventDefault();
                formulario.find('input').val('')
            })
        }

        public senhaDownUp (){
            $( ".mostrarSenha1" ).mousedown(function() {
                $("#senha").attr("type", "text");
            });
              
            $( ".mostrarSenha1" ).mouseup(function() {
                $("#senha").attr("type", "password");
            });

            $( ".mostrarSenha2" ).mousedown(function() {
                $("#nova-senha").attr("type", "text");
            });
              
            $( ".mostrarSenha2" ).mouseup(function() {
                $("#nova-senha").attr("type", "password");
            });
        }

    }