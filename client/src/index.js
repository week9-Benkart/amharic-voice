import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import KafkaProvider from './core/kafkaContext'


ReactDOM.render(
  <React.StrictMode>
    <KafkaProvider>
      <App />
    </KafkaProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
