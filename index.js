const Alexa = require('ask-sdk-core');

const streamInfo = {
  title: 'Radio Eksen',
  subtitle: "The sound of the modern life",
  cardContent: "http://radioeksen.com",
  url: "https://securestreams2.autopo.st:1087/;stream.mp3",
  image: {
    largeImageUrl: 'https://cl.ly/b72a08712895/logo-512x512.jpg',
    smallImageUrl: 'https://cl.ly/27cb639420e0/logo-108x108.jpg'
  }
};

const GreetRequestHandler = {
  canHandle(handlerInput) {
    let r = handlerInput.requestEnvelope.request;
    return r.type === 'IntentRequest'
      && r.intent.name ==='GreetWithCatchPhrase';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak('Modern hayatin sesi, Radio Eksen!')
      .getResponse();
  },
};

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    let r = handlerInput.requestEnvelope.request;
    return r.type === 'LaunchRequest'
      || (r.type === 'IntentRequest'
        && r.intent.name === 'AMAZON.ResumeIntent');
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak('Modern hayatin sesi, Radio Eksen!')
      .addAudioPlayerPlayDirective(
        'REPLACE_ALL',
        streamInfo.url,
        streamInfo.url,
        0)
      .getResponse();
  },
};

const HelpHandler = {
  canHandle(handlerInput) {
    let r = handlerInput.requestEnvelope.request;
    return r.type === 'IntentRequest' && r.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak("I am a simple skill to stream a single radio channel.")
      .getResponse();
  },
};

const CancelAndStopHandler = {
  canHandle(handlerInput) {
    let r = handlerInput.requestEnvelope.request;
    return r.type === 'IntentRequest'
      && (r.intent.name === 'AMAZON.CancelIntent'
        || r.intent.name === 'AMAZON.StopIntent'
        || r.intent.name === 'AMAZON.PauseIntent'
        || r.intant.name === 'AMAZON.NavigateHomeIntent'
      );
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .addAudioPlayerStopDirective()
      .getResponse();
  },
};


const AllHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput) {
    let r = handlerInput.requestEnvelope.request;
    return handlerInput.responseBuilder
      .speak(`Sorry. Don't know how to handle ${r.intent.name}.`)
      .getResponse();
  },
};


const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Sorry, I can\'t understand the command. Please say again.')
      .reprompt('Sorry, I can\'t understand the command. Please say again.')
      .getResponse();
  },
};

exports.handler = Alexa
    .SkillBuilders
    .custom()
    .addRequestHandlers(
      GreetRequestHandler,
      LaunchRequestHandler,
      HelpHandler,
      CancelAndStopHandler,
      AllHandler
    )
    .addErrorHandler(ErrorHandler)
    .lambda();
