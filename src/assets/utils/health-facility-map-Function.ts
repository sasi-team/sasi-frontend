const ranemEstablishmentShift = (source: string): string => {
    if (source === 'ATENDIMENTO NOS TURNOS DA MANHA, TARDE E NOITE') {
        return 'Matutino, Vespertino e Noturno';
    };
    if (source === 'ATENDIMENTOS NOS TURNOS DA MANHA E A TARDE') {
        return 'Matutino e Vespertino';
    };
    if (source === 'ATENDIMENTO SOMENTE PELA MANHA') {
        return 'Matutino';
    };
    if (source === 'ATENDIMENTO CONTINUO DE 24 HORAS/DIA (PLANTAO:INCLUI SABADOS, DOMINGOS E FERIADOS)') {
        return 'Plantão 24h';
    };
    if (source === 'ATENDIMENTO SOMENTE A TARDE') {
        return 'Vespertino';
    };
    if (source === 'ATENDIMENTO COM TURNOS INTERMITENTES') {
        return 'Intermitente';
    };
    return source;
};

const firstLetterUpperCase = (source: string): string => {
    let returnString = '';
    source = source.toLowerCase();
    source.split(' ').map(word => {
        returnString = returnString + word.charAt(0).toUpperCase() + word.slice(1) + ' ';
    });
    return returnString;
}

export { ranemEstablishmentShift, firstLetterUpperCase };