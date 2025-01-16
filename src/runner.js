const apiURL = require('./utils/api.js');

const runner = (code, options) => {

  const styles = {
    Severe: 'color: #ffb3b3; font-weight: bold;',
    Moderate: 'color: #ffd500; font-weight: bold;',
    Minor: 'color: white; font-weight: bold;',
    default: 'font-weight:bold;'
  };
  return new Promise((resolve, reject) => {
    let config;

    config = options;

    if (!config.apiKey || !config.apiKey.length) {
      return reject(new Error(
        'API Key is required to run wax-dev. Please reach out to https://developer.wallyax.com/ to get your API Key.'
      ));
    }
    
    try {
      fetch(apiURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${config.apiKey}`,
        },
        body: JSON.stringify({ element: code, rules: config.rules,isLinter:"false"}),
      })
        .then((response) => response.json())
        .then((data) => {
          console.groupCollapsed('%cAccessibility Check Results', 'color:#FED600;');
          if(data && data?.responseCode==429){
            console.log('Too Many Requests')
            resolve(data);
          }
          else if (data && data.length > 0) {
            const groupedResults = data?.reduce((acc, item) => {
              if (!acc[item.severity]) {
                acc[item.severity] = [];
              }
              acc[item.severity].push(item);
              return acc;
            }, {});
            Object.keys(groupedResults).forEach((severity) => {
              console.groupCollapsed(`%c${severity}`, styles[severity] || styles.default);
              groupedResults[severity].forEach((issue) => {
                console.groupCollapsed(`Element: %c${issue.element}`, styles.default);
                console.log(`Message: ${issue.message}`);
                console.log(`Description: ${issue.description}`);
                console.groupEnd();
              });
              console.groupEnd();
            });
          } else {
            console.log('No issues found');
          }
          console.groupEnd();
          resolve(data);
        })
        .catch((error) => {
          console.log('err', error);
        });
    } catch (error) {
      console.log('Unexpected error:', error);
    }
  });
};

module.exports = runner;
