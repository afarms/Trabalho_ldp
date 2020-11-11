export class Mensagem{
    id?: any
    mensagem: string
    idplano: number

    constructor(params: Partial<Mensagem>){
        this.id = params.id || null
        this.mensagem = params.mensagem
        this.idplano = params.idplano
    }
}