import React, { useState, useEffect } from 'react';
import * as Flex from '@twilio/flex-ui';
import { Theme } from '@twilio-paste/core/theme';
import { Label } from '@twilio-paste/core/label';
import { Select, Option } from '@twilio-paste/core/select';
import { Box } from '@twilio-paste/core';
import axios from 'axios';

// eslint-disable-next-line no-undef
const FUNCTION_DOMAIN = process.env.FLEX_APP_FUNCTION_DOMAIN;

const NumberSelect = (props) => {
  console.info(`🐸 NumberSelect started.`);

  // Get theme
  const theme = Flex.Manager.getInstance().configuration.theme.isLight
    ? 'default'
    : 'dark';

  const [options, setOptions] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [defaultNumber, setDefaultNumber] = useState(
    // eslint-disable-next-line react/prop-types
    props.defaultNumber,
  );
  useEffect(() => {
    (async () => {
      try {
        const url = `https://${FUNCTION_DOMAIN}/get-phone-numbers`;
        const res = await axios.post(url);
        let opts = [];
        res.data.numberList.map((number) => {
          opts.push({
            phoneNumber: number.phoneNumber,
            friendlyName: number.friendlyName,
          });
          return true;
        });
        setOptions(opts);
        // eslint-disable-next-line react/prop-types
        props.setDefaultNumber(
          defaultNumber ? defaultNumber : opts[0].phoneNumber || '',
        );
        // props.setDefaultNumber(opts[0].phoneNumber || '');
        setLoaded(true);
      } catch (err) {
        console.error(
          `ERROR in getNumbers: ${err.message ? err.message : err}`,
        );
        return null;
      }
    })();
  }, [loaded]);

  // Change number
  const handleChangeNumber = (e) => {
    setDefaultNumber(e.target.value || '');
    // eslint-disable-next-line react/prop-types
    props.setDefaultNumber(e.target.value || '');
  };

  return (
    <Theme.Provider theme={theme}>
      {options.length > 0 ? (
        <Box width={242}>
          <Label htmlFor='caller_id'>Caller Id</Label>
          <Select
            id='caller_id'
            htmlFor='caller_id'
            defaultValue={defaultNumber}
            onChange={handleChangeNumber}
          >
            {options.map((option, idx) => (
              <Option key={idx} value={option.phoneNumber}>
                {option.friendlyName}[{option.phoneNumber}]
              </Option>
            ))}
          </Select>
        </Box>
      ) : (
        ''
      )}
    </Theme.Provider>
  );
};

export default NumberSelect;
