import axios from "axios";

const INIT_DATA_URL = '/init_data'
const CREATE_DECISION_URL = '/create_decision'

const createCsrfToken = () => {
  const csrfToken = document.querySelector('[name=csrf-token]').content
  axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken
}

export const getInitDataRequest = (setTemplates, setUsers, setOrgName, setError, setLoaded) => {
  axios.get(INIT_DATA_URL)
    .then(response => {
      const data = response.data.data.data.attributes
      setTemplates(data.templates.data)
      setUsers(data.org_users.data)
      setOrgName(data.name)
      setLoaded(true)
    })
    .catch(error => {
      setError(error)
      console.error('Error:', error)
    });
}

export const createDecisionRequest = (decision, setDecisions, setLoaded, setDecision, setError,
                                      setSelectedTemplate, setSelectedUser, setSelectedCollaborators) =>
{
  createCsrfToken()
  setLoaded(false)

  axios.post(CREATE_DECISION_URL, { decision })
    .then(response => {
      const {data, error} = response.data.data
      setDecisions(prev => [data, ...prev])
      setError(error)
      setDecision({})
      setSelectedUser([])
      setSelectedTemplate([])
      setSelectedCollaborators([])
      setLoaded(true)
    })
    .catch(error => {
      console.error('Error:', error);
      setError(error)
      setSelectedUser([])
      setSelectedTemplate([])
      setSelectedCollaborators([])
      setLoaded(true)
    });
};