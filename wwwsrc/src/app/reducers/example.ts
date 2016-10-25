
const greeting = (state, action) => {
    switch (action.type) {
        case 'ADD_GREETING':
            return {
                id: action.id,
                text: action.text,
            }
        case 'REVERSE_GREETINGS':

            return (<any>Object).assign({}, state, {
                text: state.text.split("").reverse().join(""),
            })

        default:
            return state
    }
}

export var greetings = (state = [], action) => {
    switch (action.type) {
        case 'ADD_GREETING':
            return [
                ...state,
                greeting(undefined, action)
            ]

        case 'CLEAR_GREETINGS':
            return [];

        case 'REVERSE_GREETINGS':
            return state.map(t =>
                greeting(t, action)
            )

        default:
            return state
    }
}

export default greetings;
