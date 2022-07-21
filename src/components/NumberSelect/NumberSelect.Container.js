// Import dedux methods
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Import the Redux Actions
import { Actions } from '../../states/DefaultNumberState';
import NumberSelect from './NumberSelect';

// Define mapping functions
const mapStateToProps = (state) => ({
  defaultNumber: state['outbound-number-selector'].DefaultNumber.defaultNumber,
});

const mapDispatchToProps = (dispatch) => ({
  setDefaultNumber: bindActionCreators(Actions.setDefaultNumber, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(NumberSelect);
