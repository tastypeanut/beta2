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
      to: [{ name: context.env.CONTACT_FORM_DEST_NAME, email: context.env.CONTACT_FORM_DEST_EMAIL}],
    },
  ],
  from: {name: context.env.CONTACT_FORM_SRC_NAME, email: context.env.CONTACT_FORM_SRC_EMAIL},
  respondWith: () => {
    return Response.redirect('/', '302');
  },
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
    return Response.redirect('https://honetito.com/thank-you/', '302');
  },*/
})(context);


export const onRequest: PagesFunction[] = [errorHandler, mailMiddleware];