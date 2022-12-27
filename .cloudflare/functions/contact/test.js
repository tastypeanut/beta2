export function onRequest(context) {  
    return new Response(ccontext.env.EMAIL)
}
