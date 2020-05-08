import {useEffect, useState} from 'react'
import {backEndUrl} from '../../constants'

const useFetch = (ref, endPoint, changeFunction, dependencies = []) => {

  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(true);

  dependencies = [...dependencies, ref, changeFunction, endPoint]
  useEffect(() => {
    if (ref.current){
      fetch(`${backEndUrl}/api/v1/${endPoint}`,{
        method: "GET",
        headers:{user: localStorage.username}
      })
        .then(resp => resp.ok ? resp.json() : throwError(resp.status))
        .then(backend => changeFunction(backend))
        .catch(e => setError(e))
        .finally(setLoading(false))
    }
    return () => ref.current = false
  }, dependencies)

  return {isLoading, error}
}

export default useFetch

const throwError = (e) => {throw Error(`Request rejected with status ${e.status}`)}