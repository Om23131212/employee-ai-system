const axios = require("axios");

const getAIRecommendation =
async (employee) => {

  const {
    name,
    department,
    skills,
    performanceScore,
    experience
  } = employee;

  const prompt = `

You are an HR AI Assistant.

Analyze this employee:

Name: ${name}
Department: ${department}
Skills: ${skills}
Performance Score: ${performanceScore}
Experience: ${experience}

Give response in ONLY 5 to 6 short professional lines.

Include:
1. Promotion eligibility
2. Skill improvement suggestion
3. Training recommendation
4. Performance summary
5. Final HR recommendation

Keep response concise and professional.

`;

  const response = await axios.post(

    "https://openrouter.ai/api/v1/chat/completions",

    {
      model:
      "openai/gpt-3.5-turbo",

      messages: [
        {
          role: "user",
          content: prompt
        }
      ]
    },

    {
      headers: {
        Authorization:
        `Bearer ${process.env.OPENROUTER_API_KEY}`,

        "Content-Type":
        "application/json"
      }
    }
  );

  return response.data;
};

module.exports =
getAIRecommendation;