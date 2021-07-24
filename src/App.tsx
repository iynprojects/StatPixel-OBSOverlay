import React from 'react';

import { init } from './scripts/main';

/**
 * The React application layer that houses the canvas.
 */
class App extends React.Component {
    render = () => {
        return (
            <canvas id="ctx"></canvas>
        );
    }

    componentDidMount = () => {
        init();
    }
}

export default App;
