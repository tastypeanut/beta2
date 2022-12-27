import mailchannelsPlugin from "@cloudflare/pages-plugin-mailchannels";

export const onRequest = mailchannelsPlugin({
  personalizations: [
    {
      to: [{ name: "enrique.wtf - CONTACT FORM", email: "dtb9q2oshr@enrique.wtf" }],
    },
  ],
  from: { name: "enrique.wtf - CONTACT FORM", email: "dtb9q2oshr@enrique.wtf" },
  respondWith: () =>
    new Response(null, {
      status: 302,
      headers: { Location: "/thank-you" },
    }),
});