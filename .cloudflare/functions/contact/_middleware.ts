/*
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
*/


import mailchannelsPlugin from "@cloudflare/pages-plugin-mailchannels";

const errorHandler: PagesFunction = async ({ next }) => {
  try {
    return await next();
  } catch (err) {
    return new Response(`${err.message}\n${err.stack}`, { status: 500 });
  }
};

const mailMiddleware: PagesFunction<Environment> = (context) => mailchannelsPlugin({
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
  /*
  personalizations: [
    {
      to: [{ name: "Hone", email: "contact@" + context.env.MY_DKIM_DOMAIN }],
      dkim_domain: context.env.MY_DKIM_DOMAIN,
      dkim_selector: context.env.MY_DKIM_SELECTOR,
      dkim_private_key: context.env.MY_DKIM_PRIV_KEY,
    },
  ],
  from: { 
    name: "Website Contact Form", 
    email: "no-reply@" + context.env.MY_DKIM_DOMAIN 
  },

  respondWith: () => {
    return Response.redirect('https://honetito.com/thank-you/, 302');
  },*/
})(context);


export const onRequest: PagesFunction[] = [errorHandler, mailMiddleware];