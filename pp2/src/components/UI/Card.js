const css = {
  padding: '1rem',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.25)',
  borderRadius: '14px',
  backgroundColor: 'white',
};

const Card = (props) => {
  return <div style={css}>{props.children}</div>;
};

export default Card;
