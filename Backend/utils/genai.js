import "dotenv/config";

const getGroqAIAPIResponse = async (message) => {
    const options = {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "openai/gpt-oss-20b",
            messages: [
                {
                    role: "user",
                    content: message
                }
            ]
        })
    };

    try {
        const response = await fetch(
            "https://api.groq.com/openai/v1/chat/completions",
            options
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.error?.message || `Groq API error: ${response.status}`
            );
        }

        const reply = data.choices?.[0]?.message?.content;

        if (typeof reply !== "string" || !reply.trim()) {
            throw new Error("Groq returned no reply text.");
        }

        return reply;
    } catch (err) {
        console.error("Groq API error:", err.message);
        throw err;
    }
};

export default getGroqAIAPIResponse;
