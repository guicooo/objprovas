export interface IRegime {
    id: string,
    limite: number,
    nome: string,
    nomeInformal: string,
    opcoes: [{
        id: string,
        numero: number, 
        nome: string
    }]
}