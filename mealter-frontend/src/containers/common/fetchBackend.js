


const fetchBackend = (endPoint, changeFunction, setError, setLoading) => {

  const backEndUrl = "http://localhost:3000"


  fetch(`${backEndUrl}/api/v1/${endPoint}`,{
    method: "GET",
    headers:{user: localStorage.username}
  })
    .then(resp => resp.ok ? resp.json() : throwError(resp.status))
    .then(backend => changeFunction(backend))
    .catch(e => setError(e))
    .finally(setLoading(false))
}

export default fetchBackend

const throwError = (e) => {throw Error(`Request rejected with status ${e.status}`)}