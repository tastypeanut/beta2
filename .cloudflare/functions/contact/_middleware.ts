import mailchannelsPlugin from "@cloudflare/pages-plugin-mailchannels";

export const onRequest = mailchannelsPlugin({
  personalizations: [
    {
      to: [{ name: "ACME Support", email: "dtb9q2oshr@enrique.wtf" }],
    },
  ],
  from: { name: "Enquiry", email: "ceswmyk737@disposableemail.us" },
  respondWith: () =>
    new Response(null, {
      status: 302,
      headers: { Location: "/thank-you" },
    }),
});