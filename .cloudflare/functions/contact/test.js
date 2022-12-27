export async function onRequest({ request, env }) {
  return new Response('Variable: ' + env.SUBJECT + env.SECRET)
}