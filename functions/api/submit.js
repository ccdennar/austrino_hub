// functions/api/submit.js  (Cloudflare Pages Function)
export async function onRequestPost(context) {
  const { request, env } = context;

  // 1. basic validation
  const body = await request.json();
  if (!body.name || !body.email || !body.message)
    return new Response(JSON.stringify({ error: 'Missing fields' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });

  // 2. store in KV (free 1 GB on CF)
  const id = crypto.randomUUID();
  await env.CONTACT.put(id, JSON.stringify({ ...body, ts: Date.now() }));

  // 3. respond
  return new Response(JSON.stringify({ ok: true, id }), {
    headers: { 'Content-Type': 'application/json' },
  });
}