export default async () => new Response(JSON.stringify({ error: "Contact form is disabled." }), {
  status: 503,
  headers: { "Content-Type": "application/json" },
});