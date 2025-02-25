export async function GET() {
  const appUrl = process.env.NEXT_PUBLIC_URL;

  const config = {
    accountAssociation: {
      header:
        "eyJmaWQiOjE5NTI1NSwidHlwZSI6ImN1c3RvZHkiLCJrZXkiOiIweDY3OGI1NEJEM0NhQTIyMTBCYmYzYTQ4MzY1NjMzYjc1ZWI1ZTgzNjIifQ",
      payload: "eyJkb21haW4iOiJ5ZWFyLXByb2dyZXNzLWZyYW1lLnZlcmNlbC5hcHAifQ",
      signature:
        "MHgyNTkxYjRiYjY0NTJiNTE2Y2Q1YmExOGYwNzQzODg1OWMzZWEyNGUyNzkzOTU3NzJjZjYxMTBiYTRlNWE5OTdiNDQ0NTVhOWUzNTBlNTYwOTIxZGZmNGM4NGUwYTEwNTVhYjIzYzBjYmE1NjQ1NDgwOThkNmYxZTg1MzE5MzA0ODFi",
    },
    frame: {
      version: "1",
      name: "Year Progress",
      iconUrl: `${appUrl}/icon.png`,
      homeUrl: appUrl,
      imageUrl: `${appUrl}/opengraph-image`,
      buttonTitle: "Launch Frame",
      splashImageUrl: `${appUrl}/splash.png`,
      splashBackgroundColor: "#f7f7f7",
      webhookUrl: `${appUrl}/api/webhook`,
    },
  };

  return Response.json(config);
}
