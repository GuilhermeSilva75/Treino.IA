import { create } from "zustand"

export type User = {
    name: string
    weight: string
    age: string
    height: string
    gender: string
    days: string
    muscle: string
}

type DataState = {
    user: User
    setPageOne: (data: Omit<User, "gender" | "days" | "muscle">) => void
    setPageTwo: (data: Pick<User, "gender" | "days" | "muscle">) => void
}

export const useDataStore = create<DataState>((set) => ({
    user: {
        name: "",
        weight: "",
        age: "",
        height: "",
        gender: "",
        muscle: "",
        days: ""
    },
    setPageOne: (data) => set((state) => ({ user: { ...state.user, ...data } })),
    setPageTwo: (data) => set((state) => ({ user: { ...state.user, ...data } }))
}))