import React from 'react';

import MyParagraph from './MyParagraph';

const DemoOutput = (props) => {
  console.log('DemoOutput RUNNING');
  return <MyParagraph>{props.show ? 'This is new!' : ''}</MyParagraph>;
};
// This tells react to only re execute DemoOutput function if props are changed in there.
/* NOTE: props of new component gets compared to the props of previous component with '==='. This means that
primitive data types are equal but others like function, objects(objects are a kind of function themselves) are not.
What the hell that means ?
It means that if App runs, a brand new version of toggleParagraphHandler will be passed to Button as props
so it gets re-evaluated even though we use memo() */
// Now if App gets re runs which contains DemoOutput, this function wont run again.
export default React.memo(DemoOutput);
