export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (request.method === "POST" && url.pathname === "/explain") {
      const { question } = await request.json();
      const prompt = `Explain this like I'm 5 years old:\n\n"${question}"`;

      const result = await env.AI.run("@cf/meta/llama-2-7b-chat-int8", {
        messages: [
          { role: "system", content: "You're a friendly teacher who explains complex things very simply." },
          { role: "user", content: prompt }
        ]
      });

      return Response.json({ answer: result.response });
    }

    return env.ASSETS.fetch(request);
  }
}
