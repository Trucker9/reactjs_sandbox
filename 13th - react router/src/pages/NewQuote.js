import QuoteForm from '../components/quotes/QuoteForm';
import {useHistory} from "react-router-dom";


const NewQuote = () => {

    // we can use this hook to manipulate browser history.
    // history.push(); & history.replace(); are functions to redirect the user. with push(); we can go back with back
    // button
    const history = useHistory();

    const addQuoteHandler = (quoteData) => {


        console.log(quoteData);
        history.push('/quotes');
    };

    return (<QuoteForm onAddQuote={addQuoteHandler}/>);
};

export default NewQuote;