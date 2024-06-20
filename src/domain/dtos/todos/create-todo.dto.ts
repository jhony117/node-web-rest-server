

export class CreateTodoDto {
    private constructor(
        public readonly text: string,
    ) {       }

    static create(props : {[key:string]:null}): [string?, CreateTodoDto?] {

        const {text} = props;

        if(!text) return ['Text property i required', undefined];

        return [undefined, new CreateTodoDto(text)];
    }
}