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
                const code = issue.code?.split('_')[0];
                if (code) {
                  console.log('Code:', code);
                }
                const logItems = [
                  { key: 'element', label: 'Element' },
                  { key: 'message', label: 'Message' },
                  { key: 'severity', label: 'Severity' },
                  { key: 'groupData.why_issue', label: 'Impact' },
                  { key: 'groupData.what_is_missing', label: 'What is missing' },
                  { key: 'groupData.how_to_solve', label: 'How to fix' },
                  { key: 'groupData.example_before', label: 'Example before' },
                  { key: 'groupData.example_after', label: 'Example after' }
                ];
            
                logItems.forEach(({ key, label }) => {
                  const keys = key.split('.');
                  let value = issue;
                  for (let k of keys) {
                    value = value?.[k];
                    if (value === undefined || value === null) break;
                  }
                  if (value !== undefined && value !== null && value !== '') {
                    console.log(`${label}:`, value);
                  }
                });
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
