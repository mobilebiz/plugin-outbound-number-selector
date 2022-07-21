import React from 'react';
import { VERSION } from '@twilio/flex-ui';
import { FlexPlugin } from '@twilio/flex-plugin';

import { replaceFromNumber } from './actions/OutboundNumberSelector/OutboundNumberSelector';
import NumberSelectContainer from './components/NumberSelect/NumberSelect.Container';
import reducers, { namespace } from './states';

const PLUGIN_NAME = 'OutboundNumberSelectorPlugin';

export default class OutboundNumberSelectorPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   */
  async init(flex, manager) {
    flex.OutboundDialerPanel.Content.add(
      <NumberSelectContainer key='number-select-component' />,
      { sortOrder: 1 },
    );

    replaceFromNumber(flex);

    this.registerReducers(manager);
  }

  /**
   * Registers the plugin reducers
   *
   * @param manager { Flex.Manager }
   */
  registerReducers(manager) {
    if (!manager.store.addReducer) {
      console.error(
        `You need FlexUI > 1.9.0 to use built-in redux; you are currently on ${VERSION}`,
      );
      return;
    }
    manager.store.addReducer(namespace, reducers);
  }
}
