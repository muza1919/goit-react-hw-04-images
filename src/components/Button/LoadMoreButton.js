import PropTypes from 'prop-types';
export const Button = ({ onClick, disabled, text }) => {
  return (
    <button disabled={disabled} className="Button" onClick={() => onClick()}>
      {text}
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
};
