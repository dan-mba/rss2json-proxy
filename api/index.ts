import { parseStringPromise } from 'xml2js';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const rss = url.searchParams.get("rss");
  if (!rss) {
    return Response.json({ error: 'No rss parameter specified' }, { status: 400});
  }

  try {
    const res = await fetch(rss);
    const data = await res.text();
    const parsed = await parseStringPromise(data, { explicitArray: false });

    return Response.json(parsed);
  } catch (error) {
      console.log(error);
      return Response.json({ error: error }, { status: 400});
  }
}