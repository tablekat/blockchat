
var greetingId = 0;

export const addGreeting = (text: string) => {
    return {
        type: 'ADD_GREETING',
        id: greetingId++,
        text: text
    }
}

export const clearGreetings = () => {
    return {
        type: 'CLEAR_GREETINGS'
    }
}


export const reverseGreetings = () => {
    return {
        type: 'REVERSE_GREETINGS'
    }
}
