export async function POST(
  request: Request,
  { params }: { params: Promise<{ webhookId: string; webhookToken: string }> },
) {
  const { webhookId, webhookToken } = await params;
  const body = await request.json();

  const authEnabled = process.env.AUTH_ENABLED;
  if (authEnabled === undefined) {
    return new Response(JSON.stringify({ error: "Try again later" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (authEnabled === "true") {
    const apiToken = body.winterapitoken;
    console.log(apiToken);
    const correctApiToken = process.env.API_TOKEN;
    if (!correctApiToken) {
      return new Response(JSON.stringify({ error: "Try again later" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (apiToken !== correctApiToken) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 403,
        headers: { "Content-Type": "application/json" },
      });
    }
  }

  if (!body.content && !body.embeds) {
    return new Response(JSON.stringify({ error: "No content provided" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (!webhookId || !webhookToken) {
    return new Response(JSON.stringify({ error: "Invalid webhook" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const discordUrl = `https://discord.com/api/webhooks/${webhookId}/${webhookToken}`;
  console.log(discordUrl);

  delete body["winterapitoken"];

  try {
    const res = await fetch(discordUrl, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await res.text();
    console.log("sent", json);

    return new Response(JSON.stringify(json), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error(e);
    return new Response(
      JSON.stringify({ error: `Failed to send webhook: ${e}` }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
