
/* WTF is this?
As we know we can't return more than one element in JSX.
One solution is returning array and adding custom keys
another is wrapping in to <div> and this causes div soup.
Best solution is to use a Wrapper that just returns what is between its opening and closing tags. 

props.children contains anything that we write between opening and closing tags of this custom component.
*/
const Wrapper = props => {

    return props.children;
}

export default Wrapper;