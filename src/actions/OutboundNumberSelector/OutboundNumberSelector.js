import { Manager } from '@twilio/flex-ui';

export function replaceFromNumber(flex) {
  console.info(`🐸 Replace caller number`);

  const manager = Manager.getInstance();

  flex.Actions.replaceAction('StartOutboundCall', (payload, original) => {
    return new Promise((resolve, reject) => {
      if (payload.callerId) {
        resolve(payload.callerId);
        return;
      }
      const callerId =
        manager.store.getState()['outbound-number-selector'].DefaultNumber
          .defaultNumber;
      if (!callerId) reject('Default number not set.');
      resolve(
        manager.store.getState()['outbound-number-selector'].DefaultNumber
          .defaultNumber,
      );
    }).then((callerId) => {
      original({
        ...payload,
        callerId,
      });
    });
  });
}
