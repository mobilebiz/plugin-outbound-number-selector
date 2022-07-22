# Outbound From Number Selector Plugin

This plugin customizes the behavior of [Twilio Flex](https://www.twilio.com/flex). Specifically, it adds the option to select an Outbound Caller Id in the new [Outbound Dialpad](https://www.twilio.com/docs/flex/dialpad/use):

![Dialpad Extension](/img/screen_shot.png?raw=true)

The choices available as CallerId are phone numbers that have already been purchased in the Flex project and are available for use with Voice.

## Configuration

The plugin consists of two parts: the Flex Plugin and the Serverless Function.
The Serverless Function is called from within the Flex Plugin.

## Setup function

```bash
% git clone https://github.com/mobilebiz/plugin-outbound-number-selector.git
% cd plugin-outbound-number-selector
% cd get-phone-numbers

# If you use npm
% npm install
# If you use yarn
% yarn install

# Deploy
% npm run deploy

...

✔ Serverless project successfully deployed

Deployment Details
Domain: get-phone-numbers-XXXX-dev.twil.io
Service:
   get-phone-numbers (ZS...)
Environment:
   dev (ZE...)
Build SID:
   ZB...
Runtime:
   node14
View Live Logs:
   https://www.twilio.com/console/functions/editor/ZS.../environment/ZE...
Functions:
   https://get-phone-numbers-XXXX-dev.twil.io/get-phone-numbers
Assets:
```

When the deployment is complete, record the "Domain:" shown in the results. Such as "get-phone-numbers-XXXX-dev.twil.io".

## Setup Flex Plugin

```bash
% cd ..
% cp .env.sample .env
```

Update the copied .env file with an editor. The contents to be updated are as follows.

| Key                      | Value                                                                  |
| :----------------------- | :--------------------------------------------------------------------- |
| FLEX_APP_FUNCTION_DOMAIN | get-phone-numbers-XXXX-dev.twil.io(Change XXXX to your configuration.) |

Once the .env file has been updated, deploy with the following command.

```bash
# If you use npm
% npm install
# If you use yarn
% yarn install
```

## Local test

```bash
% npm start
```

## Build & Deploy

```bash
# Build & Deploy
% npm run build && npm run deploy
```

## Release

Once deployed, you can manually release your plugin via the Flex UI or via

```bash
twilio flex:plugins:release --plugin plugin-name@version --name "name" --description "description"
```

Note: Common packages like `React`, `ReactDOM`, `Redux` and `ReactRedux` are not bundled with the build because they are treated as external dependencies so the plugin will depend on Flex to provide them globally.

## Special thanks

In developing this plugin, I have used the following project as a reference. I would like to take this opportunity to thank you.

https://github.com/andrej-s/plugin-dialer-numberui
