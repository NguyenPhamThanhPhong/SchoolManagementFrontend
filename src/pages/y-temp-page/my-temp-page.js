import React, { useRef, useState } from 'react';

function MyTempComponent() {
    // Create a ref object
    const renderCount = useRef(0);

    // Create a state variable
    const [state, setState] = useState(0);

    // Increment the ref value on each render
    renderCount.current += 1;
    console.log('renderCount.current ', renderCount.current);

    return (
        <div>
            <p>Render count: {renderCount.current}</p>
            <p>State: {state}</p>
            <button onClick={() => setState(prevState => prevState + 1)}>
                Update State
            </button>
        </div>
    );
}

export default MyTempComponent;
