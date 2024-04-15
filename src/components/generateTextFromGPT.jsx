import axios from 'axios';
import {useContext} from 'react';
import MyContext from './MyContext';


const generateTextFromGPT = async () => {
  const {gptEndpoint, setGptEndpoint} = useContext(MyContext);
  const {myGptKey, setMyGptKey} = useContext(MyContext);
  // const {postContent} = content;

  let promptHeader = `Generate HTML markup:
Create a <header> tag with the title "Inclose this paragraph in <p> tag and the title in <header> tag, so that I can dangerously display it inside React".
Next, create a <p> tag and enclose the following paragraph within it:
"ChatGPT can make mistakes. Consider checking important information."
Ensure that the generated HTML markup is valid and can be safely rendered inside a React component.`;

const content = `🤖 GPT (Generative Pre-trained Transformer)
  GPT, short for Generative Pre-trained Transformer, stands out as a revolutionary AI model developed by OpenAI. It has made waves with its ability to generate human-like text and assist in natural language processing tasks.

  Applications:
  Content Creation: GPT can generate articles, stories, and even code snippets based on prompts provided to it.
  Customer Support: It's used in chatbots to provide intelligent and human-like responses to customer queries.
  Language Translation: GPT excels in translating text between languages with impressive accuracy.
  Text Summarization: It can condense lengthy texts into concise summaries, aiding in information extraction.
  🎨 Gemini
  Gemini is another AI innovation that focuses on generating images, taking visual content creation to new heights.

  Applications:
  Art and Design: Gemini can produce artwork, logos, and graphic designs based on user input.
  Photography Enhancement: It's utilized to enhance and edit photographs, adjusting colors, composition, and more.
  Fashion and Interior Design: Gemini helps in creating virtual designs for fashion items and interior spaces.
  Product Prototyping: It aids in generating product prototypes and mock-ups, saving time and resources in the design phase.
  💡 Cross-domain Applications
  Both GPT and Gemini showcase the potential of AI tools in bridging multiple fields:

  Marketing: GPT can generate compelling marketing copy, while Gemini can create eye-catching visuals for campaigns.
  Education: GPT assists in generating educational content, while Gemini can illustrate complex concepts visually.
  Healthcare: GPT aids in analyzing patient data and writing reports, while Gemini can create medical illustrations and visualizations.
  🌐 Future Potential
  As AI continues to advance, the possibilities for GPT and Gemini seem boundless. From personalized content creation to immersive virtual experiences, these tools are shaping the future of human-machine collaboration.
  In conclusion, GPT and Gemini exemplify the transformative impact of AI in diverse fields. Whether it's generating text that resonates with readers or crafting visual masterpieces, these tools are at the forefront of innovation, opening doors to new creative horizons.

  Have you experienced the magic of GPT or Gemini? Share your thoughts and experiences with AI tools in the comments below! Let's explore the endless possibilities together. 🚀✨

  #AI #GPT #Gemini #ArtificialIntelligence #Innovation #Creativity #Technology`;

// prompt = `${promptHeader} "${content}"`;
prompt = `list of famous social media sites`;
  try {
    const response = await axios.post(
      gptEndpoint,
      {
        prompt: prompt,
        max_tokens: 100,
        n: 1,
        stop: '\n',
      },
      {
        headers: {
          'Authorization': `Bearer ${myGptKey}`,
          'Content-Type': 'application/json',
        },
      }
    );
    console.log(response.data);
    // return response.data.choices[0].text.trim();
    alert(JSON.stringify(response.data));
    return (
      <div style={{width: '500px', height: '500px', backgroundColor: 'red' }}>
     <div> ${esponse.data.choices[0].text.trim()} </div>
     </div>
    )
  } catch (error) {

    alert(JSON.stringify(error));
    console.error('Error fetching data from GPT API:', error);
    return <div>'Error: Unable to fetch data from GPT API';</div>
  }
};

export default generateTextFromGPT;
