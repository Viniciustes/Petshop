export class CreatePetsDto {
    constructor(
        public name: string,
        public gender: string,
        public kind: string,
        public brand: string
    ) { }
}