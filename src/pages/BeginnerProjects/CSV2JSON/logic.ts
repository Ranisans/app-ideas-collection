const CSVtoArray = (data: string) => {
  const strDelimiter = ",";
  // Create a regular expression to parse the CSV values.
  const objPattern = new RegExp(
    // Delimiters.
    `(\\${strDelimiter}|\\r?\\n|\\r|^)` +
      // Quoted fields.
      `(?:"([^"]*(?:""[^"]*)*)"|` +
      // Standard fields.
      `([^"\\${strDelimiter}\\r\\n]*))`,
    "gi"
  );

  // Create an array to hold our data. Give the array
  // a default empty first row.
  const arrayData: [string[]] = [[]];

  // Create an array to hold our individual pattern
  // matching groups.
  const dataWithoutNewLinesInTheEnd = data.replace(/\n+$/, "");

  let arrayMatches = objPattern.exec(dataWithoutNewLinesInTheEnd);

  let strMatchedValue = "";

  // Keep looping over the regular expression matches
  // until we can no longer find a match.
  while (arrayMatches) {
    // Get the delimiter that was found.
    const strMatchedDelimiter = arrayMatches[1];
    if (strMatchedDelimiter.length && strMatchedDelimiter !== strDelimiter) {
      // Since we have reached a new row of data,
      // add an empty row to our data array.
      arrayData.push([]);
    }
    // Now that we have our delimiter out of the way,
    // let's check to see which kind of value we
    // captured (quoted or unquoted).
    if (arrayMatches[2]) {
      // We found a quoted value. When we capture
      // this value, unescape any double quotes.
      strMatchedValue = arrayMatches[2].replace(new RegExp('""', "g"), '"');
    } else {
      // We found a non-quoted value.
      // eslint-disable-next-line prefer-destructuring
      strMatchedValue = arrayMatches[3];
    }

    // Now that we have our value string, let's add
    // it to the data array.
    arrayData[arrayData.length - 1].push(strMatchedValue);

    arrayMatches = objPattern.exec(dataWithoutNewLinesInTheEnd);
  }
  return arrayData;
};

export const CSVToJSON = (text: string): string | null => {
  const matches = CSVtoArray(text);
  const keys = matches[0];
  const objectArray = [];

  for (let i = 1; i < matches.length; i += 1) {
    const currentArray = matches[i];
    if (currentArray.length !== keys.length) {
      return null;
    }
    objectArray[i - 1] = {} as any;

    for (let j = 0; j < keys.length; j += 1) {
      objectArray[i - 1][keys[j]] = currentArray[j];
    }
  }

  const result = JSON.stringify(objectArray);
  return result.replace(/},/g, "},\r\n");
};

export const JSONToCSV = (text: string): string | null => {
  let array;
  try {
    array = JSON.parse(text);
  } catch (e) {
    return null;
  }
  const keys = Object.keys(array[0]);
  let result = `${keys.join(",")}\r\n`;

  for (let i = 0; i < array.length; i += 1) {
    let line = "";

    for (let j = 0; j < keys.length; j += 1) {
      const value = array[i][keys[j]] || "";
      line += `"${value.replace(/"/g, '""')}",`;
    }
    line = line.slice(0, -1);
    result += `${line}\r\n`;
  }

  // remove last \r\n
  result = result.slice(0, -2);

  return result;
};
