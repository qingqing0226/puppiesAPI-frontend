export interface Puppy {
    id: number,
    breed: string,
    name: string,
    birthDate: string,
    image: string
}

export interface CreatePuppy {
    breed: string,
    name: string,
    birthDate: string,
    image: string
}