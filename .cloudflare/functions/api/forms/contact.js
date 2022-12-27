import mailChannelsPlugin from "@cloudflare/pages-plugin-mailchannels";

export const onRequestPost: PagesFunction = mailChannelsPlugin({
    personalizations: [{
        to: [{
            name: "ACME Support",
            email: "qng50r+bpv6t8idjza6c@sharklasers.com"
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