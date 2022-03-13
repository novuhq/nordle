If you are using multiple communication channels and tired of implementing them over and over again, you have come to the right place.

[Meet Novu](https://novu.co).

Novu is an open-source project that allows you to send messages through multiple channels saving you the headache of implementing it yourself.

Check Novu list of current providers (and many more in the future) here:

[https://github.com/notifirehq/notifire/tree/main/providers](https://github.com/notifirehq/notifire/tree/main/providers)
\
\
\
We can get started by installing the Novu package:

For NPM

```bash
npm install @notifire/core
```

For Yarn

```bash
yarn add @notifire/core
```
\
\
Install your provider, in our case, Sendgrid and twilio
```bash
npm install @notifire/sendgrid
```

```bash
npm install @notifire/twilio
```
\
Import Notifire and create a new instance
```ts
import { Notifire, ChannelTypeEnum } from '@notifire/core';
const notifire = new Notifire();
```
\
Import Sendgrid and Twilio register them, and add their credentials
```ts
import { Notifire, ChannelTypeEnum } from '@notifire/core';
import { SendgridEmailProvider } from '@notifire/sendgrid';
import { TwilioSmsProvider } from '@notifire/twilio';

const notifire = new Notifire();

await notifire.registerProvider(
    new SendgridEmailProvider({
        apiKey: 'SG.xxxx',
        from: 'nevo@novu.co'
    })
);

await notifire.registerProvider(
    new TwilioSmsProvider({
        accountSid: 'xxxx',
        authToken: 'xxxx',
        from: '+15185353672'
    })
);
```
To send messages to the different channels we must register our templates.

We can do it easily with Notifire registerTemplate function.

We can pass our own params using [HandleBars](https://handlebarsjs.com/), or we can pass a function with parameters, both ways are valid.
```ts
notifire.registerTemplate({
    id: 'email-template',
    messages: [
        {
            subject: `Hello, how are you?`,
            // Or for translation or custom logic you can use function syntax
            // subject: (payload: ITriggerPayload) => getTranslation('resetPasswordSubject', payload.language),
            channel: ChannelTypeEnum.EMAIL,
            template: `
          Hi {{firstName}}!
          How are you?
          {{body}}
`
        },
    ]
});

notifire.registerTemplate({
    id: 'sms-template',
    messages: [
        {
            subject: `Hello, how are you?`,
            // Or for translation or custom logic you can use function syntax
            // subject: (payload: ITriggerPayload) => getTranslation('resetPasswordSubject', payload.language),
            channel: ChannelTypeEnum.SMS,
            template: `
          Hi {{firstName}}!
          How are you?
          {{body}}
`
        },
    ]
});
```

That's it, all we need to do now is trigger the notification!
```ts
    await notifire.trigger('test', {
        firstName: name,
        body: body,
        $email: req.query.email
    });

    await notifire.trigger('test2', {
        firstName: name,
        body: body,
        $phone: req.query.phone
    });
```
<p style="text-align: center">For the full video tutorial head over to</p>
&nbsp;
<div style="max-width: 100%; width: 700px; margin: 0 auto">
    <iframe style="max-width: 100%" width="700" height="315" src="https://www.youtube.com/embed/lj-Na7GW48M" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>