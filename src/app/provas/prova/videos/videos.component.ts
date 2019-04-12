import { Component, OnInit, ViewContainerRef, OnDestroy } from '@angular/core';
import { AppService } from '../../../services/app.service';
import { ProvaService } from '../../../services/provas.service';
import { DomSanitizer } from '@angular/platform-browser';
import { AulaService } from '../../../services/aula.service';
import { Shared } from '../../../services/Components/Shared';
import { ToastsManager } from 'ng2-toastr';
import { MediaPlayer, IMediaPlayerVideo } from '../../../services/bibliotecas/mediaPlayer';
import { HTML5Player } from '../../../services/Components/HTML5PLayer';
import { Slides } from '../../../services/Components/Slides';
import { Legendas } from '../../../services/Components/Legendas';
import { Apoio } from '../../../services/Components/Apoio';
import { Idiomas } from '../../../services/Components/Idiomas';
import { Buscar } from '../../../services/Components/Buscar';
import { VideoService } from './videos.service';
import { ITransmissao } from '../../../interfaces/ITransmissao';
import { ISlide } from '../../../Interfaces/ISlide.';
import { IMarcacoes } from '../../../Interfaces/IMarcacoes';
import { ILegendas } from '../../../Interfaces/ILegendas';
import { IEvento } from '../../../Interfaces/IEvento';



@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss'],
  providers: [ AulaService, VideoService ]
})
export class VideosComponent implements OnInit, OnDestroy {
 
  public url;
  public titulo;
  public mostrar = false;
  public legendaAtiva;
  public idiomaAtivo: string = '';
  public shared = new Shared();     
  videoToken: any; 
  public video: MediaPlayer;  
  public htmlPlayer: HTML5Player;        
  public paragrafoAtivo = null;     
  public slides = new Slides($('.container-slide')); 
  public legendas = new Legendas($('#legenda')); 
  public apoio = new Apoio($('.conteudo-change')); 
  public idiomas = new Idiomas($('.select-header')); 
  public buscar = new Buscar($('#filtro')); 
  public idVideo = this.shared.getID();  
  public local = this.shared.getLocal();  
  public instituto = this.shared.getInstituto(); 
  public abaSlide = $('.slide-aba'); 
  public abaLegenda = $('.legenda-aba');     
  public dropIdiomas = $('.select-header'); 
  public btnTroca = $('.action1'); 
  public menu = $('.menu'); 
  public body = $('#body'); 
  public divVideo = $('.video-change'); 
    

  
  constructor(public appService: AppService, 
    private toastr: ToastsManager, 
    private _vcr: ViewContainerRef, 
    private sanitizer: DomSanitizer,
    private _aulaService: AulaService,
    private _videoService: VideoService) {
    
    this.toastr.setRootViewContainerRef(this._vcr); 
  }

  ngOnInit(): void {

    if(this.appService.videos.length > 0)
      this.obterVideo(this.appService.videos[0]);

    if(this.appService.videos.length > 1)
      this.mostrar = true;
   
  }
  
  ngOnDestroy() {
    // console.log(this.video)
    this.video ? this.video.dispose() : '';
    this.htmlPlayer ? this.htmlPlayer.esconder() : '';
    // $('#azuremediaplayer').remove();
  }

  obterVideo(idDoConteudo) {
    this._aulaService.obterAula(idDoConteudo).subscribe((data: any) => {                 
        this.titulo = data.videos[0].titulo;       
        let token = new RegExp('[\?&]urlvideo=([^&#]*)').exec(data.videos[0].player);                       
        this.url = token ? token[1] : ''; 
        this.montarPlayer(this.url)           
    })
  }
  
