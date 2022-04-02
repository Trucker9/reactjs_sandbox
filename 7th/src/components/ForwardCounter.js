import useCounter from '../hooks/use-counter';
import Card from './Card';

const ForwardCounter = () => {
 const counterState =  useCounter();  

  return <Card>{counterState}</Card>;
};

export default ForwardCounter;
