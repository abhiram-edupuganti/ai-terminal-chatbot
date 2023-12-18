import openai from './config/open-ai.js';
import readlineSync from 'readline-sync';
import colors from 'colors';


async function main()
{
    console.log(colors.bold.green("Welcome to ChatBot program!"));
    console.log(colors.bold.green("you can start chatting now."))

    const chatHistory = []
    //to store chat history


    while(true)
    {
        const userInput= readlineSync.question(colors.yellow('You: '));
        try {
            //call API with user input

            const messages = chatHistory.map(([role,content])=>({role,content}));

            messages.push({role: 'user' , content : userInput});    

            const completion = await openai.chat.completions.create({
                model : 'gpt-3.5-turbo',
                messages : messages,
                // messages : [
                //     {role: "user" , content: userInput},
                // ]
            })

            const completionText= completion.choices[0].message.content;

            if(userInput.toLowerCase()==='exit')
            {
                console.log(colors.green('Bot: ')+completionText);
                return;
                
            }

            console.log(colors.green('Bot: ')+completionText);

            chatHistory.push(['user',userInput]);
            chatHistory.push(['assistant',completionText]);

        } catch (error) {
            console.log(colors.red(error));
        } 
    }
    // const chatCompletion = await openai.chat.completions.create({
    //     model: "gpt-3.5-turbo",
    //     messages: [{"role": "user", "content": "what is the capital of India?"}],
    // });

    // console.log(chatCompletion.choices[0].message);
}
    
main()




