export function onRequest(env, context) {
    return new Response(process.env.EMAIL)
  }
/*
import mailChannelsPlugin from "@cloudflare/pages-plugin-mailchannels";

export const onRequestPost(context): PagesFunction = mailChannelsPlugin({
    personalizations: [{
        to: [{
            name: "ACME Support",
            email: "ebenvenutto@outlook.com"
        }],
    }, ],
    from: {
        name: "ACME Support",
        email: "support@example.com",
    },
    respondWith: () => {
        return new Response(`Thank you for submitting your enquiry. A member of the team will be in touch shortly.`);
    },
});
*/