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
      to: [{ name: "ACME Support", email: "support@example.com" }],
    },
  ],
  from: {
    name: "ACME Support",
    email: "support@example.com",
  }
})(context);


export const onRequest: PagesFunction[] = [errorHandler, mailMiddleware];