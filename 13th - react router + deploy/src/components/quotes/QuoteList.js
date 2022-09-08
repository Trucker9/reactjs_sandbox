import {Fragment} from 'react';
import {useHistory, useLocation} from 'react-router-dom'

import QuoteItem from './QuoteItem';
import classes from './QuoteList.module.css';

function sortQuotes(quotes, asc) {
    return quotes.sort((a, b) => {
        if (asc) {
            return a.id > b.id ? 1 : -1;
        } else {
            return a.id < b.id ? 1 : -1;
        }
    })
}

const QuoteList = (props) => {

    // extracting current sorting method from URL
    const location = useLocation();
    const queryParamsObj = new URLSearchParams(location.search)
    const isSortingAsc = queryParamsObj.get('sort') === 'asc';

    const history = useHistory();

    function changeSortingHandler() {
        // Using useHistory() hook to change the url (also component re-renders)
        history.push({pathname: location.pathname, search: `?sort=${isSortingAsc ? 'desc' : 'asc'}`})
    }

    sortQuotes(props.quotes, isSortingAsc);
    return (
        <Fragment>
            <div className={classes.sorting}>
                <button onClick={changeSortingHandler}> Sort {`${isSortingAsc ? 'Descending' : 'Ascending'}`}</button>
            </div>
            <ul className={classes.list}>
                {props.quotes.map((quote) => (
                    <QuoteItem
                        key={quote.id}
                        id={quote.id}
                        author={quote.author}
                        text={quote.text}
                    />
                ))}
            </ul>
        </Fragment>
    );
};

export default QuoteList;