  montarPlayer(midia: string) {
    $('#body').removeClass();
    //this.video ? this.video.dispose() : '';
    this.htmlPlayer ? this.htmlPlayer.esconder() : '';
    $('#player').remove();

    this.legendaAtiva = null;

    this.video = new MediaPlayer('azuremediaplayer');  
       
    this.paragrafoAtivo = null;     
    this.shared = new Shared();     
    this.slides = new Slides($('.container-slide')); 
    this.legendas = new Legendas($('#legenda')); 
    this.apoio = new Apoio($('.conteudo-change')); 
    this.idiomas = new Idiomas($('.select-header')); 
    this.buscar = new Buscar($('#filtro')); 
    this.idVideo = this.shared.getID();  
    this.local = this.shared.getLocal();  
    this.instituto = this.shared.getInstituto(); 
    this.abaSlide = $('.slide-aba'); 
    this.abaLegenda = $('.legenda-aba');     
    this.dropIdiomas = $('.select-header'); 
    this.btnTroca = $('.action1'); 
    this.menu = $('.menu'); 
    this.body = $('#body'); 
    this.divVideo = $('.video-change'); 

    this.idiomaAtivo = this.idiomas.ativo(); 
    this._videoService.obterVideo(midia)
            .subscribe((data) => {

              

            this.body.removeClass('no-slide'); 
            this.abaLegenda.removeClass('active'); 
            this.abaSlide.addClass('active'); 
            $('#tab-slide').addClass('active');                   
            this.divVideo.removeClass('col-lg-offset-3 col-md-offset-3 col-sm-offset-3'); 
            $('#tab-legenda').removeClass('active');
            this.body.css('opacity', 1); 
              
              // Converte o retorno do Servico para um Evento. 
              const transmissao = <ITransmissao>data; 

              // Verifica se é um dispositivo iOS e troca os Players 
              // Alguns vídeos não rodam no azure media player, tendo que rodar no player html5 
              // Caso só venha um video parte do principio de que funcionara nos 2.    
              const obj = this.video.apple(transmissao.midias);  
            
              if(obj.apple) { 
    
                  this.divVideo.empty();
                  this.htmlPlayer = new HTML5Player($('.video-change'));                             
                  this.htmlPlayer.src = obj.midia.local;
                  this.htmlPlayer.type = obj.midia.mimeType;
                  this.htmlPlayer.mostrar();   
                  $('.video-change').css('display', 'block');        
                  this.video = null; 
                  
              } else { 

                $('.video-change').append('<video id="azuremediaplayer" webkit-playsinline="true" playsinline="true" class="azuremediaplayer amp-default-skin amp-big-play-centered" tabindex="0"></video>')
                
                this.video.dispose();                
                this.video = new MediaPlayer('azuremediaplayer');  

                let iniciar: IMediaPlayerVideo  = {
                    src: obj.midia.local,
                    type: obj.midia.mimeType
                }  
                
                // Inicializa o video.          
                this.video.setVideo(iniciar);           
                // video.mudo(true);                 
                $('#video-azure').fadeIn(300); 
                this.video.play();              
                // $('.vjs-control-bar').attr('style', 'opacity: 1; z-index: 1; margin-bottom: -36px;');                 
              }  
              
              // Verifica se tem slides. 
             const arrSlide = transmissao.sinalizacoes; 
           
 
             // Ordeno pelo tempo, porque nem sempre pode vim ordenado.
             arrSlide.sort(function(a, b) { return a.tempo > b.tempo ? 1 : -1; });
 
             // Antigamente existia ID no slide, porém depois foi retirado
             // Então eu crio um "id" para não perder a referencia.
             $.each(arrSlide, (index, value) => {
                 arrSlide[index].id = index.toString();
             });
 
             if (arrSlide.length == 0) { 
                this.body.addClass('no-slide'); 
                this.abaLegenda.addClass('active'); 
                this.abaSlide.removeClass('active'); 
                $('#tab-slide').removeClass('active');                   
                this.divVideo.addClass('col-lg-offset-3 col-md-offset-3 col-sm-offset-3'); 
             } else if(arrSlide.length == 1){                 
                this.abaLegenda.addClass('active'); 
                this.abaSlide.removeClass('active');                 
                this.abaSlide.fadeOut(100)
                 $('#tab-slide').fadeOut(100); 
                
                 $.each(arrSlide, (index, value) => { 
                    this.slides.popularTemplate(value, index);  
                 });  
 
                 // Se vier apenas um Slide ou iFrame vai direto para ele.
                const handler = setInterval(() => { 
                     $('#0').trigger('click'); 
                     clearInterval(handler);
                 }, 500); 
                                                   
             } else {               
                this.slides.alterarWidth(arrSlide.length);  
                 $.each(arrSlide, (index, value) => { 
                    this.slides.popularTemplate(value, index);  
                 });  
             } 
            
             // Se não tiver legenda, trava os botões de busca e de legendas, deixando apenas o de Slide. 
             const paragrafos = transmissao.legendas;                        
             //const paragrafos = [];

            // passando legenda em PT para a primeira posição do array
            let legendaEmPt;

            if(paragrafos.length > 0) {
                for(let i = 0; i < paragrafos.length; i++) {
                    if(paragrafos[i].idioma == 'pt') {
                        legendaEmPt = paragrafos[i];
                        paragrafos.splice(i, 1);
                    }
                }

                // joga na primeira posição
                paragrafos.unshift(legendaEmPt);
            }
            
             if(paragrafos.length == 0) { 
                this.body.addClass('no-legend'); 
             } else { 
                this.idiomas.popularTemplate(paragrafos); 
                 if(arrSlide.length < 2)
                     $('#tab-legenda').addClass('active'); 
                 
                this.idiomaAtivo = this.idiomas.ativo().toString();  
                 
                this.legendaAtiva = this.legendas.legendaAtiva(this.idiomaAtivo, paragrafos);   
               
                
                this.legendas.popularTemplate(this.legendaAtiva, this.video); 
                
 
                 $('.select-header').on('change', (event) => {
                    var optionSelected = $("option:selected", this);
                    this.idiomaAtivo = $(event.target).val().toString();  
                    this.legendaAtiva = this.legendas.legendaAtiva(this.idiomaAtivo, paragrafos);                                
                    this.legendas.popularTemplate(this.legendaAtiva, this.video); 
                
                    $.each($('#legenda > .ttml-item'), (index,value) => {
                        if($(value).attr('id') == this.idiomaAtivo){
                            $(value).addClass('ttml-item-active');
                        }
                        else{
                            $(value).remove();
                        }                        
                    });

                    this.legendas.sincLegendaMoverAtual = -1;
                    this.legendas.verificaTempo(this.video ? this.video : this.htmlPlayer, this.idiomaAtivo);  
                      
                 });
             } 
              
              // Se não tiver nem legenda e nem slide, tira tudo. 
              if (transmissao.sinalizacoes.length == 0 && paragrafos.length == 0){ 
                this.body.addClass('no-legend-slide');                 
                this.divVideo.addClass('col-lg-offset-3 col-md-offset-3 col-sm-offset-3'); 
              }        
                  
               if(this.legendaAtiva) {
                    // Ativa a verificação de uma possível troca de Slide e/ou Legenda. 
                    const handler = setInterval(() => {  
                                                                                           
                        const tempoVideo = this.video ? this.video.getTempoAtual() : this.htmlPlayer.getTempoAtual(); 
                        const novoSlide = arrSlide ? this.slides.sincronizarSlide(tempoVideo, arrSlide) : null; 
                        this.legendas.verificaTempo(this.video ? this.video : this.htmlPlayer, this.idiomaAtivo);                             
                        if(novoSlide && novoSlide.comando) 
                        {                                                              
                            this.slides.verificarComando(novoSlide.comando)   
                                ? this.apoio.trocarSlide(novoSlide.comando)   
                                : this.apoio.trocarIframe(novoSlide.comando);     
                        } 
                    },  100);   
                }
                

              // Vincula Evento de Click aos Slides. 
              if(this.slides.$slide) { 
                this.slides.$slide.on('click', (event: any) => {                
                    const slideClicado = <ISlide>this.shared.converterEvento(event, this.slides);         
                    this.slides.ativarSlide(event.target);      
                    
                    // Verifica se está usando o Video ( Azure ) || HTML 
                    this.video ? this.video.setTempoAtual(this.shared.timeToSeconds(slideClicado.tempo)) 
                          : this.htmlPlayer.setTempoAtual(this.shared.timeToSeconds(slideClicado.tempo));   
        
                    this.slides.verificarComando(slideClicado.comando)   
                            ? this.apoio.trocarSlide(slideClicado.comando)   
                            : this.apoio.trocarIframe(slideClicado.comando)  
                    
                    this.slides.mudarScroll(slideClicado.id);           
                });     
            } 
           
            // Vinculo de função do buscar. 
            if($('.btn-default')){ 
                $('.btn-default').unbind('click')
                $('.btn-default').on('click', (event) => { 
                    const textoDeBusca = this.buscar.$input.val().toString();        
                   
                    this.buscar.buscarPalavra(this.legendaAtiva, textoDeBusca); 
                    
                    $('#tab-busca').addClass('active').fadeIn(200);
                    $('#tab-legenda').removeClass('active');

                    this.buscar.$p.on('click', (event: any) => { 
                        const obj = <ILegendas>this.legendaAtiva; 
                        const legendaClicada = <IMarcacoes>this.shared.converterEvento(event, obj.marcacoes[0]);  
                        
                        this.video ? this.video.setTempoAtual(this.shared.timeToSeconds(legendaClicada.inicio)) 
                              : this.htmlPlayer.setTempoAtual(this.shared.timeToSeconds(legendaClicada.inicio));  
          
                        $('#tab-busca').removeClass('active');
                        $('#tab-legenda').addClass('active');
                        $('.legenda-aba').find('a').click();
                    }); 
                    
                    $('.legenda-aba').unbind('click');
                    $('.legenda-aba').on('click', () => {
                        $('#tab-legenda').addClass('active');
                        $('.legenda-aba').find('a').click();
                    });
                }); 
            } 

            
            // Verificando tamanho do dispositivo 
            this.resizeAdd() 
        
            $(window).resize(() => { 
                this.resizeAdd();
                // if(video.isFullScreen())
                //     $('.vjs-control-bar').removeAttr('style');
                // else
                //     $('.vjs-control-bar').attr('style', 'opacity: 1; z-index: 1; margin-bottom: -36px;');       
            });
        
            // Verificando tamanho do dispositivo
            this.resizeAdd() 
        
            $(window).resize(() => {
                this.resizeAdd();
                // if(video.isFullScreen())
                //     $('.vjs-control-bar').removeAttr('style');
                // else
                //     $('.vjs-control-bar').attr('style', 'opacity: 1; z-index: 1; margin-bottom: -36px;');      
            });
            
            $(document).ready(() => {
                if ($(window).width() < 768) {                
                    this.menu.css('display', 'block')
                    $('#video-azure').removeClass("hide-change-video")
                    this.apoio.esconder();
                } else {                
                    this.menu.css('display', 'none');  
                    $('#video-azure').removeClass("hide-change-video")
                    this.apoio.aparecer();            
                }
            });
            
           
                
            // Mudança entre vídeo e slide 
            this.btnTroca.unbind('click');
            this.btnTroca.on('click', () => { 
                event.preventDefault(); 
                this.video ? this.video.toggleClass() : this.htmlPlayer.toggleClass(); 
                this.apoio.toggleClass();         
            });    
              
        });

        
  }
    resizeAdd() {
        if ($(window).width() < 768) {                
            this.menu.css('display', 'block');
            // $('#video-azure').removeClass("hide-change-video")
            // apoio.esconder();
        } else {                
            this.menu.css('display', 'none');  
            // $('#video-azure').removeClass("hide-change-video")
            // apoio.aparecer();            
         }
    }
}