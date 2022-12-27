import mailchannelsPlugin from "@cloudflare/pages-plugin-mailchannels";

export const onRequest = mailchannelsPlugin({
  personalizations: [
    {
      to: [{ name: "ACME Support", email: "ceswmyk737@disposableemail.us" }],
    },
  ],
  from: { name: "Enquiry", email: "ceswmyk737@disposableemail.us" },
  respondWith: () =>
    new Response(null, {
      status: 302,
      headers: { Location: "/thank-you" },
    }),
});