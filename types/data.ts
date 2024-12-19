interface ExercicioProps {
    nome: string
    series: number
    repeticoes: number
    descanso: number
}

interface TreinoProps {
    dia: string
    focoMuscular: string
    exercicios: ExercicioProps[]
}


export interface Data {
    nome: string
    sexo: string
    idade: number
    altura: number
    peso: number
    treino: TreinoProps[]
}