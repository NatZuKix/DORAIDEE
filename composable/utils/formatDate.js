function formatDate(date) {
  const options = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  }
  if (date === null) {
    return '-'
  } else {
    let mydate = new Date(date)
    return mydate.toLocaleDateString('en-GB', options)
  }
}

function formatOnlyDate(date) {
  const options = {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }
  if (date === null) {
    return '-'
  } else {
    let mydate = new Date(date)
    return mydate.toLocaleDateString('en-GB', options)
  }
}

function getTotalTimeWorking(date) {
  
  const startDate = new Date('2019-03-22')

  // Get the current date
  const currentDate = new Date()

  // Calculate the difference in years and months
  let years = currentDate.getFullYear() - startDate.getFullYear()
  let months = currentDate.getMonth() - startDate.getMonth()

  // Adjust the months and years if necessary
  if (months < 0) {
    years--
    months += 12
  }

   return {year:years,month:months}
}

export { formatDate, formatOnlyDate ,getTotalTimeWorking}
