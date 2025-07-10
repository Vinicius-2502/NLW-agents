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
    const pergunta = `
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