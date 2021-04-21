import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { decrement, increment } from './testReducer';

const Sandbox = () => {
  const data = useSelector((state) => state.test.data);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Testing Sandbox</h1>
      <h3>The data is: {data}</h3>
      <Button
        onClick={() => dispatch(increment(10))}
        content="Increment"
        color="green"
      />
      <Button
        onClick={() => dispatch(decrement(5))}
        content="Decrement"
        color="red"
      />
    </div>
  );
};

export default Sandbox;
