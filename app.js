const dateOfBirthInput = document.querySelector(".date-of-birth");

const submitBtn = document.querySelector(".btn-submit");

const resultMsg = document.querySelector(".result");
const errorMsg = document.querySelector(".error");

function reverseStr(str) {
  let listOfChars = str.split("");
  let reverseListOfChars = listOfChars.reverse();
  let reversedStr = reverseListOfChars.join("");
  return reversedStr;
}

function isPalindrome(str) {
  let reverse = reverseStr(str);
  return str === reverse;
}

function convertDateToStr(date) {
  let dateStr = { day: "", month: "", year: "" };

  if (date.day < 10) {
    dateStr.day = "0" + date.day;
  } else {
    dateStr.day = date.day.toString();
  }

  if (date.month < 10) {
    dateStr.month = "0" + date.month;
  } else {
    dateStr.month = date.month.toString();
  }

  dateStr.year = date.year.toString();
  return dateStr;
}

function getAllDateFormats(date) {
  const dateStr = convertDateToStr(date);

  const ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
  const mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
  const yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
  const ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
  const mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
  const yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkPalindromeForAllDateFormats(date) {
  const listOfPalindromes = getAllDateFormats(date);

  let flag = false;

  for (let i = 0; i < listOfPalindromes.length; i++) {
    if (isPalindrome(listOfPalindromes[i])) {
      flag = true;
      break;
    }
  }

  return flag;
}

// check for leap year
function isLeapYear(year) {
  if (year % 400 === 0) {
    return true;
  }
  if (year % 100 === 0) {
    return false;
  }
  if (year % 4 === 0) {
    return true;
  }
  return false;
}

// gets next date
function getNextDate(date) {
  let day = date.day + 1; // increment the day  => 32
  let month = date.month;
  let year = date.year;

  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; // 0 - 11

  // check for february
  if (month === 2) {
    // check for leap year
    if (isLeapYear(year)) {
      // 2020 => true
      if (day > 29) {
        // false
        day = 1;
        month++; // increment the month
      }
    } else {
      if (day > 28) {
        day = 1;
        month++; // increment the month
      }
    }
  }
  // check for other months
  else {
    //  check if the day exceeds the max days in month
    if (day > daysInMonth[month - 1]) {
      day = 1;
      month++; // increment the month
    }
  }

  // increment the year if month is greater than 12
  if (month > 12) {
    month = 1;
    year++;
  }

  return {
    day: day,
    month: month,
    year: year,
  };
}

// get next palindrome date
function getNextPalindromeDate(date) {
  let ctrNextDate = 0;
  let nextDate = getNextDate(date);

  while (1) {
    ctrNextDate++;
    let isPalindrome = checkPalindromeForAllDateFormats(nextDate);
    if (isPalindrome) {
      break;
    }
    nextDate = getNextDate(nextDate);
  }
  return [ctrNextDate, nextDate];
}

function getPreviousDate(date) {
  let day = date.day - 1;
  let month = date.month;
  let year = date.year;

  let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (day === 0) {
    month--;

    if (month === 0) {
      month = 12;
      day = 31;
      year--;
    } else if (month === 2) {
      if (isLeapYear(year)) {
        day = 29;
      } else {
        day = 28;
      }
    } else {
      day = daysInMonth[month - 1];
    }
  }

  return {
    day: day,
    month: month,
    year: year,
  };
}

function getPreviousPalindromeDate(date) {
  let previousDate = getPreviousDate(date);
  let ctrPreviousDate = 0;

  while (1) {
    ctrPreviousDate++;
    let isPalindrome = checkPalindromeForAllDateFormats(previousDate);
    if (isPalindrome) {
      break;
    }
    previousDate = getPreviousDate(previousDate);
  }
  return [ctrPreviousDate, previousDate];
}

submitBtn.addEventListener("click", function submitBtnClick() {
  resultMsg.style.display = "none";
  errorMsg.style.display = "none";
  const dateOfBirth = dateOfBirthInput.value;
  if (dateOfBirth.length > 0) {
    const listOfDate = dateOfBirth.split("-");

    let date = {
      day: Number(listOfDate[2]),
      month: Number(listOfDate[1]),
      year: Number(listOfDate[0]),
    };
    console.log(date);

    const isPalindrome = checkPalindromeForAllDateFormats(date);
    console.log(isPalindrome);
    if (isPalindrome) {
      resultMsg.style.display = "block";
      resultMsg.style.color = "green";
      resultMsg.innerText = `Yay!! Your Birthday ${date.day}-${date.month}-${date.year} is a Palindrome!`;
    } else {
      const [ctrNextDate, nextDate] = getNextPalindromeDate(date);
      console.log(ctrNextDate, nextDate);

      const [ctrPreviousDate, previousDate] = getPreviousPalindromeDate(date);
      console.log(ctrPreviousDate, previousDate);

      let stringResult = `Sorry Your Birthday Is Not A Palindrome\n`;

      if (ctrNextDate < ctrPreviousDate) {
        resultMsg.style.display = "block";
        resultMsg.style.color = "green";
        resultMsg.innerText =
          stringResult +
          `Next Palindrome Is The Nearest That Is \n${nextDate.day}-${nextDate.month}-${nextDate.year}, ${ctrNextDate} Days Away!\n\n Previous Palindrome Was ${previousDate.day}-${previousDate.month}-${previousDate.year}, ${ctrPreviousDate} Days Ago!`;
      } else {
        resultMsg.style.display = "block";
        resultMsg.style.color = "green";
        resultMsg.innerText =
          stringResult +
          `Previous Palindrome Was The Nearest That Is \n${previousDate.day}-${previousDate.month}-${previousDate.year}, ${ctrPreviousDate} Days Ago!\n\n Next Palindrome Is ${nextDate.day}-${nextDate.month}-${nextDate.year}, ${ctrNextDate} Days Away!`;
      }
    }
  } else {
    errorMsg.style.display = "block";
    errorMsg.innerText = "Please Enter Your Date Of Birth";
  }
});
