async function getMovieByCategory(category,page,rowperpage=5) {

  const runtimeConfig = useRuntimeConfig()
  const url = runtimeConfig.public.API_URL+"movies/category/"+category+"?page="+page+"&limit="+rowperpage
  
try {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })

  // console.log('Data received:', data)

  if (response.status!=200) {
    console.error('Error fetching data')
    return null
  }

  const data = await response.json()
  return data

} catch (error) {
   console.error('Error fetching data:', error)
   return null
}
}

export { getMovieByCategory }
