export class Cliente {
    id?:any
    nome: string
    senha?: string
    plano: number
    constructor(params: Partial<Cliente>){
        this.id = params.id || undefined
        this.nome = params.nome || undefined
        this.senha = params.senha || undefined
        this.plano = params.plano || undefined
    }
}