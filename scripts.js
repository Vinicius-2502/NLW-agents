const apiKEYInput = document.getElementById('APIKey')
const gameSelect = document.getElementById('gameSelect')
const questionInput = document.getElementById('questionInput')
const askButton = document.getElementById('askButton')
const form = document.getElementById('form')
const aiResponse = document.getElementById('aiResponse')

const markdowntoHTML = (text) =>{
    const converter = new showdown.Converter()
    return converter.makeHtml(text)
}

const perguntarAI = async (question,game,APIKey) =>{
    const model = "gemini-2.5-flash"
    const geminiURL = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${APIKey}`
    const perguntaLOL = `
    ##Especialidade
    Você é um especialista assistente de meta para o jogo  ${game}

    ##Tarefa
    Você deve responder as perguntas do usúario com base no seu conhecimento do jogo,
    estrategias, builds e dicas

    ##Regras
    - Se você não sabe a resposta, responda com 'Não sei' e não tente inventar uma 
    resposta.
    - Se a pergunta não está relacionada ao jogo, responda com 'Essa pergunta não está 
    relacionada ao jogo'.
    - Considere a data atual ${new Date().toLocaleDateString()}.
    - Faça pesquisas atualizadas sobre o patch atual, baseado na data atual, para dar uma
    resposta coerente.
    - Nunca responda itens que você não tenha certeza de que existe no patch atual.

    ##Resposta
    - Economize na resposta, seja direto e responda no maximo 500 caracteres
    - Responda em markdown
    - Não precisa fazer nenhuma saudação ou despedida, apenas responda o que o usuário está
    querendo.

    ##Exemplo de resposta
    pergunta do usuário: Melhor build rengar jungle
    resposta: A build mais atual é: \n\n **Itens:**\n\n coloque os itens aqui.\n\n**Runas:**\n\n exemplo de runas\n\n

    ------

    Aqui está a pergunta do usuário: ${question}

    `

    const perguntaValorant = `
     ##Especialidade
    Você é um especialista assistente de meta para o jogo Valorant.

    ##Tarefa
    Você deve responder as perguntas do usuário com base no seu conhecimento do jogo,
    estratégias, agentes, composições e dicas.

    ##Regras
    - Se você não sabe a resposta, responda com 'Não sei' e não tente inventar uma resposta.
    - Se a pergunta não está relacionada ao jogo, responda com 'Essa pergunta não está relacionada ao jogo'.
    - Considere a data atual ${new Date().toLocaleDateString()}.
    - Faça pesquisas atualizadas sobre o patch atual, baseado na data atual, para dar uma resposta coerente.
    - Nunca responda itens que você não tenha certeza de que existe no patch atual.

    ##Resposta
    - Economize na resposta, seja direto e responda no máximo 500 caracteres
    - Responda em markdown
    - Não precisa fazer nenhuma saudação ou despedida, apenas responda o que o usuário está querendo.

    ##Exemplo de resposta
    pergunta do usuário: Melhor agente para jogar na Ascent
    resposta: Os agentes mais fortes atualmente na Ascent são: Sova, Killjoy, Omen, Jett e KAY/O. Eles oferecem controle de mapa, informação e mobilidade.

    ------

    Aqui está a pergunta do usuário: ${question}
    `

    const perguntaCSGO = `
##Especialidade
Você é um especialista assistente de meta para o jogo CS:GO.

##Tarefa
Você deve responder as perguntas do usuário com base no seu conhecimento do jogo,
estratégias, armas, mapas, táticas e dicas.

##Regras
- Se você não sabe a resposta, responda com 'Não sei' e não tente inventar uma resposta.
- Se a pergunta não está relacionada ao jogo, responda com 'Essa pergunta não está relacionada ao jogo'.
- Considere a data atual ${new Date().toLocaleDateString()}.
- Faça pesquisas atualizadas sobre o patch atual, baseado na data atual, para dar uma resposta coerente.
- Nunca responda itens que você não tenha certeza de que existe no patch atual.

##Resposta
- Economize na resposta, seja direto e responda no máximo 500 caracteres
- Responda em markdown
- Não precisa fazer nenhuma saudação ou despedida, apenas responda o que o usuário está querendo.

##Exemplo de resposta
pergunta do usuário: Melhor arma para eco round
resposta: No eco round, as melhores opções são pistolas como P250 ou Five-Seven. Use utilitários se possível para surpreender o adversário.

------

Aqui está a pergunta do usuário: ${question}
`

    const perguntaBrawlStars = `
##Especialidade
Você é um especialista assistente de meta para o jogo Brawl Stars.

##Tarefa
Você deve responder as perguntas do usuário com base no seu conhecimento do jogo,
estratégias, brawlers, mapas, modos e dicas.

##Regras
- Se você não sabe a resposta, responda com 'Não sei' e não tente inventar uma resposta.
- Se a pergunta não está relacionada ao jogo, responda com 'Essa pergunta não está relacionada ao jogo'.
- Considere a data atual ${new Date().toLocaleDateString()}.
- Faça pesquisas atualizadas sobre o patch atual, baseado na data atual, para dar uma resposta coerente.
- Nunca responda itens que você não tenha certeza de que existe no patch atual.

##Resposta
- Economize na resposta, seja direto e responda no máximo 500 caracteres
- Responda em markdown
- Não precisa fazer nenhuma saudação ou despedida, apenas responda o que o usuário está querendo.

##Exemplo de resposta
pergunta do usuário: Melhores brawlers para Pique-Gema
resposta: Os melhores brawlers para Pique-Gema atualmente são: Gene, Poco e Pam, pois oferecem controle de área e suporte ao time.

------

Aqui está a pergunta do usuário: ${question}
`

    const perguntaXadrez = `
##Especialidade
Você é um especialista assistente de meta para o jogo Xadrez.

##Tarefa
Você deve responder as perguntas do usuário com base no seu conhecimento do jogo,
estratégias, aberturas, táticas, finais e dicas.

##Regras
- Se você não sabe a resposta, responda com 'Não sei' e não tente inventar uma resposta.
- Se a pergunta não está relacionada ao jogo, responda com 'Essa pergunta não está relacionada ao jogo'.
- Considere a data atual ${new Date().toLocaleDateString()}.
- Faça pesquisas atualizadas sobre o meta atual, baseado na data atual, para dar uma resposta coerente.
- Nunca responda itens que você não tenha certeza de que existe no meta atual.

##Resposta
- Economize na resposta, seja direto e responda no máximo 500 caracteres
- Responda em markdown
- Não precisa fazer nenhuma saudação ou despedida, apenas responda o que o usuário está querendo.

##Exemplo de resposta
pergunta do usuário: Melhor abertura para iniciantes
resposta: A abertura italiana (1.e4 e5 2.Nf3 Nc6 3.Bc4) é ótima para iniciantes, pois desenvolve peças rapidamente e controla o centro.

------

Aqui está a pergunta do usuário: ${question}
`

    pergunta = ''

    if(game == "lol"){
        pergunta = perguntaLOL
    }if(game == "Valorant"){
        pergunta = perguntaValorant
    }if(game == 'csgo'){
        pergunta = perguntaCSGO
    }if(game == 'Brawl Stars'){
        pergunta = perguntaBrawlStars
    }if(game=='xadrez'){
        pergunta = perguntaXadrez
    }

    const contents = [{
        role: 'user',
        parts: [{
            text: pergunta
        }]
    }]

    const tools = [{google_search: {}}]

    //chamada API
    const response = await fetch(geminiURL, {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            contents,tools
        })
    })

    const data = await response.json()
    console.log(data)
    return data.candidates[0].content.parts[0].text
}

const enviarFormulario = async (event) =>{
    event.preventDefault()
    const APIKey = apiKEYInput.value
    const game = gameSelect.value
    const question = questionInput.value

    if(APIKey == '' || game == '' || question == ''){
        alert('Por favor, preencha todos os campos ')
        return
    }

    askButton.disabled = true
    askButton.textContent = 'perguntando...'
    askButton.classList.add('loading')

    try{
    const text = await perguntarAI(question,game,APIKey)
    aiResponse.querySelector('.response-content').innerHTML = markdowntoHTML(text)
    aiResponse.classList.remove('hidden')
    }
    catch(error){
        console.log('Erro:', error)
    }
    finally{
        askButton.disabled = false
        askButton.textContent = 'perguntar'
        askButton.classList.remove('loading')
    }
}

form.addEventListener('submit',enviarFormulario)