import mailchannelsPlugin from "@cloudflare/pages-plugin-mailchannels";

const errorHandler: PagesFunction = async ({ next }) => {
  try {
    return await next();
  } catch (err) {
    return new Response(`${err.message}\n${err.stack}`, { status: 500 });
  }
};

const mailMiddleware: PagesFunction<Environment> = (context) => mailchannelsPlugin({
  "subject" : "subject",
  "from": {
      "email": context.env.CONTACT_FORM_SRC_EMAIL,
      "name": context.env.CONTACT_FORM_SRC_NAME
  },
  "reply_to": {
      "email": "replyto@email.com",
      "name": "replyto name"
  },
  "content" : [ {
    "type" : "type",
    "value" : "value"
  } ],
  "personalizations" : [ {
    "to" : [ {
      "name" : context.env.CONTACT_FORM_DEST_NAME,
      "email" : context.env.CONTACT_FORM_DEST_EMAIL
    } ]
  } ]
})(context);


export const onRequest: PagesFunction[] = [errorHandler, mailMiddleware];